import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.legalName,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FCE8D4",
    theme_color: "#FCE8D4",
    icons: [{ src: "/brand/logo.png", sizes: "452x452", type: "image/png" }],
  };
}
