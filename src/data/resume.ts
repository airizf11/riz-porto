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
    // Nanti di UI kita bikin logic: Kalau kosong -> Tombol jadi "Coming Soon" (Disabled)
    pdfUrl: "",
    // pdfUrl: "/resume.pdf", // Uncomment ini kalau file sudah ada di folder public
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
      network: "YouTube",
      username: "Rizyan Channel",
      url: "https://youtube.com/rizyanchannel",
    },
  ],

  experience: [
    {
      company: "Freelance / Self-Employed",
      role: "Full Stack Developer",
      start: "Jan 2023",
      end: "Present",
      location: "Remote",
      location_type: "Remote",
      link: "https://akuriziyan.vercel.app",
      description: [
        "Architected and developed 'Apdetax', a SaaS platform for tax regulation monitoring using Next.js 14, Supabase, and Python scrapers.",
        "Improved site performance by 40% for client projects through image optimization and server-side rendering strategies.",
        "Collaborated directly with clients to translate vague requirements into technical specifications and user stories.",
        "Implemented CI/CD pipelines using GitHub Actions to streamline deployment to Vercel.",
      ],
    },
    {
      company: "Tech Content Creator",
      role: "Video Producer & Educator",
      start: "Jun 2021",
      end: "Present",
      location: "YouTube / TikTok",
      location_type: "Remote",
      description: [
        "Produced over 50+ educational videos regarding technology, coding, and productivity tools.",
        "Grew audience to 10k+ followers across platforms through consistent, high-value content strategy.",
        "Managed the entire production pipeline: Scripting, Recording, Editing (Premiere Pro), and Analytics review.",
      ],
    },
    // Contoh Job Lama (Bisa dihapus/edit)
    {
      company: "StartUp Inc (Dummy)",
      role: "Frontend Intern",
      start: "Jan 2022",
      end: "Dec 2022",
      location: "Bandung, Indonesia",
      location_type: "Hybrid",
      description: [
        "Assisted in migrating legacy React codebase to Next.js App Router.",
        "Built reusable UI components library using Tailwind CSS and Storybook.",
        "Participated in daily stand-ups and code reviews to ensure code quality.",
      ],
    },
  ],

  education: [
    {
      school: "State Islamic University of Sunan Ampel Surabaya",
      degree:
        "Bachelor of Arts (B.A.) in Islamic Studies (Ushuluddin and Philosophy)",
      field: "Informatics Engineering",
      start: "2018",
      end: "2023",
      description:
        "Graduated with Honors (Cum Laude). Lead of the Web Development Student Club. Thesis on 'AI-Driven Content Analysis'.",
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
