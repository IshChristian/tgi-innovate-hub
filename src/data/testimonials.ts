export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Sarah Johnson",
    role: "Chief Technology Officer",
    company: "Global Manufacturing Corp",
    content: "Tian Group Innovation transformed our operations with their AI automation solutions. The results exceeded our expectations, delivering measurable ROI within months.",
    avatar: "SJ",
  },
  {
    id: "testimonial-2",
    name: "Michael Chen",
    role: "Head of Digital Innovation",
    company: "Retail Solutions Inc",
    content: "Working with Tian Group has been a game-changer. Their IoT expertise helped us modernize our entire supply chain, resulting in significant efficiency gains.",
    avatar: "MC",
  },
  {
    id: "testimonial-3",
    name: "Emily Rodriguez",
    role: "VP of Engineering",
    company: "FinTech Partners",
    content: "The digital transformation strategy provided by Tian Group was exactly what we needed. Their team's expertise and support were invaluable throughout the journey.",
    avatar: "ER",
  },
];
