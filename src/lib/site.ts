/**
 * Central site configuration.
 *
 * Contact details are read from environment variables (see `.env.example`),
 * so they can be changed without touching code. Pages are prerendered, so
 * after editing `.env` / `.env.local`, rebuild (`npm run build`) or restart
 * `npm run dev` for the change to show up.
 */

const env = (key: string, fallback: string) => {
  const value = process.env[key];
  return value && value.trim() !== "" ? value.trim() : fallback;
};

export const site = {
  name: "PeachTech",
  legalName: "PeachTech LLC",
  url: env("SITE_URL", "https://peachtech.dev").replace(/\/$/, ""),
  tagline: "AI-first software development agency",
  description:
    "PeachTech LLC is an AI-focused software development agency that builds intelligent web services and online products, and recruits talented software engineers for its partner technology companies. Remote-friendly roles for full-stack, AI/ML, frontend, backend and cloud engineers.",
  foundingYear: env("COMPANY_FOUNDING_YEAR", "2024"),

  contact: {
    email: env("CONTACT_EMAIL", "hello@peachtech.dev"),
    careersEmail: env("CAREERS_EMAIL", "careers@peachtech.dev"),
    phone: env("CONTACT_PHONE", "+1 (555) 010-2024"),
    address: {
      street: env("COMPANY_STREET", ""),
      city: env("COMPANY_CITY", ""),
      region: env("COMPANY_REGION", ""),
      postalCode: env("COMPANY_POSTAL_CODE", ""),
      country: env("COMPANY_COUNTRY", "US"),
    },
    hours: env("CONTACT_HOURS", "Mon – Fri, 9:00 – 18:00"),
  },

  social: {
    linkedin: env("SOCIAL_LINKEDIN", ""),
    github: env("SOCIAL_GITHUB", ""),
    x: env("SOCIAL_X", ""),
  },
} as const;

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export const formattedAddress = () => {
  const a = site.contact.address;
  if (!a.street && !a.city) return "";
  return [a.street, a.city, [a.region, a.postalCode].filter(Boolean).join(" "), a.country]
    .filter(Boolean)
    .join(", ");
};

export const socialLinks = () =>
  Object.values(site.social).filter((v): v is string => Boolean(v));

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/careers", label: "Careers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
