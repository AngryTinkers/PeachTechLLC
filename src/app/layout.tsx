import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MotionProvider, ScrollProgress } from "@/components/motion";
import { JsonLd } from "@/components/ui";
import { formattedAddress, site, socialLinks } from "@/lib/site";

const display = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
});

const sans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#FCE8D4",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.legalName} | AI Software Development Agency & Engineering Jobs`,
    template: `%s | ${site.legalName}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "PeachTech",
    "PeachTech LLC",
    "AI software development agency",
    "AI development company",
    "LLM application development",
    "web services",
    "software engineer jobs",
    "remote software engineer jobs",
    "AI engineer jobs",
    "machine learning engineer jobs",
    "full-stack developer jobs",
    "Next.js developer jobs",
    "tech recruiting",
  ],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.legalName,
    locale: "en_US",
    url: "/",
    title: `${site.legalName} — AI software development agency`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.legalName} — AI software development agency`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "technology",
};

function organizationJsonLd() {
  const a = site.contact.address;
  const sameAs = socialLinks();
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.legalName,
      alternateName: site.name,
      url: site.url,
      logo: `${site.url}/brand/logo.png`,
      description: site.description,
      foundingDate: site.foundingYear,
      email: site.contact.email,
      telephone: site.contact.phone,
      ...(formattedAddress() && {
        address: {
          "@type": "PostalAddress",
          streetAddress: a.street || undefined,
          addressLocality: a.city || undefined,
          addressRegion: a.region || undefined,
          postalCode: a.postalCode || undefined,
          addressCountry: a.country,
        },
      }),
      contactPoint: [
        { "@type": "ContactPoint", contactType: "customer support", email: site.contact.email, telephone: site.contact.phone },
        { "@type": "ContactPoint", contactType: "recruiting", email: site.contact.careersEmail },
      ],
      knowsAbout: [
        "Artificial intelligence",
        "Large language models",
        "Software development",
        "Web services",
        "Cloud computing",
        "Technical recruiting",
      ],
      ...(sameAs.length && { sameAs }),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.legalName,
      publisher: { "@id": `${site.url}/#organization` },
      inLanguage: "en-US",
    },
  ];
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} antialiased`}>
      <body className="grain flex min-h-screen flex-col bg-cream">
        <JsonLd data={organizationJsonLd()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-cream-50"
        >
          Skip to content
        </a>
        <MotionProvider>
          <ScrollProgress />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
