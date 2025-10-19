import type { HomePage as PayloadHomePage, Media } from "@/payload-types";

type ArrayElement<T> = T extends (infer U)[] ? U : never;
type NullableArrayElement<T> = T extends (infer U)[] | null | undefined ? U : never;

export type IconName = NonNullable<
  NullableArrayElement<
    NonNullable<NonNullable<PayloadHomePage["contact"]>["cards"]>
  >["icon"]
>;

export type MediaItem = Media;

export type LinkItem = ArrayElement<NonNullable<PayloadHomePage["navigation"]["links"]>>;

export type ActionItem = {
  label?: string | null;
  href?: string | null;
  icon?: IconName | null;
};

export type TextLine = NullableArrayElement<
  NonNullable<
    NullableArrayElement<NonNullable<NonNullable<PayloadHomePage["contact"]>["cards"]>>["lines"]
  >
>;

export type NavigationData = PayloadHomePage["navigation"];
export type HeroData = PayloadHomePage["hero"];
export type AboutData = PayloadHomePage["about"];
export type ServiceCard = NullableArrayElement<
  NonNullable<NonNullable<PayloadHomePage["servicesSection"]>["cards"]>
>;
export type ServicesSectionData = PayloadHomePage["servicesSection"];
export type FeatureItem = NullableArrayElement<
  NonNullable<NonNullable<PayloadHomePage["whyChoose"]>["features"]>
>;
export type WhyChooseData = PayloadHomePage["whyChoose"];
export type ContactCard = NullableArrayElement<
  NonNullable<NonNullable<PayloadHomePage["contact"]>["cards"]>
>;
export type ContactSectionData = PayloadHomePage["contact"];
export type ClosingCtaData = PayloadHomePage["closingCta"];
export type FooterData = PayloadHomePage["footer"];
export type HomePageData = PayloadHomePage;
