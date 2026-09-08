import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";
import { generateBreadcrumbJsonLd } from "@/lib/jsonld";

const siteUrl = "https://p2pbroadband.in";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("en", "/apply");
}

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbJsonLd([
              { name: "Home", url: siteUrl },
              { name: "Apply for P2P Broadband", url: `${siteUrl}/apply` },
            ])
          ),
        }}
      />
      {children}
    </>
  );
}