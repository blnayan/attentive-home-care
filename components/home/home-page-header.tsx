import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type NavLinkItem = {
  label: string;
  href: string;
  sectionId: string | null;
};

type HeaderCta = {
  label: string;
  href: string;
} | null;

interface HomePageHeaderProps {
  activeSection: string;
  logoImageUrl: string | null;
  logoImageAlt: string;
  navigationLogoText: string;
  navLinks: NavLinkItem[];
  navigationCta: HeaderCta;
  phoneActionButton: ReactNode;
}

export function HomePageHeader({
  activeSection,
  logoImageUrl,
  logoImageAlt,
  navigationLogoText,
  navLinks,
  navigationCta,
  phoneActionButton,
}: HomePageHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#home"
            className={cn(
              "group flex items-center gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600",
              activeSection === "home"
                ? "text-green-800"
                : "text-green-700 hover:text-green-800"
            )}
            aria-label="Go to Attentive Home Care home section"
            aria-current={activeSection === "home" ? "page" : undefined}
          >
            {logoImageUrl ? (
              <Image
                src={logoImageUrl}
                alt={logoImageAlt}
                width={180}
                height={48}
                className="h-10 w-auto"
                priority
              />
            ) : (
              <>
                <Heart className="h-6 w-6 text-rose-600" />
                <span
                  className={cn(
                    "text-xl font-bold transition-colors group-hover:text-green-800",
                    activeSection === "home"
                      ? "text-green-800"
                      : "text-green-700"
                  )}
                >
                  {navigationLogoText}
                </span>
              </>
            )}
          </Link>
          {navLinks.map((link) => (
            <Link
              key={`${link.label}-${link.href}`}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                link.sectionId && activeSection === link.sectionId
                  ? "text-green-800 underline decoration-2 decoration-green-700 underline-offset-4"
                  : "text-gray-600 hover:text-green-700"
              )}
              aria-current={
                link.sectionId && activeSection === link.sectionId
                  ? "page"
                  : undefined
              }
            >
              {link.label}
            </Link>
          ))}
          {navigationCta?.label ? (
            <Link
              href={navigationCta.href}
              className="text-sm font-medium hover:text-green-700"
            >
              {navigationCta.label}
            </Link>
          ) : null}
        </nav>
        <div className="hidden md:flex">{phoneActionButton}</div>
        <button className="md:hidden" type="button" aria-label="Open navigation">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export type { NavLinkItem };
