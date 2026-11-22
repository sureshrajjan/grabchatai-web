import type { MetadataRoute } from "next";
import { docs } from "@/content/docs";
import { platforms, site } from "@/lib/site";
import { tools } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/pricing",
    "/faq",
    "/docs",
    "/tools",
    "/about",
    "/contact",
    "/terms",
    "/privacy",
    "/privacy/extension",
    "/refund-policy",
    ...docs.map((d) => `/docs/${d.slug}`),
    ...platforms.map((p) => `/features/${p.slug}`),
    ...tools.map((t) => `/tools/${t.slug}`),
  ];
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "" || path === "/pricing" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.6,
  }));
}
