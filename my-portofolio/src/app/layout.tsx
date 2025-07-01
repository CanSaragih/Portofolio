"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Kanit } from "next/font/google";
import ScrollWrapper from "@/components/ScrollWrapper";
import { Toaster } from "react-hot-toast";
import LoadingScreen from "@/components/LoadingScreen";
import "./globals.css";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-prompt",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleError = (event: ErrorEvent) => {
      console.error("Global error caught:", event.error);
      event.preventDefault();
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason);
      event.preventDefault();
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, [pathname]);

  useEffect(() => {
    if (!mounted) return;
    const updateFavicon = () => {
      const iconUrls = [
        { rel: "icon", href: "/icon-tab.png?v=3" },
        { rel: "shortcut icon", href: "/icon-tab.png?v=3" },
        { rel: "apple-touch-icon", href: "/icon-tab.png?v=3" },
        { rel: "icon", sizes: "32x32", href: "/icon-tab.png?v=3" },
        { rel: "icon", sizes: "16x16", href: "/icon-tab.png?v=3" },
      ];
      document
        .querySelectorAll('link[rel*="icon"]')
        .forEach((link) => link.remove());
      iconUrls.forEach((icon) => {
        const link = document.createElement("link");
        Object.assign(link, { ...icon, type: "image/png" });
        document.head.appendChild(link);
      });
    };

    updateFavicon();
  }, [mounted]);

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

  if (!mounted) {
    return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <title>Can Saragih | Fullstack Developer</title>
          <meta name="description" content="My personal portfolio website" />
          {iconLinks}
        </head>
        <body
          className={`${kanit.variable} font-sans antialiased`}
          suppressHydrationWarning
        >
          <LoadingScreen />
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
        className={`${kanit.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4200,
            style: {
              margin: 0,
              padding: "12px 16px",
              maxWidth: "90vw",
              fontFamily: "var(--font-sevillana)",
            },
          }}
        />
        <ScrollWrapper>{children}</ScrollWrapper>
      </body>
    </html>
  );
}
