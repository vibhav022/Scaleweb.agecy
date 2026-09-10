import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!siteUrl) return [];
  return [
    "",
    "/portfolio",
    "/work/civic-pulse-ai",
    "/work/hydraa-drop",
    "/work/vcap-physiotherapy",
    "/work/afterhours-party",
    "/privacy",
    "/terms",
  ].map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date(), changeFrequency: path ? "monthly" : "weekly", priority: path ? 0.8 : 1 }));
}
