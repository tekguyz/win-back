import type { Metadata, Viewport } from "next";
import { Work_Sans, Zilla_Slab } from "next/font/google";
import { siteDescription, siteName, siteTagline, siteUrl } from "@/lib/site";
import "./globals.css";

// Fonts and colors follow DESIGN.md.
const zilla = Zilla_Slab({ subsets: ["latin"], weight: "700", variable: "--font-zilla" });
const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans" });

// The link preview: title, description and app/opengraph-image.tsx.
export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: { default: `${siteName} · ${siteTagline}`, template: `%s · ${siteName}` },
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName,
    title: `${siteName} · ${siteTagline}`,
    description: siteDescription,
    url: "/",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: `${siteName} · ${siteTagline}`, description: siteDescription },
};

export const viewport: Viewport = { themeColor: "#f2c230" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${zilla.variable} ${workSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
