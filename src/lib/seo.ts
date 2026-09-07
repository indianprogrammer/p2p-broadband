import type { Metadata } from "next";
import { localizedPath } from "@/lib/i18n/config";

const siteUrl = "https://p2pbroadband.in";

const pageCopy = {
  "/": {
    en: { title: "High-Speed Fiber Internet in Madhya Pradesh & Chhattisgarh", description: "Get reliable 10-300 Mbps fiber broadband with TV channels and OTT apps across Madhya Pradesh and Chhattisgarh. Plans start at ₹333/month." },
  },
  "/plans": {
    en: { title: "Fiber Internet Plans & Pricing", description: "Compare P2P Broadband 10 Mbps, 50 Mbps, 100 Mbps and 300 Mbps fiber internet plans with TV, OTT and router benefits." },
  },
  "/tv-ott": {
    en: { title: "TV Channels & OTT Bundles", description: "Stream premium OTT apps and 50+ or 200+ TV channels with P2P Broadband internet plans in MP and Chhattisgarh." },
  },
  "/coverage": {
    en: { title: "Broadband Coverage in MP & Chhattisgarh", description: "Check P2P Broadband fiber internet availability by pincode across Madhya Pradesh and Chhattisgarh." },
  },
  "/about": {
    en: { title: "About P2P Broadband", description: "Learn about P2P Broadband, a local fiber internet provider serving homes and businesses across MP and Chhattisgarh." },
  },
  "/contact": {
    en: { title: "Contact P2P Broadband", description: "Contact P2P Broadband for fiber internet availability, plans, installation and customer support in MP and Chhattisgarh." },
  },
  "/faq": {
    en: { title: "Broadband FAQs", description: "Find answers about P2P Broadband plans, installation, speeds, coverage, OTT benefits and technical support." },
  },
  "/blog": {
    en: { title: "P2P Broadband Blog", description: "Read P2P Broadband news, fiber internet guides, network updates, offers and Wi-Fi tips for Central India." },
  },
  "/apply": {
    en: { title: "Apply for P2P Broadband", description: "Apply online for a P2P Broadband fiber internet connection and choose the right plan for your home or business." },
  },
  "/terms": {
    en: { title: "Terms & Conditions | P2P Broadband", description: "Read the terms and conditions for using P2P Broadband fiber internet services across Madhya Pradesh and Chhattisgarh." },
  },
  "/privacy": {
    en: { title: "Privacy Policy | P2P Broadband", description: "Learn how P2P Broadband collects, uses, and protects your personal information." },
  },
  "/fup": {
    en: { title: "Fair Usage Policy | P2P Broadband", description: "Understand the Fair Usage Policy for P2P Broadband unlimited fiber internet plans." },
  },
} as const;

export function getPageMetadata(locale: string, route: keyof typeof pageCopy): Metadata {
  const copy = pageCopy[route].en;
  const currentUrl = `${siteUrl}${localizedPath(locale === "hi" ? "hi" : "en", route)}`;

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: currentUrl,
      languages: { en: currentUrl, "x-default": currentUrl },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: currentUrl,
      locale: "en_IN",
    },
  };
}