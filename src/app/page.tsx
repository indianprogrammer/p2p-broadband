import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import type { Messages } from "@/lib/i18n/messages";
import { getPageMetadata } from "@/lib/seo";
import { generateWebSiteJsonLd } from "@/lib/jsonld";
import { HomeContent } from "@/components/sections/HomeContent";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("en", "/");
}

export default async function HomePage() {
  const messages = (await getMessages()) as Messages;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebSiteJsonLd()) }}
      />
      <HomeContent messages={messages} />
    </>
  );
}
