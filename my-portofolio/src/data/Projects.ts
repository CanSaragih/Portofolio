import type { Project } from "@/components/section/ProjectCard";

export const projects: Project[] = [
  {
    image: "/Img-project/sipdhub.png",
    name: "SIPD HUB — Pusdatin Kemendagri",
    description:
      "A national data integration and analytical visualization portal built for the Ministry of Home Affairs (Pusdatin Kemendagri) to support evidence-based regional development planning and budgeting across ministries and local governments, powered by automated Apache Airflow (DAG) and Onyx data pipelines.",
    tech: [
      "React.js",
      "Express.js",
      "Sequelize",
      "PostgreSQL",
      "Apache Airflow (DAG)",
      "Onyx",
    ],
    demo: "https://sipdhub.kemendagri.go.id/dev-2026/",
  },
  {
    image: "/Img-project/sipadu.png",
    name: "SIPADU — Bappedalitbang Bogor",
    description:
      "An integrated regional data management and AI-assisted analytics platform for Bappedalitbang Bogor Regency managing 2,200+ official datasets. Features automated AI narrative insights ('Narasi AI Otomatis'), interactive charts, and a structured JSON REST API for cross-agency integration.",
    tech: ["PHP", "CodeIgniter", "MySQL", "JavaScript", "REST API", "AI Analytics"],
    demo: "https://ai.bogorkab.go.id/",
  },
  {
    image: "/Img-project/piki.png",
    name: "DPP PIKI — Organization Portal",
    description:
      "The official digital portal and member information system for Persatuan Intelegensia Kristen Indonesia (PIKI), delivering seamless member registration, organization profiles, Satu Data integration, news publications, and smooth scroll-driven animations.",
    tech: [
      "Next.js",
      "Express.js",
      "Prisma",
      "PostgreSQL",
      "GSAP",
      "Lenis",
      "Tailwind CSS",
    ],
    demo: "https://dpp-piki.org/",
  },
  {
    image: "/Img-project/kopdes.png",
    name: "SIMPUL Merah Putih (KOPDES HUB)",
    url: "https://github.com/orgs/KOPDES-HUB/repositories",
    description:
      "An integrated digital cooperative ecosystem (TOP 100 Hackathon Digital Cooperatives Expo 2026) unifying digital member cards (KTA), savings management, e-voting, e-RAT digital assemblies, and a cooperative learning management system.",
    tech: ["Next.js", "Express.js", "Prisma", "Tailwind CSS"],
    demo: "https://kopdes-psi.vercel.app",
  },
  {
    image: "/Img-project/jhonipurba.png",
    name: "Law Office Jhoni H P Purba, S.H.",
    url: "https://github.com/CanSaragih/lawoffice-johni",
    description:
      "A modern, responsive web presence for a legal practice in Bogor providing civil, criminal, family law, and consultation services, crafted with clean editorial typography and fluid Framer Motion interactions.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    demo: "https://jhonipurba.vercel.app",
  },
  {
    image: "/Img-project/ShopHub.png",
    name: "Shophub",
    url: "https://github.com/H8-FSJS-P3S5/gc02-CanSaragih",
    description:
      "A responsive e-commerce web app where users can browse products, manage wishlists, and experience smooth shopping. Built with Next.js, TypeScript, and styled using Tailwind CSS.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
    demo: "https://shophub-ivory.vercel.app",
  },
];
