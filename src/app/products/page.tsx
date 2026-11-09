import type { Metadata } from "next";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ProductCard } from "@/components/product-card";
import { ButtonLink, Container, JsonLd, PageHero } from "@/components/ui";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products — AI-Powered Online Services",
  description:
    "Explore PeachTech's portfolio of AI-powered online services: assistants, analytics, document automation and developer tools. Visit each product's website directly.",
  alternates: { canonical: "/products" },
  openGraph: { url: "/products" },
};

export default function ProductsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.legalName} products`,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: p.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: p.summary,
        url: p.url,
        image: `${site.url}${p.image}`,
        publisher: { "@id": `${site.url}/#organization` },
      },
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        eyebrow="Products"
        title={
          <>
            Online services, <span className="text-gradient italic">powered by AI.</span>
          </>
        }
        intro="PeachTech builds and operates its own portfolio of web products. Choose a product below to visit its website."
      />
      <section className="pb-12">
        <Container>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <StaggerItem key={p.slug} className="h-full">
                <ProductCard product={p} priority={i < 3} />
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-16 flex flex-col items-start justify-between gap-6 rounded-[32px] border border-peach-200 bg-cream-50/70 p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <h2 className="font-display text-3xl font-medium text-ink">Need something custom?</h2>
              <p className="mt-2 text-ink-muted">We build AI products for clients too, using the same team and tooling.</p>
            </div>
            <ButtonLink href="/contact">Talk to us</ButtonLink>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
