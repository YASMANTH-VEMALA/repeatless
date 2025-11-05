export type BlogMeta = {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO or formatted string
  excerpt: string;
  image: string;
};

export type BlogHeroData = {
  title: string;
  description: string;
  meta: { solution: string; stat: string };
  image: string;
  video?: string; // optional: YouTube URL or direct video URL
};

export type BlogBodyData = {
  sections: Array<{
    title?: string;
    text?: string | string[];
    stats?: Array<{ value: string; label: string; highlight?: boolean }>;
    iconList?: string[];
    image?: string;
    video?: string; // optional: YouTube URL or direct video URL
    bullets?: string[];
  }>;
};

export type Blog = BlogMeta & {
  hero: BlogHeroData;
  body: BlogBodyData;
};

export const blogs: Blog[] = [
{
  slug: "ai-video-ad-automation",
  title: "AI-Powered Video Ad Creative Automation",
  category: "Case Study",
  date: "2025-11-05",
  excerpt:
    "We automated a New York ad-creative agency — turning product photos into high-end video ads in hours instead of weeks. No photoshoots. No studios. Just AI-powered creative production at scale.",
  image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1762263083/repeatless/newyork_casestudy_h0knjf.png",
  hero: {
    title: "AI-Powered Video Ad Creative System",
    description:
      "A New York creative agency needed to scale ad production without photography teams, studios, or long edit cycles. We built an AI system that turns a single product image into photorealistic scenes and fully-edited video ads — in hours, not weeks.",
    meta: { solution: "CREATIVE AUTOMATION", stat: "5 Ad Variants • 1-Day Production" },
    image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1762263083/repeatless/newyork_casestudy_h0knjf.png"
  },
  body: {
    sections: [
      {
        title: "Challenge",
        text:
          "The agency produced high-end product videos for e-commerce brands, often spending days scheduling photo shoots, hiring models, setting up lighting, and editing multiple versions. As their client base grew, deadlines got tighter and budgets got squeezed — but quality couldn’t drop. They needed a faster, scalable way to create premium ad creatives without relying on expensive production workflows."
      },
      {
        title: "Solution",
        text: [
          "Seamless Upload: Client uploads a raw product image.",
          "AI Photoreal Transformation: We convert it into stunning, cinematic, photoreal images — nano-detail, seed-rim lighting, ultra-realistic look.",
          "Creative Control: Agency selects motion style, scene feel, and visual promise (motion graphics, textures, angles, pacing).",
          "Multi-Model Generation: System generates 5 unique video ads using different scenes, models, and creative angles.",
          "Smart Storage: All assets stored in a secure cloud library organized by client & campaign.",
          "Clip Selection + Final Render: Agency picks best moments, stitches them in app, and exports a ready-to-run paid-ad video."
        ],
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1762263083/repeatless/newyork_casestudy_h0knjf.png"
      },
      {
        title: "Why It Works",
        iconList: [
          "Photoreal AI — no physical shoot needed",
          "Full creative direction controls",
          "5-variant ad generation per product",
          "Cloud media hub for fast retrieval",
          "Hours to final ads — not weeks",
          "Scales with demand without extra staff"
        ]
      },
      {
        text:
          "This automation turned a traditional creative pipeline into an AI-driven production engine. The agency can now produce dozens of ad variations in a single day. No camera crews. No studios. Just creativity, direction, and automation doing the heavy lifting — while their clients get premium ad videos faster than ever.",
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1762263083/repeatless/newyork_casestudy_h0knjf.png"
      },
      {
        title: "Impact",
        bullets: [
          "Ad production time reduced from 7-10 days to under 24 hours",
          "Cost per creative cut by ~90% (no studios, gear, models)",
          "5 + variants ready instantly for A/B testing",
          "Agency now closes more clients and delivers faster",
          "Thousands in revenue generated daily, fully automated"
        ]
      }
    ]
  }
},
{
  slug: "seo-blog-automation",
  title: "Full-Stack SEO Blog Automation System",
  category: "Case Study",
  date: "2025-11-06",
  excerpt:
    "We built an AI-powered SEO content engine for a Canadian client — auto-researching keywords, writing SEO-optimized blogs, generating branded images, and publishing directly to WordPress.",
  image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1762323483/seo_omnsuv.png",
  hero: {
    title: "AI-Driven SEO Content Automation",
    description:
      "A Canada-based business needed a way to rank faster, publish more content, and dominate high-intent search keywords — without hiring writers or SEO experts. We automated their entire SEO content pipeline end-to-end.",
    meta: { solution: "SEO CONTENT AUTOMATION", stat: "1-Click Publishing • Fully Optimized" },
    image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1762323483/seo_omnsuv.png"
  },
  body: {
    sections: [
      {
        title: "Challenge",
        text:
          "The client operated in a competitive niche in Canada and struggled to publish consistent, high-quality SEO content. Hiring writers was expensive, keyword research was slow, and posts often lacked SEO structure or optimization. They needed a scalable way to publish search-optimized blogs with correct keywords, images, and metadata — without manual work or paying for large content teams."
      },
      {
        title: "Solution",
        text: [
          "Keyword Research Automation: Perplexity pulls primary & secondary keywords based on search trends.",
          "Competitor Keyword Extraction: SEMrush fetches competition keyword insights and difficulty scores.",
          "SEO-Structured Blog Generation: AI writes long-form blogs with H1/H2/H3, internal links, FAQs, schema-ready structure.",
          "Photoreal Images via AI: We generate featured images using AI with narrow-banana realism and brand consistency.",
          "SEO Image Meta-Tags: Each image gets alt text, title tag, caption, and keyword-optimized metadata.",
          "Auto-Publishing to WordPress: Blog + image + SEO tags + slug + meta description are posted directly via API.",
          "Continuous Schedule: System runs daily/weekly publishing schedule to stay ahead in rankings."
        ],
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1762323483/seo_omnsuv.png"
      },
      {
        title: "Why It Works",
        iconList: [
          "Human-grade SEO blogs with proper keyword placement",
          "Perplexity + SEMrush keyword intelligence",
          "Relevant AI images with correct alt/meta tags",
          "Plug-and-publish to WordPress",
          "Consistent content cadence for ranking",
          "Massive cost savings vs hiring writers"
        ]
      },
      {
        text:
          "Once we set up the pipeline, the client only inputs their topic or product name. The system researches the niche, finds keywords worth ranking for, writes a polished SEO blog, generates a branded image, inserts keywords + meta data, and publishes directly to their WordPress site — all automatically.",
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1762323483/seo_omnsuv.png"
      },
      {
        title: "Impact",
        bullets: [
          "Content output increased from 4 blogs/month → 30 blogs/month",
          "Ranking keywords increased by 5x in 90 days",
          "Organic traffic grew consistently without ads",
          "Zero dependency on content writers or SEO agencies",
          "Client saved ~200+ hours/month and thousands in costs"
        ]
      }
    ]
  }
}
,
   {
  slug: "instagram-dm-comments-automation",
  title: "Instagram DM & Comments Automation (AI Agent + n8n)",
  category: "Case Study",
  date: "2025-10-04",
  excerpt:
    "AI agent + n8n turned Instagram comments & DMs into 24/7 sales chats—62% more replies and 41% more qualified leads.",
  image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759665534/repeatless/insta_dm_hpng0l.png",
  hero: {
    title: "Instagram DM & Comments Automation",
    description:
      "Brands needed faster, on-brand Instagram conversations. We delivered an AI agent that replies in comments, moves to DM, and converts interest into sales—compliantly and at scale.",
    meta: { solution: "SOCIAL COMMERCE SOLUTION", stat: "62% MORE REPLIES FROM COMMENTS" },
    image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759665534/repeatless/insta_dm_hpng0l.png",
  },
  body: {
    sections: [
      {
        title: "Challenge",
        text:
          "High comment and DM volume led to slow replies, inconsistent tone, and missed sales windows—especially nights and weekends. FAQs (pricing, sizes, delivery, order status) drained team time and reduced conversion.",
      },
      {
        title: "Solution",
        text: [
          "AI detects buyer intent in comments and Story replies, then opens or continues DMs with brand-tuned responses.",
          "Handles FAQs, shares links/coupons, captures leads with consent, and escalates edge cases to a human.",
          "Built with n8n + Meta Graph API, including rate-limit guards, sentiment/intent routing, and safety fallbacks.",
        ],
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759665534/repeatless/insta_dm_hpng0l.png",
      },
      {
        title: "Why it Works",
        iconList: [
          "Brand-tuned generation",
          "Intent & sentiment routing",
          "One-tap human handoff",
          "Auto follow-up & reminders",
          "CRM/Sheet logging & UTM tracking",
        ],
      },
      {
        text:
          "Operators see live threads, confidence scores, and templates. Marketing can pause/approve flows per campaign and track conversions from comment → DM → checkout.",
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759665534/repeatless/insta_dm_hpng0l.png",
      },
      {
        title: "Impact",
        bullets: [
          "62% increase in replies initiated from comments",
          "41% lift in qualified leads captured",
          "50% faster resolution time",
          "24/7 coverage with consistent brand voice",
          "Lower support load; team focuses on high-value cases",
        ],
      },
    ],
  },
},
{
  slug: "linkedin-post-generator-for-b2b",
  title: "LinkedIn Post Generator & Daily Auto‑Posting (B2B)",
  category: "Case Study",
  date: "2025-10-04",
  excerpt:
    "AI discovers proven LinkedIn ideas, rewrites them in your voice, posts daily—driving inbound leads and new client acquisition without manual work.",
  image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759665812/repeatless/linkedin_q4ttbl.png",
  hero: {
    title: "LinkedIn Post Generator for B2B Growth",
    description:
      "We built an AI system that analyzes top public posts in your niche, rewrites them in your tone with fresh angles, designs an image, and auto‑posts to LinkedIn—keeping you consistently visible to prospects and winning new clients.",
    meta: { solution: "B2B CONTENT SOLUTION", stat: "Boost in Inbound Leads" },
    image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759665812/repeatless/linkedin_q4ttbl.png"
  },
  body: {
    sections: [
      {
        title: "Challenge",
        text:
          "Founders and marketing teams knew what resonated but couldn't post daily. Idea mining was slow, approvals slipped, tone drifted, and pipeline suffered from fewer profile visits, DMs, and demo requests."
      },
      {
        title: "Solution",
        text: [
          "Discovery: Monitor public, high‑engagement posts from selected creators and hashtags; filter by niche, topic, and recency.",
          "Suitability Check: Rule engine screens for relevance, originality threshold, and brand policies (no competitors' claims, no sensitive topics).",
          "Generation: LLM rewrites with your voice guide (tone, vocabulary, CTAs) and adds unique insights to avoid duplication.",
          "Visuals: Automatic on‑brand image generation (headline cards/diagrams) with your colors/logo.",
          "Scheduling: Queue approved posts for daily publishing via LinkedIn‑approved scheduler/API with rate‑limit guards.",
          "Lead Capture: Strong CTAs to book calls/DM, UTM‑tagged links to landing pages, and auto‑logging of inbound interest.",
          "Learning Loop: Track engagement and downstream conversions (profile visits, connection accepts, booked calls); promote winning angles; de‑prioritize underperformers."
        ],
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759665812/repeatless/linkedin_q4ttbl.png"
      },
      {
        title: "Why it Works",
        iconList: [
          "Finds proven ideas in your niche",
          "Brand voice & policy guardrails",
          "Fresh angles—no copy‑paste",
          "Auto images with your brand kit",
          "Hands‑free daily scheduling",
          "Lead‑focused CTAs & tracking"
        ]
      },
      {
        text:
          "Operators see a simple queue with previews, tone checks, and policy flags. You can approve, edit, or let the agent auto‑publish on a set cadence (e.g., 1 post/day at 9:30 AM).",
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759665812/repeatless/linkedin_q4ttbl.png"
      },
      {
        title: "Impact",
        bullets: [
          "Consistent daily posting without manual effort",
          "8–10 hours/week saved on ideation and formatting",
          "Increase in qualified inbound leads & discovery calls",
          "On‑brand, compliant posts aligned to your niche",
          "Evergreen queue maintained 2–3 weeks ahead"
        ]
      }
    ]
  }
},

{
  slug: "newsletter-automation-leadgen",
  title: "Newsletter Spam Monitoring & Lead Generation Automation",
  category: "Case Study",
  date: "2025-10-05",
  excerpt:
    "We turned newsletter subscriptions into a lead engine by detecting senders landing in spam and triggering tailored outreach—fueling a marketing agency's pipeline.",
  image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759666185/repeatless/seannewsletter_g8mzip.png",
  hero: {
    title: "Newsletter Automation for Agency Lead Generation",
    description:
      "A marketing agency needed a steady stream of qualified leads. We built an automation that subscribes to niche newsletters across managed inboxes, detects senders landing in spam or failing verification, and launches contextual outreach to offer deliverability & email marketing services.",
    meta: { solution: "LEAD GEN & DELIVERABILITY", stat: "Spam-to-Lead Conversion Engine" },
    image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759666185/repeatless/seannewsletter_g8mzip.png"
  },
  body: {
    sections: [
      {
        title: "Challenge",
        text:
          "The agency relied on cold lists with low intent. Many potential clients were already signaling deliverability issues—double‑opt‑in loops, missing confirmation emails, or messages routed to spam—but these signals were scattered across inboxes and never actioned at scale."
      },
      {
        title: "Solution",
        text: [
          "Subscription Pool: Use managed inboxes and niche keywords to subscribe to relevant newsletters across industries.",
          "Signal Detection: Monitor inbox events (INBOX/SPAM/Promotions), double‑opt‑in requests, bounces, and sender authentication hints.",
          "Classification: Tag each sender by risk (spam‑routed, missing DKIM/SPF, slow confirmation), intent, and niche fit.",
          "Outreach Trigger: When a sender trips a deliverability issue, fire a tailored outreach sequence offering remediation and email marketing help.",
          "CRM Sync: De‑duplicate domains, enrich contacts, and track outcomes from first touch → booked call.",
          "Compliance: Respect unsubscribes, frequency caps, and lawful bases for contact; store audit logs."
        ],
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759666185/repeatless/seannewsletter_g8mzip.png"
      },
      {
        title: "Why it Works",
        iconList: [
          "Prospects with active pain (spam routing)",
          "Real‑time deliverability intelligence",
          "Contextual outreach with proof points",
          "Multi‑inbox monitoring at scale",
          "De‑dup + enrichment for clean CRM",
          "Privacy‑first and compliant"
        ]
      },
      {
        text:
          "Operators see a dashboard of newsletter domains with status (OK/Spam/No‑Mail/Double‑Opt‑In), niche tags, and last events. One click reveals suggested outreach copy and a remediation checklist; wins feed a case‑study queue automatically.",
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759666185/repeatless/seannewsletter_g8mzip.png"
      },
      {
        title: "Impact",
        bullets: [
          "Steady stream of high‑intent leads from real deliverability issues",
          "Reduced time spent hunting prospects; focus shifts to consults",
          "Cleaner CRM with de‑duped domains and tracked outcomes",
          "Faster cycles from signal → outreach → booked calls",
          "Reusable playbook for new niches and geographies"
        ]
      }
    ]
  }
},
{
  slug: "whatsapp-broadcast-automation-books",
  title: "WhatsApp Broadcast Automation for New Book Launches",
  category: "Case Study",
  date: "2025-10-05",
  excerpt:
    "When a publisher releases a new book, our automation broadcasts rich WhatsApp messages to opted‑in readers—driving immediate awareness and sales at scale.",
  image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759666496/repeatless/publications_dsrg9k.png",
  hero: {
    title: "WhatsApp Broadcast Automation for Publishers",
    description:
      "A book publisher needed instant reach to thousands of readers at launch. We built a compliant WhatsApp broadcast system that detects new titles, personalizes messages, and sends at scale with tracking and opt‑outs—no manual steps.",
    meta: { solution: "WHATSAPP COMMERCE", stat: "Launch‑Day Reach in Minutes" },
    image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759666496/repeatless/publications_dsrg9k.png"
  },
  body: {
    sections: [
      {
        title: "Challenge",
        text:
          "Announcements on email and social weren’t reaching readers fast enough. Manual WhatsApp groups were capped, error‑prone, and risky for compliance. The publisher needed a reliable, policy‑safe way to notify thousands the moment a new book went live."
      },
      {
        title: "Solution",
        text: [
          "Trigger: Detect new book listings from the CMS/Sheet; enrich with title, author, cover URL, and buy link.",
          "Template Messaging: Use pre‑approved WhatsApp templates with variables (name, title, discount, link) to ensure high deliverability.",
          "Segmentation: Send to opted‑in readers by genre, language, and purchase history; throttle by provider limits.",
          "Personalization: Add first‑name, dynamic offers, and city‑based store info; attach cover image as media.",
          "Compliance: Manage consent and opt‑out keywords (STOP), handle fails/retries, and maintain an auditable log.",
          "Analytics: Track deliveries, reads, clicks (UTM), and conversions; auto‑compile a launch report."
        ],
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759666496/repeatless/publications_dsrg9k.png"
      },
      {
        title: "Why it Works",
        iconList: [
          "Immediate, high‑open channel",
          "Policy‑compliant templates & opt‑outs",
          "Precise audience segmentation",
          "Personalized rich media messages",
          "Automated triggers from your catalog",
          "End‑to‑end tracking & reporting"
        ]
      },
      {
        text:
          "Operators get a simple launch dashboard: preview the broadcast, select segments, schedule or send now, and watch real‑time delivery/click stats. The system auto‑retries soft fails and logs unsubscribes to keep the list healthy.",
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759666496/repeatless/publications_dsrg9k.png"
      },
      {
        title: "Impact",
        bullets: [
          "Instant launch‑day reach across thousands of opted‑in readers",
          "Hands‑free publishing → messaging flow with zero copy‑paste",
          "Higher CTR from personalized, media‑rich notifications",
          "Clean compliance: consent capture, opt‑outs, and audit logs",
          "Actionable insights to refine offers, timing, and segments"
        ]
      }
    ]
  }
},
{
  slug: "social-media-automation-luxury-bike-chicago",
  title: "Social Media Automation for a Luxury Bike Shop (Chicago)",
  category: "Case Study",
  date: "2025-10-10",
  excerpt:
    "$700 AI + auto-posting system that publishes daily across Instagram, TikTok, X, YouTube & LinkedIn—turning local discovery into DMs and foot traffic.",
  image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1760271382/social_media_yusuf_pceijg.png",
  hero: {
    title: "$700 Social Media Automation for a Chicago Luxury Bike Shop",
    description:
      "We built an always-on content engine: AI generates on-brand posts + images, adds Chicago-local hashtags, and auto-publishes daily across five platforms—no manual work.",
    meta: { solution: "CONTENT + DISTRIBUTION", stat: "Daily Posting • 7 Categories" },
    image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1760271382/social_media_yusuf_pceijg.png"
  },
  body: {
    sections: [
      {
        title: "Challenge",
        text:
          "The shop had world-class builds but inconsistent posting. Editing, resizing, and rewriting per platform took hours; hashtags weren’t localized; and posts stalled on busy weeks—so discovery in Chicago lagged and DMs were quiet."
      },
      {
        title: "Solution",
        text: [
          "Daily Cadence: Auto-posts to Instagram, TikTok, X (Twitter), YouTube (Shorts), and LinkedIn—1 post/day minimum.",
          "7 Content Categories: Modifications showcase, Repair tips, Bike transformations, Client testimonials, Maintenance advice, Before/After results, Custom builds.",
          "AI Creative: Generates images/cards and short clips when assets are missing; adapts captions to each platform; injects Chicago-local hashtags and neighborhoods (e.g., #ChicagoBikes, #WickerPark, #RiverNorth).",
          "Brand Voice: Tone/voice guide enforces premium, performance-focused messaging; CTA variations drive shop visits and DMs.",
          "Scheduler + Guardrails: Queues a 2–3 week calendar, respects rate limits, and auto-skips repeats; manual approve/pause option.",
          "Analytics Loop: Tracks reach, profile visits, DMs, and saves; boosts winners; rotates underperformers out."
        ],
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1760271382/social_media_yusuf_pceijg.png"
      },
      {
        title: "Why it Works",
        iconList: [
          "Proven 7-category content map",
          "Platform-native captions & formats",
          "Local SEO hashtags for Chicago",
          "Hands-free daily scheduling",
          "AI visuals when assets are missing",
          "Measure → learn → amplify"
        ]
      },
      {
        text:
          "A simple calendar view shows upcoming posts by category and platform with preview thumbnails. The owner can drag-to-reorder, swap a photo, or let the queue run autonomously; weekly reports highlight DM spikes and best-performing angles (before/after, client testimonials, custom builds).",
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1760271382/social_media_yusuf_pceijg.png"
      },
      {
        title: "Impact",
        bullets: [
          "Consistent daily presence across 5 platforms for a $700 setup",
          "DMs surged with first-time Chicago inquiries (organic discovery)",
          "Zero manual resizing/copy-pasting; owner focuses on builds",
          "On-brand premium tone maintained across posts",
          "Evergreen queue maintained 2–3 weeks ahead"
        ]
      }
    ]
  }
}
,
{
  slug: "whatsapp-local-service-connector-us",
  title: "WhatsApp Local Service Connector (US County)",
  category: "Case Study",
  date: "2025-10-05",
  excerpt:
    "An AI+automation workflow that connects residents to vetted plumbers, electricians, and AC techs via WhatsApp—routing in seconds and boosting provider subscriptions.",
  image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759668522/repeatless/serviceprovider_srwmjd.png",
  hero: {
    title: "WhatsApp Local Service Connector",
    description:
      "In one US county, residents struggled to reach reliable home‑service providers quickly. We built a WhatsApp agent that understands the request, checks real‑time provider availability, and connects both parties instantly—no call centers, no waiting.",
    meta: { solution: "LOCAL SERVICES AUTOMATION", stat: "Instant Request → Provider Match" },
    image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759668522/repeatless/serviceprovider_srwmjd.png"
  },
  body: {
    sections: [
      {
        title: "Challenge",
        text:
          "Discovery and coordination were slow. Customers bounced between directories and unanswered calls, while providers missed jobs outside business hours. The client needed a simple, always‑on way to match residents with the right on‑duty professional."
      },
      {
        title: "Solution",
        text: [
          "WhatsApp Agent: Residents message a keyword like ‘plumber needed’. The agent collects location, urgency, and brief issue description.",
          "Smart Matching: System checks a provider database (skills, coverage area, SLA) and current status (active/idle/do‑not‑disturb).",
          "Instant Connect: Shares request to the best‑fit, currently active provider; once accepted, both parties receive each other’s contact details for direct follow‑up.",
          "Fallback & Escalation: If no active provider, queue the request, ping next‑best, or escalate to a manual dispatcher.",
          "Provider Portal: Service pros manage availability, service categories, pricing notes, and subscription billing (monthly).",
          "Logs & Metrics: Track response times, acceptance rates, completion notes, and customer feedback for quality control."
        ],
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759668522/repeatless/serviceprovider_srwmjd.png"
      },
      {
        title: "Why it Works",
        iconList: [
          "Frictionless WhatsApp intake",
          "Real‑time availability matching",
          "Direct customer↔provider connection",
          "Fail‑safes for off‑hours coverage",
          "Quality tracking & feedback loop",
          "Recurring subscriptions for providers"
        ]
      },
      {
        text:
          "Operations staff can view a live queue, override matches, or pause categories during storms/peaks. Providers toggle ‘Active’ in one tap; the agent respects do‑not‑disturb windows and rotates jobs fairly across subscribers.",
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759668522/repeatless/serviceprovider_srwmjd.png"
      },
      {
        title: "Impact",
        bullets: [
          "Requests routed to an on‑duty pro within seconds",
          "Higher job acceptance and faster first response",
          "More completed jobs and happier residents",
          "Predictable recurring revenue via provider subscriptions",
          "Reduced coordinator workload with clear audit trails"
        ]
      }
    ]
  }
}
,
{
  slug: "qr-event-attendance-automation",
  title: "QR-Based Event Attendance Automation",
  category: "Case Study",
  date: "2025-10-13",
  excerpt:
    "Zero third‑party fees: our QR system verifies attendees against your database, blocks duplicate scans, and updates attendance in real time.",
  image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1760339555/ticket_qr_cyff8c.png",
  hero: {
    title: "QR-Based Event Attendance Automation",
    description:
      "We built a lean, secure event check‑in system: unique QR codes per attendee, instant database verification, and one‑scan‑only gatekeeping to stop pass‑arounds—without paying per‑attendee platform fees.",
    meta: { solution: "EVENT OPS AUTOMATION", stat: "1‑Scan‑Only • Real‑Time Update" },
    image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1760339555/ticket_qr_cyff8c.png"
  },
  body: {
    sections: [
      {
        title: "Challenge",
        text:
          "Manual check‑ins were slow and error‑prone. Shared PDFs and generic QR apps couldn’t enforce one‑scan‑only rules, so passes were forwarded and counters were wrong. The team needed a fast, tamper‑resistant system with live database sync and no recurring vendor fees."
      },
      {
        title: "Solution",
        text: [
          "Unique QR Issuance: Generate a per‑attendee, signed QR (eventId + attendeeId + nonce) embedded in a secure URL.",
          "Instant Verification: On scan, the gate page calls our API to validate registration against the event database and check status (NEW / CHECKED_IN / INVALID).",
          "One‑Scan‑Only Rule: First valid scan flips status to CHECKED_IN and records device/time/location; any subsequent scan is auto‑rejected.",
          "Double‑Verification: If two devices attempt the same QR near‑simultaneously, a short hold compares timestamps and rejects the later request to prevent piggybacking.",
          "Offline Tolerance: Edge cache for last sync + fallback code entry; queued confirmations sync back when online.",
          "Ops Console: Live counters, lane throughput, and exception list (e.g., name mismatch, duplicate attempt) with quick override for authorized staff."
        ],
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1760339555/ticket_qr_cyff8c.png"
      },
      {
        title: "Why it Works",
        iconList: [
          "Signed, unique QR per attendee",
          "Real‑time database validation",
          "One‑scan‑only enforcement",
          "Duplicate & race‑condition guards",
          "Zero per‑attendee SaaS fees",
          "Simple ops console + logs"
        ]
      },
      {
        text:
          "Staff simply scan with a mobile browser: the gate page renders attendee name, ticket type, and status instantly. Approved scans flash GREEN with a beep; blocked duplicates show RED with reason and timestamp. Coordinators monitor hall capacity in real time and export attendance afterward.",
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1760339555/ticket_qr_cyff8c.png"
      },
      {
        title: "Impact",
        bullets: [
          "<2‑second average check‑in per attendee",
          "Duplicate/forwarded passes reduced to near‑zero",
          "Accurate live headcount and lane throughput",
          "No third‑party per‑scan costs; fully owned stack",
          "Clear audit trail for compliance and sponsors"
        ]
      }
    ]
  }
}
,
{
  slug: "youtube-comment-automation",
  title: "YouTube Comment Automation",
  category: "Case Study",
  date: "2025-10-16",
  excerpt:
    "We built an N8N workflow that auto-replies to every YouTube comment in the creator’s tone — saving 10+ hours weekly and tripling engagement, all with zero third-party tools.",
  image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1760554512/repeatless/youtube_qa6uvx.png",
  hero: {
    title: "Automating YouTube Engagement with N8N",
    description:
      "Our client, a fast-growing YouTube creator, was overwhelmed by hundreds of comments per video. We built a smart N8N automation that instantly replies in their brand voice — saving over 10 hours weekly and boosting engagement 3x.",
    meta: { solution: "CREATOR AUTOMATION", stat: "10+ Hours Saved • 3x Engagement" },
    image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1760554512/repeatless/youtube_qa6uvx.png"
  },
  body: {
    sections: [
      {
        title: "Challenge",
        text:
          "The client’s YouTube channel was growing fast — but each upload brought hundreds of new comments. Their small team struggled to reply promptly, leaving loyal fans unanswered. Engagement was dropping, and community sentiment was fading. They needed a solution that could maintain authenticity while removing the manual workload."
      },
      {
        title: "Solution",
        text: [
          "We designed a fully custom workflow inside N8N — no third-party tools, no extra APIs.",
          "The system uses the YouTube Data API to track new comments in real time.",
          "For each comment, N8N analyzes the tone and content to determine intent (praise, question, or feedback).",
          "It then generates a reply in the creator’s exact brand voice, trained on previous responses.",
          "Finally, it posts the reply automatically to YouTube within seconds.",
          "The workflow also logs all interactions for tracking engagement and detecting spam comments."
        ],
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1760554512/repeatless/youtube_qa6uvx.png"
      },
      {
        title: "Why It Works",
        iconList: [
          "Completely built in N8N — no SaaS tools or API fees",
          "Replies in authentic, brand-specific tone",
          "Real-time comment tracking and responses",
          "Context-aware, intelligent reply generation",
          "Zero manual moderation required",
          "Scalable for multiple channels"
        ]
      },
      {
        text:
          "The workflow runs 24/7 — watching every video, Short, and community post. When a comment arrives, it replies in under 5 minutes, keeping engagement constant. The automation respects YouTube’s rate limits and stores all responses in Google Sheets for transparency. The creator now interacts with fans automatically while staying true to their voice.",
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1760554512/repeatless/youtube_qa6uvx.png"
      },
      {
        title: "Impact",
        bullets: [
          "10+ hours saved weekly on manual comment management",
          "Engagement rate increased by 3x within 2 weeks",
          "Audience sentiment improved — comments feel personal",
          "No added cost: built entirely with open-source N8N",
          "100% consistency in tone, speed, and accuracy"
        ]
      }
    ]
  }
}
,
{
  slug: "document-consolidation-automation",
  title: "Document Consolidation & Auto‑Foldering Automation (Consultancy)",
  category: "Case Study",
  date: "2025-10-05",
  excerpt:
    "For consultancy teams: one form generates all client documents, auto‑names/files them in Google Drive, and supports image uploads—saving hours every week.",
  image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759666970/repeatless/consultation_niszxz.png",
  hero: {
    title: "Document Consolidation & Auto‑Foldering for Consultancy Clients",
    description:
      "Consultancy firms were manually filling multiple templates per client and filing them in the right folders. We delivered a single smart form that captures client data (plus images), populates every template, auto‑names files, and saves everything into a client‑specific Google Drive structure.",
    meta: { solution: "OPERATIONS AUTOMATION", stat: "Up to 75% Time Saved" },
    image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759666970/repeatless/consultation_niszxz.png"
  },
  body: {
    sections: [
      {
        title: "Challenge",
        text:
          "Consultancy teams handled different consolidation packs (engagement letters, KYC, scopes, approvals) across many clients. Manual data entry into multiple templates led to version mix‑ups, wrong file names, scattered images, and misplaced folders—hurting speed and compliance."
      },
      {
        title: "Solution",
        text: [
          "Unified Intake (Consultancy‑Ready): A single form where teammates choose the consolidation pack and enter core client data.",
          "Data Fields Captured: Client Name, Engagement ID, Service Line, Primary Contact, Email/Phone, Billing Address, Project Address, Consultant Owner, Deadlines/Milestones, Fee & Currency, Tax IDs/GST, Scope Notes, KYC fields (PAN/ID types), Signatories, Custom Clauses.",
          "Template Merge: Auto‑populate all approved templates (Engagement Letter, KYC Form, NDA, Scope of Work, Fee Schedule, Approval Sheet) with the captured fields, placed exactly per template positions.",
          "Image & File Uploads: Upload client logos, ID proofs, site photos, and signatures from the same form. Files are stored under Google Drive → Client Folder → /assets and linked into documents where required (e.g., logo on letterhead, ID proof in KYC).",
          "Smart Naming & Auto‑Foldering: Use a strict schema (ClientName_ConsolidationType_Date_v1). Create the client root folder if missing and place documents in subfolders (\"01_Intake\", \"02_Agreements\", \"03_KYC\", \"04_Approvals\", \"assets\").",
          "Drive Sync & Permissions: Save to Google Drive with correct access for the consultancy team; log creator, timestamp, and version.",
          "Status, E‑Sign & QC: Dashboard shows completion status, missing fields, and e‑signature progress; sends e‑sign requests automatically and flags exceptions for review."
        ],
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759666970/repeatless/consultation_niszxz.png"
      },
      {
        title: "Why it Works",
        iconList: [
          "Built for consultancy workflows",
          "Single intake → many documents",
          "Exact field placement in templates",
          "Zero manual naming/filing",
          "Auto‑permissions & audit trail",
          "Centralized images & attachments"
        ]
      },
      {
        text:
          "A coordinator opens the form, selects the consolidation pack (e.g., \"Standard Consultancy Onboarding\"), fills client details, and uploads any images (logo, ID proof, signatures). The system generates Docs/PDFs, creates the client folder, files each document in the correct subfolder, and posts a link summary to the team.",
        image: "https://res.cloudinary.com/ds10dzkpj/image/upload/v1759666970/repeatless/consultation_niszxz.png"
      },
      {
        title: "Impact",
        bullets: [
          "75% time reduction preparing and filing consultancy documents",
          "Eliminated naming errors and missing images/attachments",
          "Faster client onboarding with consistent, compliant packs",
          "Live status dashboard for coordinators and partners",
          "Repeatable playbook for new consolidation types and geographies"
        ]
      }
    ]
  }
}

];


export function getBlogBySlug(slug: string): Blog | undefined {
  return blogs.find((b) => b.slug === slug);
}

