export interface Insight {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  url: string;
}

export const insights: Insight[] = [
  {
    id: "ai-trends-2025",
    title: "AI Trends Shaping 2025",
    excerpt: "Explore the emerging AI technologies and trends that will define business innovation in the coming year.",
    category: "Artificial Intelligence",
    date: "2025-01-15",
    url: "/insights/ai-trends-2025",
  },
  {
    id: "iot-security",
    title: "Securing the IoT Ecosystem",
    excerpt: "Best practices and strategies for protecting connected devices and infrastructure in an increasingly digital world.",
    category: "IoT & Security",
    date: "2025-01-10",
    url: "/insights/iot-security",
  },
  {
    id: "digital-transformation",
    title: "The Digital Transformation Playbook",
    excerpt: "A comprehensive guide to successfully navigating organizational change in the digital age.",
    category: "Strategy",
    date: "2025-01-05",
    url: "/insights/digital-transformation",
  },
];
