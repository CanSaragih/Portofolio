export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  category: string;
  description: string;
  url: string;
  color: string;
  image: string;
  year: string;
}

export const certificates: Certificate[] = [
  {
    id: "hackathon-digital-cooperatives-2026",
    name: "Hackathon Digital Cooperatives Expo 2026",
    issuer: "Kemenkop RI & PEBS FEB UI",
    category: "National Hackathon",
    description:
      "Prestasi sebagai Peserta TOP 100 inovasi teknologi nasional KOPDES HUB - SCH yang diselenggarakan Kemenkop RI bersama PEBS FEB UI dan Google.",
    url: "/certificate/HACKATHON107.pdf",
    color: "#0a2540",
    image: "/certificate/hackathon107.jpg",
    year: "2026",
  },
  {
    id: "hacktiv8-fullstack",
    name: "Hacktiv8 Program Fullstack Javascript Immersive",
    issuer: "Hacktiv8 Indonesia",
    category: "Fullstack Development",
    description:
      "A comprehensive fullstack JavaScript program covering Node.js, Express.js, React.js, and more.",
    url: "/certificate/certificateHacktiv8.pdf",
    color: "#271217",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    year: "2024",
  },
  {
    id: "lks-web-design",
    name: "Participant SMK Competency Contest (LKS) – Web Design",
    issuer: "Kemendikbud / SMK RK Bintang Timur",
    category: "UI & Web Competition",
    description:
      "Participant in the provincial-level Web Design competition (LKS SMK) representing SMK RK Bintang Timur, Pematang Siantar.",
    url: "/certificate/LksCertification.pdf",
    color: "#111827",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
    year: "2023",
  },
  {
    id: "hackerrank-react",
    name: "HackerRank React (Basic) Certificate",
    issuer: "HackerRank",
    category: "Frontend Architecture",
    description:
      "Functions, Currying, Hoisting, Scope, Inheritance, Events and Error Handling in React.",
    url: "https://www.hackerrank.com/certificates/iframe/ab7fe4f7eb3d",
    color: "#0d201a",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    year: "2024",
  },
  {
    id: "hackerrank-problem-solving",
    name: "HackerRank Problem Solving (Basic) Certificate",
    issuer: "HackerRank",
    category: "Algorithms & Logic",
    description:
      "Data Structures (Arrays, Strings), Algorithms (Sorting, Searching), and algorithmic efficiency.",
    url: "https://www.hackerrank.com/certificates/iframe/795707773c14",
    color: "#10232a",
    image:
      "https://images.unsplash.com/photo-1516116211227-bbc0062b1b36?q=80&w=800&auto=format&fit=crop",
    year: "2024",
  },
  {
    id: "hackerrank-javascript",
    name: "HackerRank JavaScript (Basic) Certificate",
    issuer: "HackerRank",
    category: "Core JavaScript",
    description:
      "Functions, Currying, Hoisting, Scope, Inheritance, Events, and asynchronous JavaScript.",
    url: "https://www.hackerrank.com/certificates/iframe/2bcf544a456c",
    color: "#251e12",
    image:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=800&auto=format&fit=crop",
    year: "2024",
  },
  {
    id: "hackerrank-sql",
    name: "HackerRank SQL (Basic) Certificate",
    issuer: "HackerRank",
    category: "Database & Queries",
    description:
      "Relational queries, complex joins, subqueries, and database aggregators.",
    url: "https://www.hackerrank.com/certificates/iframe/bab52c1efdc8",
    color: "#1e172e",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop",
    year: "2024",
  },
  {
    id: "hackerrank-css",
    name: "HackerRank CSS (Basic) Certificate",
    issuer: "HackerRank",
    category: "Styles & Responsive Layouts",
    description:
      "CSS basics: Cascading, Inheritance, Flexbox, Grid layouts, and Box Model.",
    url: "https://www.hackerrank.com/certificates/iframe/b229e49eb949",
    color: "#132133",
    image:
      "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?q=80&w=800&auto=format&fit=crop",
    year: "2024",
  },
];
