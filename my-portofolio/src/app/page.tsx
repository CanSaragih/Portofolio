"use client";

import Nav from "@/components/navbar/Nav";
import Footer from "@/components/navbar/Footer";
import { ChatBox } from "@/components/ChatBot";
import { ParticleBackground } from "@/components/section/ParticleBackground";
import { HeroSection } from "@/components/section/HeroSection";
import { AboutSection } from "@/components/section/AboutSection";
import { SkillsSection } from "@/components/section/SkillsSection";
import { RecentProjectsSection } from "@/components/section/RecentProjectsSection";
import { Experience } from "@/components/section/Experience";
import { CertificatesSection } from "@/components/section/CertificatesSection";
import { ContactSection } from "@/components/section/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#171717] text-white overflow-x-hidden relative">
      <ParticleBackground />
      <ChatBox />
      <Nav />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <RecentProjectsSection />
      <Experience />
      <CertificatesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
