"use client";

import { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import ScrollWrapper from "@/components/ScrollWrapper";
import { Preloader } from "@/components/Preloader";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure hydration consistency
  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  // Render loading state sampai mounted
  if (!mounted) {
    return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <title>Can Saragih | Fullstack Developer</title>
          <meta name="description" content="My personal portfolio website" />
        </head>
        <body
          className={`${poppins.variable} font-sans antialiased`}
          suppressHydrationWarning
        >
          <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-white">Loading...</div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Can Saragih | Fullstack Developer</title>
        <meta name="description" content="My personal portfolio website" />
      </head>
      <body
        className={`${poppins.variable} font-sans antialiased`}
        style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
        suppressHydrationWarning
      >
        {isLoading && (
          <Preloader
            onComplete={handlePreloaderComplete}
            duration={3500}
            loaderText="Welcome to Can Saragih's Portfolio Website"
          />
        )}

        {showContent && <ScrollWrapper>{children}</ScrollWrapper>}
      </body>
    </html>
  );
}
