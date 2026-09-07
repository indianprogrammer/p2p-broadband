import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import type { Messages } from "@/lib/i18n/messages";
import { getPageMetadata } from "@/lib/seo";
import { localizedPath } from "@/lib/i18n/config";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tv, Monitor, Smartphone, Tablet, Check, Sparkles } from "lucide-react";

const ottApps = [
  { name: "Disney+ Hotstar", category: "Movies, Series, Sports", icon: "🎬" },
  { name: "SonyLIV", category: "TV Shows, Sports, Originals", icon: "📺" },
  { name: "ZEE5", category: "Movies, Series, Live TV", icon: "🎭" },
  { name: "JioCinema", category: "Movies, Sports, Originals", icon: "🎥" },
  { name: "Discovery+", category: "Documentary, Reality, Nature", icon: "🌍" },
  { name: "Sun NXT", category: "South Indian Movies, TV", icon: "☀️" },
  { name: "Eros Now", category: "Bollywood Movies, Music", icon: "🎵" },
  { name: "Hoichoi", category: "Bengali Movies, Series", icon: "🎪" },
];

const tvPacks = [
  {
    name: "Basic Pack",
    plan: "100 Mbps Plan",
    channels: "50+ SD Channels",
    categories: [
      "Hindi General Entertainment",
      "English Movies & Series",
      "Sports (Cricket Highlights)",
      "News (Hindi, English)",
      "Kids & Animation",
      "Music",
    ],
    included: true,
  },
  {
    name: "Full Pack",
    plan: "300 Mbps Plan",
    channels: "200+ SD/HD Channels",
    categories: [
      "All Basic Pack Channels",
      "Sports (Live Cricket, Football, Kabaddi)",
      "Premium Movie Channels",
      "News (Regional MP/CG)",
      "Kids & Animation (Extended)",
      "Music & Lifestyle",
      "Madhya Pradesh Regional",
      "Chhattisgarh Regional",
      "Devotional & Spiritual",
      "Documentary & Knowledge",
    ],
    included: true,
  },
];

const channelCategories = [
  "Hindi General Entertainment",
  "English Movies & Series",
  "Sports (Cricket, Football, Kabaddi)",
  "News (Hindi, English, Regional)",
  "Kids & Animation",
  "Music & Lifestyle",
  "Madhya Pradesh Regional",
  "Chhattisgarh Regional",
  "Devotional & Spiritual",
  "Documentary & Knowledge",
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "/tv-ott");
}

export default async function TvOttPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = (await getMessages()) as Messages;
  const { common, tvOtt } = messages;

  return (
    <div className="flex-1">
      {/* Page Header */}
      <section className="py-16 lg:py-24 bg-muted/30" aria-labelledby="tv-ott-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 id="tv-ott-heading" className="text-display text-foreground">
              {tvOtt.title}
            </h1>
            <p className="mt-4 text-body-lg text-muted-foreground">
              {tvOtt.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* OTT Apps Section */}
      <section className="py-16 lg:py-24" aria-labelledby="ott-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 id="ott-heading" className="text-h1 text-foreground">
              {tvOtt.ottSection.title}
            </h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              Available with 100 Mbps & 300 Mbps plans. Access on mobile, TV, tablet & laptop.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ottApps.map((app, index) => (
              <Card key={app.name} className="h-full animate-slide-up" style={{ animationDelay: `${index * 80}ms` }}>
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="text-5xl mb-4" aria-hidden="true">{app.icon}</div>
                  <h3 className="text-lg font-semibold mb-1">{app.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{app.category}</p>
                  <Badge variant="success" className="w-full">
                    {common.available}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-accent border border-border">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
              {common.available} on all your devices
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Tv className="h-4 w-4" aria-hidden="true" /> Smart TV</span>
              <span className="flex items-center gap-2"><Monitor className="h-4 w-4" aria-hidden="true" /> Laptop/PC</span>
              <span className="flex items-center gap-2"><Tablet className="h-4 w-4" aria-hidden="true" /> Tablet</span>
              <span className="flex items-center gap-2"><Smartphone className="h-4 w-4" aria-hidden="true" /> Mobile</span>
            </div>
          </div>
        </div>
      </section>

      {/* TV Channel Packs Section */}
      <section className="py-16 lg:py-24 bg-muted/30" aria-labelledby="tv-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 id="tv-heading" className="text-h1 text-foreground">
              {tvOtt.tvSection.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {tvPacks.map((pack, index) => (
              <Card key={pack.name} className="h-full animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Badge variant="outline" className="mb-2">
                      {pack.plan}
                    </Badge>
                    <h3 className="text-xl font-semibold">{pack.name}</h3>
                    <p className="text-muted-foreground mt-1">{pack.channels}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium mb-3">{tvOtt.tvSection.basicPack.description}</h4>
                    <ul className="space-y-2">
                      {pack.categories.map((cat, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-body">
                          <Check className="h-4 w-4 text-success" aria-hidden="true" />
                          {cat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Badge variant={pack.included ? "success" : "outline"} className="w-full">
                      {pack.included ? common.available : common.notAvailable}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Channel Categories */}
      <section className="py-16 lg:py-24" aria-labelledby="categories-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 id="categories-heading" className="text-h2 text-foreground">
              Channel Categories Available
            </h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              Full Pack includes all categories. Basic Pack includes selected categories.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {channelCategories.map((category, index) => (
              <div
                key={category}
                className="p-4 rounded-xl bg-muted/50 border border-border/50 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
                    <Tv className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <span className="text-body font-medium">{category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 text-center" aria-labelledby="tv-cta-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="tv-cta-heading" className="text-h2 text-foreground">
            Ready for Unlimited Entertainment?
          </h2>
          <p className="mt-4 text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a 100 Mbps or 300 Mbps plan and get premium OTT apps + TV channels included.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={localizedPath("en", "/plans")}>
              <Button size="lg" variant="apple" className="gap-2 w-full sm:w-auto">
                {common.viewPlans}
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </Link>
            <Link href={localizedPath("en", "/apply")}>
              <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                {common.applyNow}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}