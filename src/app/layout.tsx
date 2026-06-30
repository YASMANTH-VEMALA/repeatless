import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, DM_Sans, Plus_Jakarta_Sans, Cormorant_Garamond, Manrope, Syne } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/Components/SiteChrome";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const poppins = Poppins({
  variable: "--font-poppins-family",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans-family",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif-family",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope-family",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-display-family",
  subsets: ["latin"],
  weight: ["700", "800"],
});

// SEO Metadata
export const metadata: Metadata = {
  title: {
    default: "Repeatless | AI Automation Consultant for n8n, Claude AI & Workflow Automation",
    template: "%s | Repeatless",
  },
  description: "Repeatless helps businesses in the USA, Canada, Europe, and India eliminate repetitive work with custom n8n workflows, Claude AI agents, CRM automation, content systems, and operations automation.",
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
    title: "Repeatless - AI Automation Consultant for Businesses",
    description: "Custom n8n, Claude AI, CRM, content, and operations automation for businesses that want to remove repetitive work and scale faster.",
    url: "https://www.repeatless.in",
    siteName: "Repeatless",
    images: [{ url: "/images/thumbnail.png", width: 1200, height: 630, alt: "Repeatless AI automation consulting and workflow systems" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Repeatless - Claude AI & n8n Automation Consultant",
    description: "Claude AI and n8n automation consultant for businesses that want faster operations, better lead response, and less manual work.",
    images: ["/images/thumbnail.png"],
    creator: "@repeatless",
  },
  metadataBase: new URL("https://www.repeatless.in"),
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${dmSans.variable} ${plusJakartaSans.variable} ${cormorant.variable} ${manrope.variable} ${syne.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "@id": "https://www.repeatless.in/#business",
                name: "Repeatless",
                description: "AI automation consultant helping businesses eliminate repetitive work with custom n8n workflows, Claude AI agents, CRM automation, content automation, and operations systems.",
                url: "https://www.repeatless.in",
                email: "contact@repeatless.in",
                telephone: "+919849884501",
                image: "https://www.repeatless.in/images/thumbnail.png",
                areaServed: ["US", "CA", "EU", "IN"],
                serviceType: [
                  "AI Automation Consulting",
                  "n8n Workflow Automation",
                  "Claude AI Agent Automation",
                  "CRM Automation",
                  "Marketing Automation",
                  "Content Automation",
                  "Operations Automation"
                ],
                priceRange: "$$",
                sameAs: [
                  "https://www.instagram.com/chandan_cheripally_",
                  "https://www.linkedin.com/in/chandan-kumar-cheripally-78738a253/",
                  "https://www.youtube.com/@chandankumarnetha"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://www.repeatless.in/#website",
                name: "Repeatless",
                url: "https://www.repeatless.in",
                publisher: { "@id": "https://www.repeatless.in/#business" },
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://www.repeatless.in/casestudies?query={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "What does Repeatless automate?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Repeatless automates repetitive business workflows including lead response, CRM updates, content production, reporting, scheduling, customer support, and internal operations using n8n, Claude AI, and connected business tools."
                    }
                  },
                  {
                    "@type": "Question",
                    name: "Who is Repeatless for?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Repeatless works with service businesses, agencies, consultants, founders, and growing teams that want custom AI automation without hiring a full internal automation team."
                    }
                  },
                  {
                    "@type": "Question",
                    name: "Which tools can Repeatless integrate?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Repeatless can integrate tools such as n8n, Claude AI, Make.com, Google Workspace, CRMs, WhatsApp, Slack, Notion, Airtable, spreadsheets, email systems, and other APIs."
                    }
                  }
                ]
              }
            ])
          }}
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
