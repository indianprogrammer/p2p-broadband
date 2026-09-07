import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import type { Messages } from "@/lib/i18n/messages";
import { getPageMetadata } from "@/lib/seo";
import { localizedPath } from "@/lib/i18n/config";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Tv, Shield, Headphones, IndianRupee, Wifi, Check } from "lucide-react";

const iconMap = { Zap, Tv, Shield, Headphones, Rupee: IndianRupee, Wifi };

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("en", "/");
}

export default async function HomePage() {
  const messages = (await getMessages()) as Messages;
  const { common, hero, valueProps, plans } = messages;

  // Featured plans data
  const featuredPlans = [
    {
      id: "basic-50mbps",
      name: "Basic 50 Mbps",
      speed: "50 Mbps",
      price: 499,
      cycle: "monthly",
      features: ["Unlimited Data", "Free Installation (Annual)", "Wi-Fi 6 Router (Annual)", "Email Support"],
      popular: false,
    },
    {
      id: "standard-100mbps",
      name: "Standard 100 Mbps",
      speed: "100 Mbps",
      price: 699,
      cycle: "monthly",
      features: ["Unlimited Data", "8 OTT Apps", "50+ TV Channels", "Free Installation", "Free Wi-Fi 6 Router", "Priority Support"],
      popular: true,
    },
    {
      id: "premium-300mbps",
      name: "Premium 300 Mbps",
      speed: "300 Mbps",
      price: 1499,
      cycle: "monthly",
      features: ["Unlimited Data", "8 OTT Apps", "200+ TV Channels", "Free Installation", "Free Wi-Fi 6 Router", "Priority Support", "Static IP Option"],
      popular: false,
    },
  ];

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32" aria-labelledby="hero-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <Badge variant="success" className="mb-6 animate-fade-in">
                {hero.stats.customers} Customers • {hero.stats.districts} • {hero.stats.uptime}
              </Badge>
              <h1 id="hero-heading" className="text-display text-foreground animate-slide-up">
                {hero.headline}
              </h1>
              <p className="mt-6 text-body-lg text-muted-foreground max-w-xl animate-slide-up" style={{ animationDelay: "100ms" }}>
                {hero.subheadline}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 lg:justify-start animate-slide-up" style={{ animationDelay: "200ms" }}>
                <Link href={localizedPath("en", "/coverage")}>
                  <Button size="xl" variant="apple" className="w-full sm:w-auto gap-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {common.checkAvailability}
                  </Button>
                </Link>
                <Link href={localizedPath("en", "/plans")}>
                  <Button size="xl" variant="outline" className="w-full sm:w-auto gap-2">
                    {common.viewPlans}
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Button>
                </Link>
              </div>
              <p className="mt-8 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "300ms" }}>
                {hero.trustedBy}
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:max-w-none animate-slide-up" style={{ animationDelay: "300ms" }}>
              <div className="relative overflow-hidden rounded-[32px] border border-border/80 bg-[radial-gradient(circle_at_top_left,_rgba(76,141,255,0.18),_transparent_42%),linear-gradient(180deg,#f7fbff_0%,#edf5ff_100%)] p-4 shadow-[0_30px_80px_rgba(38,85,165,0.14)]">
                <Image
                  src="/hero-broadband.svg"
                  alt="Broadband connectivity and Wi-Fi illustration"
                  width={1200}
                  height={900}
                  priority
                  className="h-auto w-full rounded-[24px]"
                />
              </div>

              <div className="absolute -left-2 bottom-8 rounded-2xl border border-border bg-background/90 px-4 py-3 shadow-lg backdrop-blur-sm sm:-left-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Wifi className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Peak Speed</div>
                    <div className="text-lg font-semibold text-foreground">Up to 300 Mbps</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-up" style={{ animationDelay: "400ms" }}>
            {[
              { value: hero.stats.customers, label: "Happy Customers" },
              { value: hero.stats.districts, label: "Districts Covered" },
              { value: hero.stats.uptime, label: "Network Uptime" },
              { value: hero.stats.support, label: "Local Support" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/50 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Value Props Section */}
      <section className="py-20 lg:py-28 bg-muted/30" aria-labelledby="value-props-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 id="value-props-heading" className="text-h1 text-foreground">
              {valueProps.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valueProps.items.map((item, index) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] || Zap;
              return (
                <Card key={item.title} className="h-full animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary mb-4">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-body">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Plans Section */}
      <section className="py-20 lg:py-28" aria-labelledby="featured-plans-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 id="featured-plans-heading" className="text-h1 text-foreground">
              {plans.title}
            </h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              {plans.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredPlans.map((plan, index) => (
              <Card key={plan.id} className="relative flex flex-col h-full animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <Badge variant="success" className="px-3 py-1">
                      {plans.mostPopular}
                    </Badge>
                  </div>
                )}
                <CardContent className="flex-1 flex flex-col p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm">{plan.speed} • {plans.perMonth}</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">
                      ₹{plan.price}
                    </span>
                    <span className="text-muted-foreground ml-1">{plans.perMonth}</span>
                    <Badge variant="outline" className="ml-2 mt-2 inline-block">
                      {plans.gstBadge}
                    </Badge>
                  </div>
                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <Check className="h-5 w-5 text-success shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-body">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={localizedPath("en", `/apply?plan=${plan.id}`)}>
                    <Button className="w-full" variant={plan.popular ? "apple" : "outline"} size="lg">
                      {plans.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href={localizedPath("en", "/plans")}>
              <Button variant="ghost" size="lg" className="gap-2">
                {common.viewPlans}
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-heading" className="text-h1">
            Ready for Better Internet?
          </h2>
          <p className="mt-4 text-body-lg opacity-90 max-w-2xl mx-auto">
            Check availability in your area and get connected within 48 hours. Our local team handles everything.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={localizedPath("en", "/coverage")}>
              <Button size="xl" variant="secondary" className="w-full sm:w-auto gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {common.checkAvailability}
              </Button>
            </Link>
            <Link href={localizedPath("en", "/apply")}>
              <Button size="xl" variant="outline" className="w-full sm:w-auto border-primary-foreground/30 hover:bg-primary-foreground/10 gap-2">
                {common.applyNow}
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}