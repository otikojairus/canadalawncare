import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/constants";
import { getAllDynamicPaths, pages } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/services", "/cities"];
  const dynamic = getAllDynamicPaths().map(({ slug }) => `/${slug.join("/")}`);
  const fromData = pages.map((p) => p.slug);
  const unique = Array.from(new Set([...staticPaths, ...dynamic, ...fromData]));

  const base = SITE_URL.replace(/\/$/, "");
  return unique.map((path) => ({
    url: path === "" ? `${base}/` : `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.split("/").length === 1 ? 0.8 : 0.6,
  }));
}
