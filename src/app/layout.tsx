import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/Components/SiteChrome";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// SEO Metadata
export const metadata: Metadata = {
  title: "Repeatless | AI Automation Consultant for Businesses — USA, Canada & India",
  description: "Repeatless is an AI automation consultant helping businesses in the USA, Canada, and India eliminate repetitive tasks with custom n8n workflows. Book a free strategy call.",
  keywords: [
    "AI automation consultant",
    "business automation consultant USA",
    "n8n consultant",
    "workflow automation consultant Canada",
    "automation consultant for small business",
    "AI workflow expert",
    "n8n automation expert",
    "marketing automation consultant",
    "AI consultant for businesses",
    "automation agency USA",
    "n8n automation agency",
    "business process automation consultant",
    "Repeatless",
  ],
  openGraph: {
    title: "Repeatless — AI Automation Consultant for Businesses",
    description: "I help businesses in the USA, Canada, and India eliminate repetitive tasks with custom n8n automation. From marketing to operations — built and managed by a dedicated automation consultant.",
    url: "https://www.repeatless.in",
    siteName: "Repeatless",
    images: [{ url: "./images/logo.svg", width: 1200, height: 630, alt: "Repeatless AI Automation Consultant", }],
    locale: "en_US", type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Repeatless — AI Automation Consultant",
    description: "Custom n8n automation for businesses in the USA, Canada & India. Eliminate repetitive tasks. Book a free strategy call.",
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
              "areaServed": ["US", "CA", "IN"],
              "serviceType": ["AI Automation Consulting", "Workflow Automation", "Marketing Automation", "Content Automation"],
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
