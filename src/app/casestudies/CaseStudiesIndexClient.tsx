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
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const rule = categoryRules.find((item) => item.label === category);

    return blogs.filter((blog) => {
      const haystack = blogText(blog);
      return !rule || rule.label === "All" || rule.keywords.some((keyword) => haystack.includes(keyword));
    });
  }, [category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PER_PAGE;
  const current = filtered.slice(start, start + PER_PAGE);

  return (
    <div className="mx-auto w-full max-w-[1440px] px-5 py-12 pt-32 text-neutral-950 sm:px-8 sm:pt-40 lg:px-[clamp(4rem,8vw,120px)]">
      <div className="mb-10 max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8400FF]">
          Automation case studies
        </p>
        <h1 className="mt-4 text-4xl font-medium leading-[1.04] tracking-tight sm:text-5xl lg:text-[clamp(3.4rem,5vw,4rem)]">
          Real AI automation systems for growing businesses.
        </h1>
        <p className="mt-5 max-w-2xl text-base sm:text-lg text-neutral-600">
          Explore n8n workflows, Claude AI agents, content engines, CRM automations, and operations systems built to remove repetitive work.
        </p>
      </div>

      <div className="grid gap-8 min-[1180px]:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="min-[1180px]:sticky min-[1180px]:top-28 min-[1180px]:self-start">
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
                  className={`flex items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
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
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-medium tracking-tight">
              Case study library
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {current.map((blog, idx) => (
              <Link
                href={`/casestudies/${blog.slug}`}
                key={blog.slug}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-neutral-950/10 bg-white/60 shadow-[0_16px_45px_rgba(24,24,27,0.06)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#8400FF]/35 hover:bg-white"
              >
                <div className="relative w-full shrink-0 overflow-hidden bg-neutral-950/5">
                  <img
                    src={blog.image}
                    alt={`${blog.title} automation case study`}
                    className="block h-auto w-full object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex min-h-0 flex-1 flex-col p-5">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 font-manrope text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                    <span>{String(start + idx + 1).padStart(2, "0")}</span>
                    <span>{blog.category || "Case Study"}</span>
                  </div>
                  <h3 className="line-clamp-2 font-poppins text-[22px] font-semibold leading-[1.12] tracking-tight text-neutral-950 transition-colors duration-300 group-hover:text-[#8400FF]">
                    {blog.title}
                  </h3>
                  <p className="mt-4 line-clamp-3 font-manrope text-sm leading-6 text-neutral-600">
                    {blog.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
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
