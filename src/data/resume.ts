// src/data/resume.ts
export type Social = {
  network: string;
  username: string;
  url: string;
};

export type Job = {
  company: string;
  role: string;
  start: string;
  end: string; // Bisa "Present"
  location: string;
  location_type: "Remote" | "On-site" | "Hybrid";
  description: string[]; // Bullet points accomplishments
  logoUrl?: string; // (Optional) URL logo perusahaan
  link?: string; // (Optional) Website perusahaan
};

export type Education = {
  school: string;
  degree: string;
  field: string;
  start: string;
  end: string;
  description?: string; // (Optional) Prestasi/IPK/Organisasi
};

export type SkillCategory = {
  category: string;
  items: string[];
};

export interface ResumeData {
  basics: {
    name: string;
    initials: string; // Buat avatar fallback (RZ)
    label: string;
    email: string;
    location: string;
    website: string;
    phone?: string; // Optional, hati-hati spam

    // Summary pendek (buat Header/Meta)
    headline: string;

    // Summary panjang (buat Section About)
    summary: string;

    // URL PDF. Kalau kosong (""), tombol download akan disabled/hidden
    pdfUrl: string;
  };
  socials: Social[];
  experience: Job[];
  education: Education[];
  skills: SkillCategory[];
}

export const RESUME_DATA: ResumeData = {
  basics: {
    name: "Riziyan - Rizqi Febrian Maulana",
    initials: "RZ",
    label: "Full Stack Engineer & Content Creator",
    email: "rizian.business99@gmail.com",
    location: "Surabaya, Indonesia",
    website: "https://blog.riziyan.my.id",

    headline:
      "Building accessible, pixel-perfect, and performant web experiences.",

    summary:
      "I am a self-taught developer with a deep passion for the React ecosystem. My journey started with curiosity and evolved into building production-ready applications. I combine technical expertise in Next.js and TypeScript with a creative flair for content creation, ensuring that what I build not only functions perfectly but also tells a compelling story.",

    // SIMULASI PDF BELUM READY:
    // Biarkan string kosong ("") atau null.
    pdfUrl: "",
    // pdfUrl: "/resume.pdf",
  },

  socials: [
    {
      network: "GitHub",
      username: "airizf11",
      url: "https://github.com/airizf11",
    },
    {
      network: "LinkedIn",
      username: "Rizki Febrian M",
      url: "https://linkedin.com/in/rizkifebrianm/",
    },
    {
      network: "Instagram",
      username: "rizyan.people",
      url: "https://instagram.com/rizyan.people",
    },
    {
      network: "TikTok",
      username: "rizyan.gt",
      url: "https://tiktok.com/@rizyan.gt",
    },
    {
      network: "YouTube",
      username: "Rizyan Channel",
      url: "https://youtube.com/rizyanchannel",
    },
    {
      network: "X",
      username: "altriziyan",
      url: "https://x.com/altriziyan",
    },
  ],

  experience: [
    {
      company: "Freelance / Self-Employed",
      role: "Full Stack Developer",
      start: "Okt 2023",
      end: "Present",
      location: "Remote",
      location_type: "Remote",
      link: "https://akuriziyan.vercel.app",
      description: [
        "Developed web applications using Next.js with a focus on server-side rendering, routing, and API integration.",
        "Designed and managed PostgreSQL databases, including self-hosted deployments on a home server for multiple personal projects.",
        "Implemented authentication, CRUD operations, and relational data modeling across several applications.",
        "Maintained and monitored self-hosted services, gaining hands-on experience with deployment, backups, and database management.",
        "Used AI-assisted workflows to accelerate development while independently validating logic, performance, and system behavior.",
      ],
    },
    {
      company: "Tech Content Creator",
      role: "Video Producer & Educator",
      start: "Aug 2025",
      end: "Present",
      location: "TikTok / YouTube",
      location_type: "Remote",
      description: [
        "Created technology-focused content covering AI tools, digital productivity, gadgets, and everyday tech usage.",
        "Explained technology trends and updates in a practical and accessible way for a general audience.",
        "Produced short-form and long-form videos for TikTok and YouTube, adapting content formats to each platform.",
        "Handled the full content workflow including ideation, scripting, recording, editing, publishing, and performance review.",
      ],
    },
    {
      company: "Self-Employed",
      role: "YouTube Content Creator",
      start: "Mar 2019",
      end: "Jul 2021",
      location: "YouTube",
      location_type: "Remote",
      description: [
        "Created and managed a YouTube channel, handling content planning, production, and publishing.",
        "Edited video content and optimized titles, descriptions, and thumbnails for audience engagement.",
        "Analyzed audience metrics and performance using YouTube Analytics to improve content strategy.",
      ],
    },
  ],

  education: [
    {
      school: "State Islamic University of Sunan Ampel Surabaya",
      degree:
        "Bachelor of Arts (B.A.) in Islamic Studies (Ushuluddin and Philosophy)",
      field: "Hadith Science",
      start: "2018",
      end: "2023",
      description:
        "Graduated. Undergraduate thesis on the roasting phenomenon in Hadith studies using Ma‘ānī al-Ḥadīth and abnormal psychology approaches.",
    },
  ],

  skills: [
    {
      category: "Languages",
      items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML5/CSS3"],
    },
    {
      category: "Frontend Frameworks",
      items: [
        "Next.js (App Router)",
        "React",
        "Tailwind CSS",
        "Framer Motion",
        "Shadcn UI",
        "Zustand",
      ],
    },
    {
      category: "Backend & Cloud",
      items: [
        "Node.js",
        "Supabase (PostgreSQL)",
        "Prisma ORM",
        "Vercel",
        "Server Actions",
        "REST APIs",
      ],
    },
    {
      category: "Tools & DevOps",
      items: ["Git & GitHub", "VS Code", "Figma", "Postman", "Docker (Basic)"],
    },
  ],
};
