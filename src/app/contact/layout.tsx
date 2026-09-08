import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";
import { generateBreadcrumbJsonLd } from "@/lib/jsonld";

const siteUrl = "https://p2pbroadband.in";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("en", "/contact");
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbJsonLd([
              { name: "Home", url: siteUrl },
              { name: "Contact P2P Broadband", url: `${siteUrl}/contact` },
            ])
          ),
        }}
      />
      {children}
    </>
  );
}