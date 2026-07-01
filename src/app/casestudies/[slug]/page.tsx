import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogHero from "../components/Header";
import BlogBody from "../components/body1";
import CTASection from "../components/CTA";
import { getBlogBySlug, blogs } from "../../../../public/data/blogs";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) {
    return {
      title: "Case Study Not Found",
      robots: { index: false, follow: false },
    };
  }

  const url = `/casestudies/${blog.slug}`;
  const title = `${blog.title} Case Study`;
  const description = blog.excerpt || blog.hero.description;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | Repeatless`,
      description,
      url,
      type: "article",
      publishedTime: blog.date,
      images: [{ url: blog.image, width: 1200, height: 630, alt: `${blog.title} automation case study` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Repeatless`,
      description,
      images: [blog.image],
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) return notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt || blog.hero.description,
    image: blog.image,
    datePublished: blog.date,
    dateModified: blog.date,
    author: {
      "@type": "Organization",
      name: "Repeatless",
      url: "https://www.repeatless.in",
    },
    publisher: {
      "@type": "Organization",
      name: "Repeatless",
      logo: {
        "@type": "ImageObject",
        url: "https://www.repeatless.in/images/logo.svg",
      },
    },
    mainEntityOfPage: `https://www.repeatless.in/casestudies/${blog.slug}`,
    articleSection: blog.category,
    keywords: [
      "AI automation case study",
      "n8n workflow automation",
      "Claude AI automation",
      blog.title,
      blog.hero.meta.solution,
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <section className="w-full pt-12">
        <BlogHero
          title={blog.hero.title}
          description={blog.hero.description}
          meta={blog.hero.meta}
          image={blog.hero.image}
          video={blog.hero.video}
        />
        <BlogBody sections={blog.body.sections} />
      </section>
      <CTASection />
    </div>
  );
}
