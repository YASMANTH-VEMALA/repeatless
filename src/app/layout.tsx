import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/Components/SiteChrome";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// SEO Metadata 
export const metadata: Metadata = {
  title: "Repeatless | n8n Automation Expert & AI Agency",
  description: "Transform your business with Repeatless. I am an n8n automation expert with 3+ years of experience building custom AI automation systems for scaling businesses.",
  keywords: ["n8n Automation Expert", "Make.com Expert", "AI Automation Agency", "Business Process Automation", "Repeatless"],
  openGraph: {
    title: "Repeatless - AI Automation Solutions",
    description: "Transform your business with Repeatless AI automation solutions, boosting efficiency and growth through intelligent automation.",
    url: "https://www.repeatless.in",
    siteName: "Repeatless",
    images: [{ url: "./images/logo.svg", width: 1200, height: 630, alt: "Repeatless AI Automation", },],
    locale: "en_US", type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Repeatless - AI Automation Solutions",
    description: "Transform your business with Repeatless AI automation solutions, boosting efficiency and growth through intelligent automation.",
    images: [""],
    creator: "@repeatless",
  },
  metadataBase: new URL("https://www.repeatless.in"),
  alternates: { canonical: "/", },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
