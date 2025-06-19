import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ScrollWrapper from "@/components/ScrollWrapper";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Can Saragih || Fullstack Developer",
  description: "My personal portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased`}
        style={{ fontFamily: "var(--font-poppins), system-ui, sans-serif" }}
      >
        <ScrollWrapper>{children}</ScrollWrapper>
      </body>
    </html>
  );
}
