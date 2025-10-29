"use client";

import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/home/contact-form";
import {
  HomePageHeader,
  type NavLinkItem,
} from "@/components/home/home-page-header";
import {
  HomePageFooter,
  type FooterContactInfo,
  type FooterQuickLink,
} from "@/components/home/home-page-footer";
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

const resolveMediaUrl = (media?: MediaItem | number | string | null) => {
  if (!media) {
    return null;
  }

  if (typeof media === "string") {
    if (media.startsWith("http") || media.startsWith("/")) {
      return media;
    }

    return null;
  }

  if (typeof media === "number") {
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
  media: MediaItem | number | string | null | undefined,
  fallback: string
) => {
  if (!media || typeof media === "string" || typeof media === "number") {
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
  const navigationLogoText = navigation.logoText ?? "Attentive Home Care, Inc.";
  const headerNavLinks: NavLinkItem[] = navLinks
    .filter((link): link is LinkItem & { label: string } => Boolean(link.label))
    .map((link) => {
      const href = normalizeHref(link.href);
      const sectionId = href.startsWith("#") ? href.replace("#", "") : null;

      return {
        label: link.label as string,
        href,
        sectionId,
      };
    });

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
  const headerNavigationCta = navigation.cta?.label
    ? {
        label: navigation.cta.label,
        href: normalizeHref(navigation.cta.href),
      }
    : null;
  const headerPhoneButtonNode = renderActionButton(headerPhoneButton, {
    className: "bg-rose-600 hover:bg-rose-700",
  });
  const footerLogoText = footer.logoText ?? navigationLogoText;
  const footerDescription =
    footer.description ??
    "Providing high-quality non-medical home care services to improve the quality of life for our clients.";
  const footerQuickLinksSource = footer.quickLinks ?? navLinks;
  const footerQuickLinks: FooterQuickLink[] = footerQuickLinksSource
    .filter((link): link is LinkItem & { label: string } =>
      Boolean(link?.label)
    )
    .map((link) => ({
      label: link.label as string,
      href: normalizeHref(link.href),
    }));
  const fallbackWebsiteUrl = "http://www.attentivehomecareva.com";
  const fallbackWebsiteDisplay = "www.attentivehomecareva.com";
  const websiteUrl = footer.contact?.website ?? fallbackWebsiteUrl;
  const footerContact: FooterContactInfo = {
    phone: footer.contact?.phone ?? "571-449-6448",
    email: footer.contact?.email ?? "attentivehomecare55@gmail.com",
    website: websiteUrl,
    displayWebsite: footer.contact?.website ?? fallbackWebsiteDisplay,
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
      <HomePageHeader
        activeSection=""
        logoImageUrl={logoImageUrl}
        logoImageAlt={logoImageAlt}
        navigationLogoText={navigationLogoText}
        navLinks={headerNavLinks}
        navigationCta={headerNavigationCta}
        phoneActionButton={headerPhoneButtonNode}
      />
      <main className="flex-1">
        <section
          id="home"
          className="relative bg-gradient-to-r from-green-50 to-rose-50 py-20 scroll-mt-16"
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

        <section id="about" className="bg-white py-16 scroll-mt-16">
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

        <section id="services" className="bg-rose-50 py-16 scroll-mt-16">
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

        <section id="contact" className="bg-green-50 py-16 scroll-mt-16">
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
              {contactCards.map((card, index) => {
                if (!card.title) {
                  return null;
                }

                const Icon = getIconComponent(card.icon ?? "phone");
                const lines = card.lines;

                if (lines == undefined) {
                  return null;
                }

                return (
                  <div
                    key={`${card.title}-${card.id ?? index}`}
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
                    {lines.map((line, lineIndex) => {
                      return (
                        <p
                          key={`${card.title ?? "contact-card"}-${lineIndex}`}
                          className="mt-2"
                        >
                          {line.href ? (
                            <Link
                              className="text-green-700 font-medium transition-colors hover:text-green-900"
                              href={line.href}
                            >
                              {line.value}
                            </Link>
                          ) : (
                            line.value
                          )}
                        </p>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div className="mt-12 mx-auto w-full max-w-2xl">
              <ContactForm />
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
      <HomePageFooter
        logoText={footerLogoText}
        description={footerDescription}
        quickLinks={footerQuickLinks}
        contact={footerContact}
      />
    </div>
  );
}
