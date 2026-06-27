import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/Components/SiteChrome";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// SEO Metadata
export const metadata: Metadata = {
  title: "Repeatless | AI Automation Consultant — USA, Canada & Europe",
  description: "Repeatless is an AI automation consultant helping businesses in the USA, Canada, and Europe eliminate repetitive tasks with custom n8n and Claude AI workflows. Book a free strategy call.",
  keywords: [
    "AI automation consultant",
    "Claude AI consultant",
    "Claude AI integration services",
    "hire AI automation consultant",
    "n8n automation expert",
    "hire n8n expert",
    "n8n workflow consultant",
    "n8n AI agent developer",
    "Make.com workflow automation",
    "marketing automation consultant",
    "workflow automation consultant",
    "business automation consultant USA",
    "AI automation consultant USA",
    "AI automation services Canada",
    "workflow automation consultant Europe",
    "content automation consultant",
    "CRM automation consultant",
    "AI automation for marketing agencies",
    "no-code AI automation consultant",
    "business process automation consultant",
    "AI agent workflow automation",
    "automation consultant for small business",
    "Claude Code expert",
    "Claude AI automation",
    "n8n developer",
    "web developer",
    "AI developer",
    "Repeatless",
  ],
  openGraph: {
    title: "Repeatless — AI Automation Consultant for Businesses",
    description: "I help businesses in the USA, Canada, and Europe eliminate repetitive tasks with custom n8n and Claude AI automation. From marketing to operations — built and managed by a dedicated automation consultant.",
    url: "https://www.repeatless.in",
    siteName: "Repeatless",
    images: [{ url: "./images/logo.svg", width: 1200, height: 630, alt: "Repeatless AI Automation Consultant", }],
    locale: "en_US", type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Repeatless — Claude AI & n8n Automation Consultant",
    description: "Claude AI & n8n automation consultant for businesses in the USA, Canada & Europe. Eliminate repetitive tasks. Book a free strategy call.",
    images: [""],
    creator: "@repeatless",
  },
  metadataBase: new URL("https://www.repeatless.in"),
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.ico" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-WHBPXY1YRW"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-WHBPXY1YRW');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Repeatless",
              "description": "AI Automation Consultant helping businesses in the USA, Canada, and India eliminate repetitive tasks with custom n8n workflows.",
              "url": "https://www.repeatless.in",
              "email": "contact@repeatless.in",
              "telephone": "+919849884501",
              "areaServed": ["US", "CA", "EU", "IN"],
              "serviceType": ["AI Automation Consulting", "Claude AI Automation", "n8n Workflow Automation", "Marketing Automation", "Content Automation"],
              "priceRange": "$$",
              "sameAs": [
                "https://www.instagram.com/chandan_cheripally_",
                "https://www.linkedin.com/in/chandan-kumar-cheripally-78738a253/",
                "https://www.youtube.com/@chandankumarnetha"
              ]
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
