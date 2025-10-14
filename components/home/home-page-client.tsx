"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Check,
  Clock,
  Heart,
  Home as HomeIcon,
  Mail,
  Phone,
  Shield,
} from "lucide-react";
import type {
  ActionItem,
  ContactCard,
  HomePageData,
  IconName,
  LinkItem,
  MediaItem,
} from "@/types/home-page";

const ICON_MAP: Record<IconName, typeof Heart> = {
  heart: Heart,
  home: HomeIcon,
  shield: Shield,
  clock: Clock,
  check: Check,
  phone: Phone,
  mail: Mail,
};

const resolveMediaUrl = (media?: MediaItem | string | null) => {
  if (!media) {
    return null;
  }

  if (typeof media === "string") {
    if (media.startsWith("http") || media.startsWith("/")) {
      return media;
    }

    return null;
  }

  if (media.url) {
    return media.url;
  }

  if (media.filename) {
    return `/media/${media.filename}`;
  }

  return null;
};

const resolveMediaAlt = (
  media: MediaItem | string | null | undefined,
  fallback: string
) => {
  if (!media || typeof media === "string") {
    return fallback;
  }

  return media.alt ?? fallback;
};

const normalizeHref = (href?: string | null, fallback = "#") => {
  if (!href) {
    return fallback;
  }

  return href.trim().length > 0 ? href : fallback;
};

const getIconComponent = (icon?: IconName | null) => {
  if (!icon) {
    return null;
  }

  return ICON_MAP[icon] ?? null;
};

const extractSectionIds = (links: LinkItem[]) => {
  return Array.from(
    new Set<string>([
      "home",
      ...links
        .map((link) => link.href)
        .filter((href): href is string => Boolean(href))
        .filter((href) => href.startsWith("#"))
        .map((href) => href.replace("#", "")),
    ])
  );
};

const renderActionButton = (
  action: ActionItem | null | undefined,
  {
    className,
    variant,
    iconClassName = "mr-2 h-4 w-4",
  }: {
    className?: string;
    variant?: "default" | "outline";
    iconClassName?: string;
  } = {}
) => {
  if (!action?.label) {
    return null;
  }

  const href = normalizeHref(action.href);
  const Icon = getIconComponent(action.icon);

  return (
    <Button className={className} variant={variant} asChild>
      <Link href={href}>
        {Icon ? <Icon className={iconClassName} /> : null}
        {action.label}
      </Link>
    </Button>
  );
};

const formatLines = (card: ContactCard) => {
  const lines = card.lines ?? [];
  return lines
    .map((line) => line.value)
    .filter((value): value is string => Boolean(value));
};

