import type { Metadata, Viewport } from "next";
import { Fraunces, Public_Sans } from "next/font/google";
import { siteDescription, siteName, siteTagline, siteUrl } from "@/lib/site";
import Script from "next/script";
import "./globals.css";

// Fonts and colors follow DESIGN.md.
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const publicSans = Public_Sans({ subsets: ["latin"], variable: "--font-public-sans" });

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

export const viewport: Viewport = { themeColor: "#2f3f8f" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${publicSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}<Script src="https://www.googletagmanager.com/gtag/js?id=G-NH1HKS344J" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-NH1HKS344J');`}
        </Script>
      </body>
    </html>
  );
}
