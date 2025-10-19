import Link from "next/link";
import { Heart, Mail, Phone } from "lucide-react";

type FooterQuickLink = {
  label: string;
  href: string;
};

type FooterContactInfo = {
  phone: string;
  email: string;
  website: string;
  displayWebsite: string;
};

interface HomePageFooterProps {
  logoText: string;
  description: string;
  quickLinks: FooterQuickLink[];
  contact: FooterContactInfo;
}

export function HomePageFooter({
  logoText,
  description,
  quickLinks,
  contact,
}: HomePageFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Heart className="h-6 w-6 text-rose-500" />
              <span className="text-xl font-bold">{logoText}</span>
            </div>
            <p className="text-gray-400">{description}</p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <Link
                    href={link.href}
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Contact Information</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-rose-500" />
                <Link href={`tel:${contact.phone}`} className="transition-colors hover:text-white">
                  {contact.phone}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-rose-500" />
                <Link
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-white"
                >
                  {contact.email}
                </Link>
              </li>
              <li>
                <Link
                  href={contact.website}
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  {contact.displayWebsite}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} {logoText}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export type { FooterQuickLink, FooterContactInfo };
