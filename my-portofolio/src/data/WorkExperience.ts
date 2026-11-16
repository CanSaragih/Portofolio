export interface WorkExperienceItem {
  id: string;
  position: string;
  company: string;
  client?: string;
  location?: string;
  title: string;
  badge: string;
  description: string;
  responsibilities: string[];
  tech: string[];
  url?: string;
  urlLabel?: string;
}

export const workExperience: WorkExperienceItem[] = [
  {
    id: "bentang-kemendagri",
    position: "Fullstack Developer & Data Engineer",
    company: "Bentang Inspirasi Teknologi",
    client: "SIPD-HUB - Kemendagri",
    location: "Jakarta",
    title: "Jan 2026 – Present",
    badge: "Current Assignment",
    description:
      "Assigned to the Data and Information Center (Pusdatin) of Indonesia's Ministry of Home Affairs (Kemendagri) under Bentang Inspirasi Teknologi (joined Sep 2025 – Present) to engineer SIPD-HUB—the national portal for regional development data integration, interoperability, and analytical visualization.",
    responsibilities: [
      "Built fullstack web features and interactive data visualization views for SIPD-HUB using React.js, Express.js, Sequelize, and PostgreSQL.",
      "Engineered, orchestrated, and monitored automated ETL and cross-agency data synchronization pipelines using Apache Airflow (DAGs) integrated with Onyx.",
      "Designed relational PostgreSQL schemas and structured API services to support reliable thematic and sectoral data exchange across ministries and regional governments.",
    ],
    tech: [
      "React.js",
      "Express.js",
      "Sequelize",
      "PostgreSQL",
      "Apache Airflow (DAG)",
      "Onyx",
    ],
    url: "https://sipdhub.kemendagri.go.id/",
    urlLabel: "Visit SIPD-HUB",
  },
  {
    id: "bentang-bappedalitbang",
    position: "Fullstack Developer",
    company: "Bentang Inspirasi Teknologi",
    client: "SIPADU - Bappedalitbang Bogor",
    location: "Bogor",
    title: "Sep 2025 – Dec 2025",
    badge: "Client Project",
    description:
      "Engineered SIPADU (Sistem Informasi Pengelolaan dan Analisis Data Unggul) for Bappedalitbang Bogor Regency—an integrated regional planning platform managing 2,200+ official datasets with AI-assisted analytical narratives, dynamic visualizations, and a public JSON API.",
    responsibilities: [
      "Developed end-to-end dataset management, dynamic charting/table modules, and internal operational workflows using PHP, CodeIgniter, and MySQL.",
      "Integrated AI-assisted narrative generation ('Narasi AI Otomatis') to convert sectoral statistical tables into clear summaries and evidence-based planning insights.",
      "Implemented structured JSON REST API services allowing external agencies, researchers, and third-party dashboards to access verified regional datasets.",
    ],
    tech: [
      "PHP",
      "CodeIgniter",
      "MySQL",
      "JavaScript",
      "REST API",
      "AI Integration",
    ],
    url: "https://ai.bogorkab.go.id/",
    urlLabel: "Visit SIPADU",
  },
  {
    id: "custom-kekinian",
    position: "Video Editor & Graphic Designer",
    company: "Custom Kekinian",
    location: "Indonesia",
    title: "Aug 2019 – Jan 2025",
    badge: "Creative Background",
    description:
      "Five+ years crafting visual brand identities, marketing assets, and high-engagement video campaigns prior to transitioning into software engineering.",
    responsibilities: [
      "Produced and edited high-engagement videos for Instagram, TikTok, and YouTube to strengthen brand visibility.",
      "Designed marketing visuals and custom apparel graphics across two business divisions using After Effects, Premiere Pro, Photoshop, and CorelDRAW.",
    ],
    tech: ["After Effects", "Premiere Pro", "Photoshop", "CorelDRAW"],
  },
];
