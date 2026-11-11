import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Crawlers may fetch every page. Demo screens stay out of search by their own
// `noindex` tag (app/demo/layout.tsx): a crawler blocked here would never see it.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: new URL("/sitemap.xml", siteUrl()).href };
}
