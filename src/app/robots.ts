import { MetadataRoute } from "next";

const baseUrl = "https://p2pbroadband.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/apply/thanks", "/_next/", "/static/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}