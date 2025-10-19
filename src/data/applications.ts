export interface Application {
  id: string;
  title: string;
  description: string;
  icon: string;
  exploreUrl: string;
}

export const applications: Application[] = [
  {
    id: "ai-automation",
    title: "AI & Automation Solutions",
    description: "Streamline operations with intelligent automation systems.",
    icon: "Bot",
    exploreUrl: "/applications/ai-automation",
  },
  {
    id: "iot-smart-systems",
    title: "IoT & Smart Systems",
    description: "Connect devices, data, and infrastructure with smart technologies.",
    icon: "Network",
    exploreUrl: "/applications/iot-smart-systems",
  },
  {
    id: "enterprise-software",
    title: "Enterprise Software Solutions",
    description: "Custom-built software to meet modern business needs.",
    icon: "Code2",
    exploreUrl: "/applications/enterprise-software",
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation Strategy",
    description: "End-to-end digital evolution for competitive advantage.",
    icon: "Rocket",
    exploreUrl: "/applications/digital-transformation",
  },
  {
    id: "sustainability",
    title: "Sustainable Innovation Platform",
    description: "Building eco-smart frameworks for a sustainable future.",
    icon: "Leaf",
    exploreUrl: "/applications/sustainability",
  },
  {
    id: "data-analytics",
    title: "Data Analytics & Intelligence",
    description: "Transform data into actionable business insights.",
    icon: "BarChart3",
    exploreUrl: "/applications/data-analytics",
  },
];
