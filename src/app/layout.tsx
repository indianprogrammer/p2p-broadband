import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { generateLocalBusinessJsonLd } from "@/lib/jsonld";
import ClientLayout from "./client-layout";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "P2P Broadband | High-Speed Internet for Madhya Pradesh & Chhattisgarh",
    template: "%s | P2P Broadband",
  },
  description: "Lightning-fast fiber internet (10-300 Mbps) with TV channels & OTT apps across 88 districts in MP & CG. Starting at ₹333/month. Free router on annual plans.",
  keywords: ["broadband", "internet", "fiber", "MP", "Chhattisgarh", "ISP", "OTT", "TV channels", "Bhilai"],
  authors: [{ name: "P2P Broadband" }],
  creator: "P2P Broadband",
  publisher: "P2P Broadband",
  formatDetection: {
    telephone: true,
  },
  metadataBase: new URL("https://p2pbroadband.in"),
  alternates: {
    languages: { en: "/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://p2pbroadband.in",
    siteName: "P2P Broadband",
    title: "P2P Broadband | High-Speed Internet for Madhya Pradesh & Chhattisgarh",
    description: "Lightning-fast fiber internet (10-300 Mbps) with TV channels & OTT apps across 88 districts in MP & CG. Starting at ₹333/month.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "P2P Broadband - High-Speed Internet for MP & CG",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "P2P Broadband | High-Speed Internet for MP & CG",
    description: "Lightning-fast fiber internet (10-300 Mbps) with TV channels & OTT apps across 88 districts. Starting at ₹333/month.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateLocalBusinessJsonLd("en")) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
