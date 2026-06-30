"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { blogs } from "../../../public/data/blogs";

const PER_PAGE = 6;

const categoryRules = [
  { label: "All", keywords: [] },
  { label: "Lead & CRM", keywords: ["lead", "crm", "sales", "inbox", "dm"] },
  { label: "Content", keywords: ["content", "blog", "seo", "video", "reels", "ad"] },
  { label: "Operations", keywords: ["workflow", "operations", "admin", "reporting", "data"] },
  { label: "AI Agents", keywords: ["agent", "ai", "chat", "voice", "claude"] },
  { label: "Marketing", keywords: ["marketing", "campaign", "creative", "social"] },
];

function blogText(blog: (typeof blogs)[number]) {
  return `${blog.title} ${blog.category} ${blog.excerpt} ${blog.hero.title} ${blog.hero.description}`.toLowerCase();
}

function getCategoryCount(label: string) {
  const rule = categoryRules.find((item) => item.label === label);
  if (!rule || rule.label === "All") return blogs.length;
  return blogs.filter((blog) => rule.keywords.some((keyword) => blogText(blog).includes(keyword))).length;
}

export default function CaseStudiesIndexClient() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rule = categoryRules.find((item) => item.label === category);

    return blogs.filter((blog) => {
      const haystack = blogText(blog);
      const matchesQuery = !q || haystack.includes(q);
      const matchesCategory =
        !rule || rule.label === "All" || rule.keywords.some((keyword) => haystack.includes(keyword));
      return matchesQuery && matchesCategory;
    });
  }, [category, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PER_PAGE;
  const current = filtered.slice(start, start + PER_PAGE);

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[120px] py-12 text-neutral-950 pt-40">
      <div className="mb-10 max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8400FF]">
          Automation case studies
        </p>
        <h1 className="mt-4 text-4xl sm:text-5xl lg:text-[64px] leading-none font-medium tracking-tight">
          Real AI automation systems for growing businesses.
        </h1>
        <p className="mt-5 max-w-2xl text-base sm:text-lg text-neutral-600">
          Explore n8n workflows, Claude AI agents, content engines, CRM automations, and operations systems built to remove repetitive work.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-lg border border-black/10 bg-white/60 p-4 shadow-[0_10px_30px_rgba(24,24,27,0.04)] backdrop-blur">
            <div className="text-sm font-medium text-neutral-700">Categories</div>
            <div className="mt-4 flex flex-col gap-2">
              {categoryRules.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setPage(1);
                    setCategory(item.label);
                  }}
                  className={`flex items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    category === item.label
                      ? "bg-[#8400FF] text-white"
                      : "text-neutral-600 hover:bg-black/5 hover:text-neutral-950"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs opacity-70">{getCategoryCount(item.label)}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-medium tracking-tight">
              Case study library
            </h2>

            <div className="relative w-full sm:w-[280px]">
              <input
                value={query}
                onChange={(e) => {
                  setPage(1);
                  setQuery(e.target.value);
                }}
                placeholder="Search automation topics"
                className="bg-white/60 border border-black/15 rounded-md pl-10 pr-3 py-2 w-full text-sm text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:border-[#8400FF]/50"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">Search</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {current.map((blog) => (
              <Link
                href={`/casestudies/${blog.slug}`}
                key={blog.slug}
                className="block border border-black/10 rounded-lg bg-white/55 p-4 shadow-[0_10px_28px_rgba(24,24,27,0.04)] transition-colors hover:border-[#8400FF]/35 hover:bg-white"
              >
                <div className="w-full h-48 rounded-md overflow-hidden mb-4 bg-black/5">
                  <img
                    src={blog.image}
                    alt={`${blog.title} automation case study`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-[12px] uppercase text-neutral-500 mb-2">
                  {blog.category} •{" "}
                  {new Date(blog.date).toLocaleDateString(undefined, {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <h3 className="font-medium mb-2">{blog.title}</h3>
                <p className="text-neutral-600 text-sm">{blog.excerpt}</p>
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-2 border border-black/15 rounded-md text-sm disabled:opacity-40"
              disabled={safePage === 1}
            >
              Prev
            </button>
            <span className="text-neutral-600 text-sm">
              Page {safePage} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-2 border border-black/15 rounded-md text-sm disabled:opacity-40"
              disabled={safePage === totalPages}
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
