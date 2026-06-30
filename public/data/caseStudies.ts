export interface CaseStudy {
    id: number;
    company: string;
    metric: string;
    title: string;
    description: string;
    badgeColor?: string; // optional to control company text color
    image: string;
  }
  
  export const caseStudies: CaseStudy[] = [
    {
      id: 1,
      company: "EDUTECH SOLUTION",
      metric: "85% increase in engagement",
      title: "LinkedIn Post Generator for EduTech",
      description:
        "Revolutionizing content creation with AI-powered LinkedIn posts that drive engagement and maintain brand consistency.",
      image: "/images/Image.png",
    },
    {
      id: 2,
      company: "KNOWLEDGE HUB INC.",
      metric: "75% reduction in support tickets",
      title: "RAG-Powered Website Chatbot",
      description:
        "Intelligent chatbot leveraging RAG technology to provide instant, accurate responses while reducing support workload.",
      image: "/images/Image.png",
    },
    {
      id: 3,
      company: "CAPTURE STUDIOS",
      metric: "60% increase in lead conversion",
      title: "Photography Lead Automation System",
      description:
        "Seamless lead qualification system connecting ad platforms with instant WhatsApp engagement for photography services.",
      image: "/images/Image.png",
    },
  ];
  