export default function HomePageClient({ data }: { data: HomePageData }) {
  const navigation = data.navigation ?? {};
  const hero = data.hero ?? {};
  const about = data.about ?? {};
  const servicesSection = data.servicesSection ?? {};
  const whyChoose = data.whyChoose ?? {};
  const contact = data.contact ?? {};
  const closingCta = data.closingCta ?? {};
  const footer = data.footer ?? {};

  const navLinks = navigation.links ?? [];
  const [activeSection, setActiveSection] = useState("home");

  const sectionIds = useMemo(() => extractSectionIds(navLinks), [navLinks]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0.1,
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  const logoImageUrl = resolveMediaUrl(navigation.logoImage);
  const logoImageAlt = resolveMediaAlt(
    navigation.logoImage,
    navigation.logoText ?? "Attentive Home Care, Inc."
  );
  const heroImageUrl = resolveMediaUrl(hero.image) ?? "/hero-caregiver.jpg";
  const heroImageAlt = resolveMediaAlt(
    hero.image,
    "Caregiver helping senior at home"
  );
  const whyChooseImageUrl = resolveMediaUrl(whyChoose.image);
  const whyChooseImageAlt = resolveMediaAlt(
    whyChoose.image,
    "Compassionate caregiver supporting senior at home"
  );
  const hasWhyImage = Boolean(whyChooseImageUrl);

  const headerPhoneButton: ActionItem = {
    label: navigation.phoneButton?.label ?? "Call Us Today",
    href: navigation.phoneButton?.href ?? "tel:5714496448",
    icon: "phone",
  };

  const heroPrimaryAction = hero.primaryAction ?? {
    label: "Our Services",
    href: "#services",
  };

  const heroSecondaryAction: ActionItem = hero.secondaryAction ?? {
    label: "571-449-6448",
    href: "tel:5714496448",
    icon: "phone",
  };

  const servicesCards = servicesSection.cards ?? [];
  const features = whyChoose.features ?? [];
  const contactCards = contact.cards ?? [];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="#home"
              className={cn(
                "group flex items-center gap-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600",
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
                    {navigation.logoText ?? "Attentive Home Care, Inc."}
                  </span>
                </>
              )}
            </Link>
            {navLinks.map((link) => {
              if (!link.label) {
                return null;
              }

              const href = normalizeHref(link.href);
              const sectionId = href.startsWith("#")
                ? href.replace("#", "")
                : null;

              return (
                <Link
                  key={`${link.label}-${href}`}
                  href={href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    sectionId && activeSection === sectionId
                      ? "text-green-800 underline decoration-2 decoration-green-700 underline-offset-4"
                      : "text-gray-600 hover:text-green-700"
                  )}
                  aria-current={
                    sectionId && activeSection === sectionId
                      ? "page"
                      : undefined
                  }
                >
                  {link.label}
                </Link>
              );
            })}
            {navigation.cta?.label ? (
              <Link
                href={normalizeHref(navigation.cta.href)}
                className="text-sm font-medium hover:text-green-700"
              >
                {navigation.cta.label}
              </Link>
            ) : null}
          </nav>
          <div className="hidden md:flex">
            {renderActionButton(headerPhoneButton, {
              className: "bg-rose-600 hover:bg-rose-700",
            })}
          </div>
          <button
            className="md:hidden"
            type="button"
            aria-label="Open navigation"
          >
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
      <main className="flex-1">
        <section
          id="home"
          className="relative bg-gradient-to-r from-green-50 to-rose-50 py-20"
        >
          <div className="container mx-auto flex flex-col items-center gap-10 px-4 md:flex-row md:gap-12">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-green-800 md:text-5xl">
                {hero.title ?? "Compassionate Home Care for Your Loved Ones"}
              </h1>
              <p className="text-lg text-gray-600">
                {hero.description ??
                  "Providing high-quality non-medical home care services that improve the quality of life for every client."}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                {heroPrimaryAction?.label
                  ? renderActionButton(heroPrimaryAction, {
                      className: "bg-green-700 hover:bg-green-800 text-white",
                    })
                  : null}
                {heroSecondaryAction?.label
                  ? renderActionButton(heroSecondaryAction, {
                      variant: "outline",
                      className:
                        "border-rose-600 text-rose-600 hover:bg-rose-50 bg-transparent",
                    })
                  : null}
              </div>
            </div>
            <div className="flex-none">
              <Image
                src={heroImageUrl}
                alt={heroImageAlt}
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>
        </section>

        <section id="about" className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 md:items-stretch">
              <div className="flex h-full flex-col rounded-2xl border border-green-100 bg-green-50/60 p-8 shadow-sm">
                {about.missionBadge ? (
                  <div className="inline-block w-fit rounded-lg bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    {about.missionBadge}
                  </div>
                ) : null}
                <h2 className="mt-4 text-3xl font-bold text-green-800">
                  {about.missionTitle ?? "Improving Quality of Life"}
                </h2>
                <p className="mt-4 text-gray-600">
                  {about.missionDescription ??
                    "It is our mission to deliver high standard, budget-friendly, and personalized non-medical homecare services that will improve the quality of life of every client that we encounter. We endeavor to help our clients live a healthier, safer, and more independent life at home."}
                </p>
              </div>
              <div className="flex h-full flex-col rounded-2xl border border-rose-100 bg-rose-50/60 p-8 shadow-sm">
                {about.visionBadge ? (
                  <div className="inline-block w-fit rounded-lg bg-rose-100 px-3 py-1 text-sm font-medium text-rose-800">
                    {about.visionBadge}
                  </div>
                ) : null}
                <h3 className="mt-4 text-3xl font-bold text-rose-700">
                  {about.visionTitle ?? "Exceeding Expectations"}
                </h3>
                <p className="mt-4 text-gray-600">
                  {about.visionDescription ??
                    "We endeavor to use the latest techniques and advances in non-medical home care so that we can exceed our client's expectations and become one of Virginia's top non-medical home care providers."}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-rose-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              {servicesSection.badge ? (
                <div className="inline-block rounded-lg bg-rose-100 px-3 py-1 text-sm font-medium text-rose-800">
                  {servicesSection.badge}
                </div>
              ) : null}
              <h2 className="mt-2 text-3xl font-bold text-rose-700">
                {servicesSection.title ?? "Personalized Care Services"}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                {servicesSection.description ??
                  "If you are looking for high-quality non-medical home care services, you can rely on Attentive Home Care, Inc. to provide what you need. Our caregivers will thoroughly evaluate your situation, and attentively listen to your requests."}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {servicesCards.map((card) => {
                if (!card.title) {
                  return null;
                }
                const Icon = getIconComponent(card.icon ?? "heart");
                return (
                  <div
                    key={`${card.title}-${card.id ?? ""}`}
                    className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                      {Icon ? <Icon className="h-6 w-6 text-rose-600" /> : null}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {card.title}
                    </h3>
                    {card.description ? (
                      <p className="mt-2 text-gray-600">{card.description}</p>
                    ) : null}
                  </div>
                );
              })}
            </div>

            {servicesSection.cta?.label ? (
              <div className="mt-12 text-center">
                <Button className="bg-rose-600 hover:bg-rose-700" asChild>
                  <Link href={normalizeHref(servicesSection.cta.href)}>
                    {servicesSection.cta.label}
                  </Link>
                </Button>
              </div>
            ) : null}
          </div>
        </section>

        <section className="bg-white py-16">
          <div
            className={cn(
              "container mx-auto px-4",
              hasWhyImage
                ? "grid items-center gap-12 md:grid-cols-2"
                : "max-w-3xl space-y-6"
            )}
          >
            {hasWhyImage ? (
              <div>
                <Image
                  src={whyChooseImageUrl as string}
                  alt={whyChooseImageAlt}
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            ) : null}
            <div
              className={cn(
                "space-y-6",
                hasWhyImage ? "" : "text-center md:text-left"
              )}
            >
              <h2 className="text-3xl font-bold text-green-800">
                {whyChoose.title ?? "Why Choose Attentive Home Care?"}
              </h2>
              <div className="space-y-4">
                {features.map((feature) => {
                  if (!feature.title) {
                    return null;
                  }

                  const Icon = getIconComponent(feature.icon ?? "check");

                  return (
                    <div
                      key={`${feature.title}-${feature.id ?? ""}`}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                        {Icon ? (
                          <Icon className="h-4 w-4 text-green-700" />
                        ) : null}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {feature.title}
                        </h3>
                        {feature.description ? (
                          <p className="text-gray-600">{feature.description}</p>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-green-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-green-800">
                {contact.title ?? "Get In Touch"}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                {contact.description ??
                  "We encourage you to call us or set an appointment if you have further questions or need clarifications regarding our services at Attentive Home Care, Inc."}
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {contactCards.map((card) => {
                if (!card.title) {
                  return null;
                }

                const Icon = getIconComponent(card.icon ?? "phone");
                const lines = formatLines(card);

                return (
                  <div
                    key={`${card.title}-${card.id ?? ""}`}
                    className="rounded-lg bg-white p-6 text-center shadow-md"
                  >
                    <div className="mb-4 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      {Icon ? (
                        <Icon className="h-6 w-6 text-green-700" />
                      ) : null}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {card.title}
                    </h3>
                    {lines.map((line) => (
                      <p key={line} className="mt-2 text-gray-600">
                        {line}
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>

            {contact.cta?.label ? (
              <div className="mt-12 text-center">
                {renderActionButton(contact.cta, {
                  className: "bg-green-700 hover:bg-green-800",
                })}
              </div>
            ) : null}
          </div>
        </section>

        <section className="bg-rose-600 py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold">
              {closingCta.title ?? "Ready to Get Started?"}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl">
              {closingCta.description ??
                "Contact us today to learn more about our services and how we can help improve the quality of life for you or your loved one."}
            </p>
            {closingCta.buttonLabel ? (
              <div className="mt-8">
                {renderActionButton(
                  {
                    label: closingCta.buttonLabel,
                    href: closingCta.buttonHref ?? "tel:5714496448",
                    icon: closingCta.buttonIcon ?? "phone",
                  },
                  {
                    className: "bg-white text-rose-600 hover:bg-gray-100",
                    iconClassName: "mr-2 h-4 w-4",
                  }
                )}
              </div>
            ) : null}
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Heart className="h-6 w-6 text-rose-500" />
                <span className="text-xl font-bold">
                  {footer.logoText ??
                    navigation.logoText ??
                    "Attentive Home Care, Inc."}
                </span>
              </div>
              <p className="text-gray-400">
                {footer.description ??
                  "Providing high-quality non-medical home care services to improve the quality of life for our clients."}
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
              <ul className="space-y-2">
                {(footer.quickLinks ?? navLinks).map((link) => {
                  if (!link.label) {
                    return null;
                  }

                  const href = normalizeHref(link.href);

                  return (
                    <li key={`${link.label}-${href}`}>
                      <Link
                        href={href}
                        className="text-gray-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-bold">Contact Information</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-rose-500" />
                  {footer.contact?.phone ?? "571-449-6448"}
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-rose-500" />
                  <Link
                    href={`mailto:${
                      footer.contact?.email ?? "attentivehomecare55@gmail.com"
                    }`}
                    className="transition-colors hover:text-white"
                  >
                    {footer.contact?.email ?? "attentivehomecare55@gmail.com"}
                  </Link>
                </li>
                <li>
                  <Link
                    href={
                      footer.contact?.website ??
                      "http://www.attentivehomecareva.com"
                    }
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    {footer.contact?.website ?? "www.attentivehomecareva.com"}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()}{" "}
              {footer.logoText ??
                navigation.logoText ??
                "Attentive Home Care, Inc."}
              . All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
