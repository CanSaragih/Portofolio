export interface NavItem {
  label: string;
  href: string;
}

export interface NavSocialItem {
  type: "github" | "linkedin" | "instagram" | "email" | "twitter" | "facebook";
  href: string;
}

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "My Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const NAV_SOCIALS: NavSocialItem[] = [
  { type: "github", href: "https://github.com/CanSaragih" },
  { type: "linkedin", href: "https://www.linkedin.com/in/can-saragih/" },
  { type: "instagram", href: "https://www.instagram.com/can_whardana/" },
  { type: "email", href: "mailto:canwhardana@gmail.com" },
];

export const NAV_PROFILE = {
  brand: "Can",
  agencyName: "Can Saragih",
  tagline: "Fullstack Developer ",
  location: "Jakarta, Indonesia",
  cvHref: "/cv/CV-CAN WHARDANA SARAGIH.pdf",
  cvText: "Download CV",
} as const;
