export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  metric: string;
  category: string;
  url: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "ai-efficiency",
    title: "Efficiency Boost with AI Automation",
    description: "Helping a global manufacturing company reduce operational costs by 40% through intelligent process automation.",
    metric: "40% Cost Reduction",
    category: "Manufacturing",
    url: "/case-studies/ai-efficiency",
  },
  {
    id: "iot-retail",
    title: "IoT Transformation in Retail",
    description: "Enabling a major retail chain to optimize inventory management and enhance customer experience with IoT sensors.",
    metric: "60% Inventory Accuracy",
    category: "Retail",
    url: "/case-studies/iot-retail",
  },
  {
    id: "digital-banking",
    title: "Digital Banking Revolution",
    description: "Modernizing a traditional bank's infrastructure to provide seamless digital services to 2M+ customers.",
    metric: "2M+ Users Served",
    category: "Financial Services",
    url: "/case-studies/digital-banking",
  },
];
