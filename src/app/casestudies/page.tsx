import type { Metadata } from "next";
import CTASection from "./components/CTA";
import CaseStudiesIndexClient from "./CaseStudiesIndexClient";
import { blogs } from "../../../public/data/blogs";

export const metadata: Metadata = {
  title: "AI Automation Case Studies",
  description:
    "Explore Repeatless case studies covering n8n automation, Claude AI agents, CRM workflows, content automation, lead response systems, and operations automation.",
  alternates: { canonical: "/casestudies" },
  openGraph: {
    title: "AI Automation Case Studies | Repeatless",
    description:
      "Real automation systems for businesses: n8n workflows, AI agents, content engines, CRM automation, and operations systems.",
    url: "/casestudies",
    images: [{ url: "/images/thumbnail.png", width: 1200, height: 630, alt: "Repeatless AI automation case studies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation Case Studies | Repeatless",
    description: "Real AI automation systems for content, CRM, operations, lead response, and growth workflows.",
    images: ["/images/thumbnail.png"],
  },
};

export default function Page() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Automation Case Studies",
    description:
      "Repeatless case studies for n8n workflow automation, Claude AI agents, CRM automation, content automation, and operations systems.",
    url: "https://www.repeatless.in/casestudies",
    mainEntity: blogs.map((blog) => ({
      "@type": "Article",
      headline: blog.title,
      description: blog.excerpt,
      image: blog.image,
      datePublished: blog.date,
      url: `https://www.repeatless.in/casestudies/${blog.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <CaseStudiesIndexClient />
      <CTASection />
    </>
  );
}
