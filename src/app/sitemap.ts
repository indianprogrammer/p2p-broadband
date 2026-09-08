import { MetadataRoute } from "next";
import { localizedPath } from "@/lib/i18n/config";
import { getPostSlugs } from "@/lib/blog";

const baseUrl = "https://p2pbroadband.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/plans",
    "/tv-ott",
    "/coverage",
    "/about",
    "/contact",
    "/faq",
    "/blog",
    "/apply",
  ];

  const staticEntries = routes.map((route) => ({
    url: `${baseUrl}${localizedPath("en", route)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
    alternates: {
      languages: { en: `${baseUrl}${localizedPath("en", route)}`, "x-default": `${baseUrl}${localizedPath("en", route)}` },
    },
  }));

  const blogEntries = getPostSlugs().map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}