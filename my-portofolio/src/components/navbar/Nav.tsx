"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Code2 } from "lucide-react";
import ImmersiveFullscreenNav from "@/components/ui/immersive-full-screen-nav";
import {
  NAV_LINKS,
  NAV_SOCIALS,
  NAV_PROFILE,
} from "./nav-data";

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleScroll = useCallback(
    (href: string) => {
      if (pathname !== "/") {
        router.push(href.startsWith("#") ? `/${href}` : href);
        return;
      }

      if (href === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const element = document.querySelector(href);
      if (element) {
        const yOffset = -80; // offset for comfortable spacing
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },
    [pathname, router]
  );

  const handleBrandClick = useCallback(() => {
    if (pathname !== "/") {
      router.push("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, router]);

  const linksWithHandlers = useMemo(
    () =>
      NAV_LINKS.map((link) => ({
        label: link.label,
        href: link.href,
        onClick: () => handleScroll(link.href),
      })),
    [handleScroll]
  );

  const brandElement = useMemo(
    () => (
      <span className="group inline-flex items-center gap-x-2 text-zinc-100 hover:text-white transition-colors duration-300">
        <Code2 className="h-6 w-6 transition-transform duration-300 ease-in-out group-hover:rotate-[20deg]" />
        <span className="text-lg font-semibold uppercase tracking-wide">
          {NAV_PROFILE.brand}
        </span>
      </span>
    ),
    []
  );

  return (
    <ImmersiveFullscreenNav
      navConfig={{
        brand: brandElement,
        brandHref: "/",
        onBrandClick: handleBrandClick,
        overlayBg: "#171717",
        headerClosedColor: "#ffffff",
        headerOpenColor: "#ffffff",
        clipOrigin: "bottom",
        openDuration: 1.1,
        closeDuration: 1.1,
      }}
      navContent={{
        agencyName: NAV_PROFILE.agencyName,
        tagline: NAV_PROFILE.tagline,
        location: NAV_PROFILE.location,
        downloadCvHref: NAV_PROFILE.cvHref,
        downloadCvText: NAV_PROFILE.cvText,
        links: linksWithHandlers,
        socials: NAV_SOCIALS,
      }}
    />
  );
}
