export type IconName = "heart" | "home" | "shield" | "clock" | "check" | "phone" | "mail";

export interface MediaItem {
  id?: string | number;
  url?: string;
  filename?: string;
  alt?: string | null;
}

export interface LinkItem {
  label?: string | null;
  href?: string | null;
}

export interface ActionItem extends LinkItem {
  icon?: IconName | null;
}

export interface TextLine {
  id?: string | number;
  value?: string | null;
}

export interface NavigationData {
  logoText?: string | null;
  logoImage?: MediaItem | string | null;
  links?: LinkItem[];
  cta?: LinkItem | null;
  phoneButton?: LinkItem | null;
}

export interface HeroData {
  title?: string | null;
  description?: string | null;
  primaryAction?: ActionItem | null;
  secondaryAction?: ActionItem | null;
  image?: MediaItem | string | null;
}

export interface AboutData {
  missionBadge?: string | null;
  missionTitle?: string | null;
  missionDescription?: string | null;
  visionBadge?: string | null;
  visionTitle?: string | null;
  visionDescription?: string | null;
  image?: MediaItem | string | null;
}

export interface ServiceCard {
  id?: string | number;
  icon?: IconName | null;
  title?: string | null;
  description?: string | null;
}

export interface ServicesSectionData {
  badge?: string | null;
  title?: string | null;
  description?: string | null;
  cards?: ServiceCard[];
  cta?: LinkItem | null;
}

export interface FeatureItem {
  id?: string | number;
  icon?: IconName | null;
  title?: string | null;
  description?: string | null;
}

export interface WhyChooseData {
  image?: MediaItem | string | null;
  title?: string | null;
  features?: FeatureItem[];
}

export interface ContactCard {
  id?: string | number;
  icon?: IconName | null;
  title?: string | null;
  lines?: TextLine[];
}

export interface ContactSectionData {
  title?: string | null;
  description?: string | null;
  cards?: ContactCard[];
  cta?: ActionItem | null;
}

export interface ClosingCtaData {
  title?: string | null;
  description?: string | null;
  buttonLabel?: string | null;
  buttonHref?: string | null;
  buttonIcon?: IconName | null;
}

export interface FooterData {
  logoText?: string | null;
  description?: string | null;
  quickLinks?: LinkItem[];
  contact?: {
    phone?: string | null;
    email?: string | null;
    website?: string | null;
  } | null;
}

export interface HomePageData {
  navigation?: NavigationData | null;
  hero?: HeroData | null;
  about?: AboutData | null;
  servicesSection?: ServicesSectionData | null;
  whyChoose?: WhyChooseData | null;
  contact?: ContactSectionData | null;
  closingCta?: ClosingCtaData | null;
  footer?: FooterData | null;
}
