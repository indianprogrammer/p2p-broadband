import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";
import { generateBreadcrumbJsonLd } from "@/lib/jsonld";

const siteUrl = "https://p2pbroadband.in";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("en", "/coverage");
}

export default function CoverageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbJsonLd([
              { name: "Home", url: siteUrl },
              { name: "Broadband Coverage in MP & Chhattisgarh", url: `${siteUrl}/coverage` },
            ])
          ),
        }}
      />
      {children}
    </>
  );
}