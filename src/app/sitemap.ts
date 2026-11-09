import type { MetadataRoute } from "next";
import { jobs } from "@/lib/jobs";
import { site } from "@/lib/site";

// Update when page content changes meaningfully.
const LAST_UPDATED = "2026-11-09";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = (
    [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/careers`, changeFrequency: "daily", priority: 0.95 },
    { url: `${site.url}/products`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${site.url}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.5 },
    ] as const
  ).map((p) => ({ ...p, lastModified: LAST_UPDATED }));

  const jobPages: MetadataRoute.Sitemap = jobs.map((j) => ({
    url: `${site.url}/careers/${j.slug}`,
    lastModified: j.datePosted,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...pages, ...jobPages];
}
