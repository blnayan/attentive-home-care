"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Menu } from "lucide-react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((previous) => !previous);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const mobileNavId = "home-page-mobile-nav";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex w-full items-center md:hidden">
          <button
            className="mr-2 rounded-md p-2 text-gray-700 transition-colors hover:text-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            type="button"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMenuOpen}
            aria-controls={mobileNavId}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
          <Link
            href="#home"
            className="mx-auto flex items-center gap-2"
            onClick={closeMenu}
            aria-label="Go to Attentive Home Care home section"
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
                <span className="text-lg font-bold text-green-700">
                  {navigationLogoText}
                </span>
              </>
            )}
          </Link>
        </div>
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
      </div>
      {isMenuOpen ? (
        <div className="border-b bg-white shadow-sm md:hidden">
          <nav
            id={mobileNavId}
            className="container mx-auto flex flex-col gap-3 px-4 pb-6 pt-4"
          >
            {navLinks.map((link) => (
              <Link
                key={`mobile-${link.label}-${link.href}`}
                href={link.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-green-700"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            {navigationCta?.label ? (
              <Link
                href={navigationCta.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-green-700"
                onClick={closeMenu}
              >
                {navigationCta.label}
              </Link>
            ) : null}
            {phoneActionButton ? (
              <div className="pt-2" onClick={closeMenu}>
                {phoneActionButton}
              </div>
            ) : null}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export type { NavLinkItem };
