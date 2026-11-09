/**
 * PeachTech products. Each card on /products links out to the product's own site.
 *
 * PLACEHOLDERS: replace names, descriptions and URLs with your real products.
 * `url` is where the "Visit" button redirects; it opens in a new tab.
 */
export type Product = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  features: string[];
  url: string;
  image: string;
  status: "Live" | "Beta" | "Coming soon";
};

export const products: Product[] = [
  {
    slug: "peach-assist",
    name: "Peach Assist",
    category: "AI assistant",
    summary:
      "A conversational AI assistant that answers customer questions, books appointments and hands off to humans when it matters.",
    features: ["Knowledge-base grounded answers", "Multi-channel chat widget", "Human hand-off"],
    url: "https://assist.example.com",
    image: "/images/ai-blocks.webp",
    status: "Live",
  },
  {
    slug: "peach-insights",
    name: "Peach Insights",
    category: "Analytics",
    summary:
      "Plain-language analytics for small teams: connect your data and ask questions instead of building dashboards.",
    features: ["Natural-language queries", "Automatic weekly reports", "Spreadsheet & SQL connectors"],
    url: "https://insights.example.com",
    image: "/images/analytics.webp",
    status: "Live",
  },
  {
    slug: "peach-docs",
    name: "Peach Docs AI",
    category: "Document automation",
    summary:
      "Extract, summarize and route information from contracts, invoices and forms with human-in-the-loop review.",
    features: ["OCR + LLM extraction", "Review queue", "API & webhooks"],
    url: "https://docs.example.com",
    image: "/images/neural-connections.webp",
    status: "Beta",
  },
  {
    slug: "peach-cloud",
    name: "Peach Cloud Console",
    category: "Developer platform",
    summary:
      "Deploy, monitor and scale AI-powered web services with sensible defaults and transparent pricing.",
    features: ["One-click deploys", "Model usage monitoring", "Cost alerts"],
    url: "https://cloud.example.com",
    image: "/images/cloud-engineer.webp",
    status: "Coming soon",
  },
];
