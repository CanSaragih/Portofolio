import type { Metadata, Viewport } from "next";
import { Kanit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Can Saragih | Fullstack Developer",
  description:
    "Personal portfolio website of Can Saragih, Fullstack Developer specializing in React, Next.js, TypeScript, and Node.js.",
  icons: {
    icon: [
      { url: "/icon-tab.png?v=3", type: "image/png" },
      { url: "/icon-tab.png?v=3", sizes: "32x32", type: "image/png" },
      { url: "/icon-tab.png?v=3", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/icon-tab.png?v=3" }],
    shortcut: ["/icon-tab.png?v=3"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={kanit.variable} suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#171717] text-white">
        <SmoothScrollProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4200,
              style: {
                margin: 0,
                padding: "12px 16px",
                maxWidth: "90vw",
              },
            }}
          />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
