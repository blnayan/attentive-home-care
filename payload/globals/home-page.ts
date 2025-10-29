import { revalidatePath } from "next/cache";
import type { GlobalConfig } from "payload";

const iconOptions = [
  { label: "Heart", value: "heart" },
  { label: "Home", value: "home" },
  { label: "Shield", value: "shield" },
  { label: "Clock", value: "clock" },
  { label: "Check", value: "check" },
  { label: "Phone", value: "phone" },
  { label: "Mail", value: "mail" },
];

const defaultNavigationLinks = () => [
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const defaultPrimaryCta = () => ({
  label: "Book a Time",
  href: "/book_appointment",
});

const defaultPhoneButton = () => ({
  label: "Call Us Today",
  href: "tel:5714496448",
});

const defaultHeroPrimary = () => ({
  label: "Our Services",
  href: "#services",
});

const defaultHeroSecondary = () => ({
  label: "571-449-6448",
  href: "tel:5714496448",
  icon: "phone" as const,
});

const defaultServicesCards = () => [
  {
    icon: "heart" as const,
    title: "Companionship",
    description:
      "Friendly conversation, emotional support, and social engagement for your loved ones.",
  },
  {
    icon: "home" as const,
    title: "Homemaking",
    description:
      "Light housekeeping, meal preparation, and other household tasks to maintain a comfortable living environment.",
  },
  {
    icon: "shield" as const,
    title: "Personal Care",
    description:
      "Assistance with activities of daily living such as bathing, dressing, and personal hygiene.",
  },
  {
    icon: "clock" as const,
    title: "Respite Care",
    description:
      "Temporary relief for family caregivers to rest and recharge while ensuring your loved one receives quality care.",
  },
];

const defaultServicesCta = () => ({
  label: "Learn More About Our Services",
  href: "/book_appointment",
});

const defaultWhyChooseFeatures = () => [
  {
    icon: "check" as const,
    title: "Personalized Care Plans",
    description:
      "Customized care plans tailored to your specific needs and preferences.",
  },
  {
    icon: "check" as const,
    title: "Experienced Caregivers",
    description:
      "Our caregivers are thoroughly screened, trained, and compassionate professionals.",
  },
  {
    icon: "check" as const,
    title: "Budget-Friendly Options",
    description:
      "Affordable care solutions without compromising on quality or service.",
  },
  {
    icon: "check" as const,
    title: "Available When You Need Us",
    description:
      "Flexible scheduling to accommodate your needs, including evenings and weekends.",
  },
];

const defaultContactCards = () => [
  {
    icon: "phone" as const,
    title: "Phone",
    lines: [
      { value: "571-449-6448", href: "tel:5714496448" },
      { value: "Fax: 571-449-3304", href: "tel:5714493304" },
    ],
  },
  {
    icon: "mail" as const,
    title: "Email",
    lines: [
      {
        value: "attentivehomecare55@gmail.com",
        href: "mailto:attentivehomecare55@gmail.com",
      },
    ],
  },
  {
    icon: "home" as const,
    title: "In Person",
    lines: [{ value: "Book an Appointment", href: "/book-appointment" }],
  },
];

const defaultContactCta = () => ({
  label: "Schedule a Consultation",
  href: "/book_appointment",
  icon: "phone" as const,
});

const defaultClosingButton = () => ({
  label: "Call 571-449-6448",
  href: "tel:5714496448",
  icon: "phone" as const,
});

const defaultFooterLinks = () => [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const homePageGlobal: GlobalConfig = {
  slug: "home-page",
  label: "Home Page",
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      (ctx) => {
        revalidatePath("/");
      },
    ],
  },
  fields: [
    {
      name: "navigation",
      label: "Navigation",
      type: "group",
      fields: [
        {
          name: "logoText",
          label: "Logo Text",
          type: "text",
          required: true,
          defaultValue: "Attentive Home Care, Inc.",
        },
        {
          name: "logoImage",
          label: "Logo Image",
          type: "relationship",
          relationTo: "media",
        },
        {
          name: "links",
          label: "Links",
          type: "array",
          minRows: 1,
          defaultValue: defaultNavigationLinks,
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
            },
            {
              name: "href",
              type: "text",
              required: true,
            },
          ],
        },
        {
          name: "cta",
          label: "Primary CTA",
          type: "group",
          defaultValue: defaultPrimaryCta,
          fields: [
            {
              name: "label",
              type: "text",
            },
            {
              name: "href",
              type: "text",
            },
          ],
        },
        {
          name: "phoneButton",
          label: "Phone Button",
          type: "group",
          defaultValue: defaultPhoneButton,
          fields: [
            {
              name: "label",
              type: "text",
            },
            {
              name: "href",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      name: "hero",
      label: "Hero",
      type: "group",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "text",
          required: true,
          defaultValue: "Compassionate Home Care for Your Loved Ones",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          required: true,
          defaultValue:
            "Providing high-quality non-medical home care services that improve the quality of life for every client.",
        },
        {
          name: "primaryAction",
          label: "Primary Action",
          type: "group",
          defaultValue: defaultHeroPrimary,
          fields: [
            {
              name: "label",
              type: "text",
            },
            {
              name: "href",
              type: "text",
            },
          ],
        },
        {
          name: "secondaryAction",
          label: "Secondary Action",
          type: "group",
          defaultValue: defaultHeroSecondary,
          fields: [
            {
              name: "label",
              type: "text",
            },
            {
              name: "href",
              type: "text",
            },
            {
              name: "icon",
              type: "select",
              options: iconOptions,
              defaultValue: "phone",
            },
          ],
        },
        {
          name: "image",
          label: "Hero Image",
          type: "relationship",
          relationTo: "media",
        },
      ],
    },
    {
      name: "about",
      label: "About Section",
      type: "group",
      fields: [
        {
          name: "missionBadge",
          label: "Mission Badge",
          type: "text",
          defaultValue: "Our Mission",
        },
        {
          name: "missionTitle",
          label: "Mission Title",
          type: "text",
          defaultValue: "Improving Quality of Life",
        },
        {
          name: "missionDescription",
          label: "Mission Description",
          type: "textarea",
          defaultValue:
            "It is our mission to deliver high standard, budget-friendly, and personalized non-medical homecare services that will improve the quality of life of every client that we encounter. We endeavor to help our clients live a healthier, safer, and more independent life at home.",
        },
        {
          name: "visionBadge",
          label: "Vision Badge",
          type: "text",
          defaultValue: "Our Vision",
        },
        {
          name: "visionTitle",
          label: "Vision Title",
          type: "text",
          defaultValue: "Exceeding Expectations",
        },
        {
          name: "visionDescription",
          label: "Vision Description",
          type: "textarea",
          defaultValue:
            "We endeavor to use the latest techniques and advances in non-medical home care so that we can exceed our client's expectations and become one of Virginia's top non-medical home care providers.",
        },
      ],
    },
    {
      name: "servicesSection",
      label: "Services Section",
      type: "group",
      fields: [
        {
          name: "badge",
          label: "Badge",
          type: "text",
          defaultValue: "Our Services",
        },
        {
          name: "title",
          label: "Title",
          type: "text",
          defaultValue: "Personalized Care Services",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          defaultValue:
            "If you are looking for high-quality non-medical home care services, you can rely on Attentive Home Care, Inc. to provide what you need. Our caregivers will thoroughly evaluate your situation, and attentively listen to your requests.",
        },
        {
          name: "cards",
          label: "Service Cards",
          type: "array",
          minRows: 1,
          defaultValue: defaultServicesCards,
          fields: [
            {
              name: "icon",
              type: "select",
              options: iconOptions,
              defaultValue: "heart",
            },
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "description",
              type: "textarea",
            },
          ],
        },
        {
          name: "cta",
          label: "Call To Action",
          type: "group",
          defaultValue: defaultServicesCta,
          fields: [
            {
              name: "label",
              type: "text",
            },
            {
              name: "href",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      name: "whyChoose",
      label: "Why Choose Section",
      type: "group",
      fields: [
        {
          name: "image",
          label: "Image",
          type: "relationship",
          relationTo: "media",
        },
        {
          name: "title",
          label: "Title",
          type: "text",
          defaultValue: "Why Choose Attentive Home Care?",
        },
        {
          name: "features",
          label: "Features",
          type: "array",
          minRows: 1,
          defaultValue: defaultWhyChooseFeatures,
          fields: [
            {
              name: "icon",
              type: "select",
              options: iconOptions,
              defaultValue: "check",
            },
            {
              name: "title",
              type: "text",
            },
            {
              name: "description",
              type: "textarea",
            },
          ],
        },
      ],
    },
    {
      name: "contact",
      label: "Contact Section",
      type: "group",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "text",
          defaultValue: "Get In Touch",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          defaultValue:
            "We encourage you to call us or set an appointment if you have further questions or need clarifications regarding our services at Attentive Home Care, Inc.",
        },
        {
          name: "cards",
          label: "Contact Cards",
          type: "array",
          minRows: 1,
          defaultValue: defaultContactCards,
          fields: [
            {
              name: "icon",
              type: "select",
              options: iconOptions,
              defaultValue: "phone",
            },
            {
              name: "title",
              type: "text",
            },
            {
              name: "lines",
              label: "Lines",
              type: "array",
              fields: [
                {
                  name: "value",
                  type: "text",
                  required: true,
                },
                {
                  name: "href",
                  label: "Link URL",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          name: "cta",
          label: "CTA Button",
          type: "group",
          defaultValue: defaultContactCta,
          fields: [
            {
              name: "label",
              type: "text",
            },
            {
              name: "href",
              type: "text",
            },
            {
              name: "icon",
              type: "select",
              options: iconOptions,
              defaultValue: "phone",
            },
          ],
        },
      ],
    },
    {
      name: "closingCta",
      label: "Closing CTA",
      type: "group",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "text",
          defaultValue: "Ready to Get Started?",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          defaultValue:
            "Contact us today to learn more about our services and how we can help improve the quality of life for you or your loved one.",
        },
        {
          name: "buttonLabel",
          label: "Button Label",
          type: "text",
          defaultValue: defaultClosingButton().label,
        },
        {
          name: "buttonHref",
          label: "Button Link",
          type: "text",
          defaultValue: defaultClosingButton().href,
        },
        {
          name: "buttonIcon",
          label: "Button Icon",
          type: "select",
          options: iconOptions,
          defaultValue: defaultClosingButton().icon,
        },
      ],
    },
    {
      name: "footer",
      label: "Footer",
      type: "group",
      fields: [
        {
          name: "logoText",
          label: "Logo Text",
          type: "text",
          defaultValue: "Attentive Home Care, Inc.",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          defaultValue:
            "Providing high-quality non-medical home care services to improve the quality of life for our clients.",
        },
        {
          name: "quickLinks",
          label: "Quick Links",
          type: "array",
          defaultValue: defaultFooterLinks,
          fields: [
            {
              name: "label",
              type: "text",
            },
            {
              name: "href",
              type: "text",
            },
          ],
        },
        {
          name: "contact",
          label: "Contact Details",
          type: "group",
          fields: [
            {
              name: "phone",
              label: "Phone",
              type: "text",
              defaultValue: "571-449-6448",
            },
            {
              name: "email",
              label: "Email",
              type: "text",
              defaultValue: "attentivehomecare55@gmail.com",
            },
            {
              name: "website",
              label: "Website",
              type: "text",
              defaultValue: "http://www.attentivehomecareva.com",
            },
          ],
        },
      ],
    },
  ],
};

export default homePageGlobal;
