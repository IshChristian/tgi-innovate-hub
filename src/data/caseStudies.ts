export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
}

export const projects: Project[] = [
  {
    id: "smart-logistics",
    title: "Smart Logistics Platform",
    description: "AI-powered optimization system for supply chain networks.",
    image: "/placeholder.svg",
    url: "/projects/smart-logistics",
  },
  {
    id: "greencity",
    title: "GreenCity IoT Hub",
    description: "Smart infrastructure management system for eco-friendly cities.",
    image: "/placeholder.svg",
    url: "/projects/greencity",
  },
  {
    id: "ai-retail-insights",
    title: "AI Retail Insights",
    description: "Data-driven retail intelligence dashboard for analytics.",
    image: "/placeholder.svg",
    url: "/projects/ai-retail-insights",
  },
];
