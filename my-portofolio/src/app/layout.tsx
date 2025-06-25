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

  // Force favicon update function
  const updateFavicon = () => {
    // Remove existing favicon links
    const existingLinks = document.querySelectorAll('link[rel*="icon"]');
    existingLinks.forEach((link) => link.remove());

    // Add new favicon links
    const iconUrls = [
      { rel: "icon", type: "image/png", href: "/icon-tab.png?v=3" },
      { rel: "shortcut icon", type: "image/png", href: "/icon-tab.png?v=3" },
      { rel: "apple-touch-icon", href: "/icon-tab.png?v=3" },
      {
        rel: "icon",
        sizes: "32x32",
        type: "image/png",
        href: "/icon-tab.png?v=3",
      },
      {
        rel: "icon",
        sizes: "16x16",
        type: "image/png",
        href: "/icon-tab.png?v=3",
      },
    ];

    iconUrls.forEach((icon) => {
      const link = document.createElement("link");
      Object.assign(link, icon);
      document.head.appendChild(link);
    });
  };

  useEffect(() => {
    if (mounted && !isLoading) {
      // Force update favicon after preloader
      setTimeout(updateFavicon, 100);
    }
  }, [mounted, isLoading]);

  // Icon configuration - consistent untuk semua state
  const iconLinks = (
    <>
      <link rel="icon" href="/icon-tab.png?v=3" type="image/png" />
      <link rel="shortcut icon" href="/icon-tab.png?v=3" type="image/png" />
      <link rel="apple-touch-icon" href="/icon-tab.png?v=3" />
      <link
        rel="icon"
        sizes="32x32"
        href="/icon-tab.png?v=3"
        type="image/png"
      />
      <link
        rel="icon"
        sizes="16x16"
        href="/icon-tab.png?v=3"
        type="image/png"
      />
      <meta name="theme-color" content="#000000" />
    </>
  );

  // Render loading state sampai mounted
  if (!mounted) {
    return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <title>Can Saragih | Fullstack Developer</title>
          <meta name="description" content="My personal portfolio website" />
          {iconLinks}
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
        {iconLinks}
      </head>
      <body
        className={`${poppins.variable} font-sans antialiased`}
        style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
        suppressHydrationWarning
      >
        {isLoading && (
          <Preloader
            onComplete={handlePreloaderComplete}
            duration={3200}
            loaderText="Welcome to Can Saragih's Portfolio Website"
          />
        )}

        {showContent && <ScrollWrapper>{children}</ScrollWrapper>}
      </body>
    </html>
  );
}
