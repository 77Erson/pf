import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://diwash-ghimire.com.np/sitemap.xml",
    host: "https://diwash-ghimire.com.np",
  };
}
