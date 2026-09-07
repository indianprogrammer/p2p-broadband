import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import type { Messages } from "@/lib/i18n/messages";
import { getPageMetadata } from "@/lib/seo";
import { localizedPath } from "@/lib/i18n/config";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wifi, Tv, Monitor, Smartphone, Headphones, Shield, Zap } from "lucide-react";

const allPlans = [
  {
    id: "starter-10mbps",
    name: "Starter",
    speed: "10 Mbps",
    pricing: {
      monthly: null,
      quarterly: 999,
      annual: null,
    },
    features: {
      data: "Unlimited (FUP 3.3 TB)",
      ott: "Not included",
      tvChannels: "Not included",
      router: "₹199/mo rent or ₹1,500 buy",
      installation: "₹500 (refundable)",
      support: "Standard",
      staticIp: "Not available",
    },
    recommendedFor: "Light browsing, emails, social media",
  },
  {
    id: "basic-50mbps",
    name: "Basic",
    speed: "50 Mbps",
    pricing: {
      monthly: 499,
      quarterly: null,
      annual: 5389,
    },
    features: {
      data: "Unlimited (FUP 3.3 TB)",
      ott: "Not included",
      tvChannels: "Not included",
      router: "Free on annual",
      installation: "Free on annual",
      support: "Standard",
      staticIp: "Not available",
    },
    recommendedFor: "HD streaming, video calls, work from home",
  },
  {
    id: "standard-100mbps",
    name: "Standard",
    speed: "100 Mbps",
    pricing: {
      monthly: 699,
      quarterly: null,
      annual: 7549,
    },
    features: {
      data: "Unlimited (FUP 3.3 TB)",
      ott: "8 Premium Apps",
      tvChannels: "50+ SD Channels",
      router: "Free Wi-Fi 6 Router",
      installation: "Free",
      support: "Priority",
      staticIp: "Available (₹199/mo)",
    },
    recommendedFor: "4K streaming, gaming, multiple devices, family",
    popular: true,
  },
  {
    id: "premium-300mbps",
    name: "Premium",
    speed: "300 Mbps",
    pricing: {
      monthly: 1499,
      quarterly: null,
      annual: 16189,
    },
    features: {
      data: "Unlimited (FUP 3.3 TB)",
      ott: "8 Premium Apps",
      tvChannels: "200+ SD/HD Channels",
      router: "Free Wi-Fi 6 Router",
      installation: "Free",
      support: "Priority + Dedicated",
      staticIp: "Included",
    },
    recommendedFor: "Power users, small office, heavy 4K/8K streaming",
  },
];

const cycleKeys = ["monthly", "quarterly", "annual"] as const;

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("en", "/plans");
}

export default async function PlansPage() {
  const messages = (await getMessages()) as Messages;
  const { common, plans } = messages;

  return (
    <div className="flex-1">
      {/* Page Header */}
      <section className="py-16 lg:py-24 bg-muted/30" aria-labelledby="plans-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 id="plans-heading" className="text-display text-foreground">
              {plans.title}
            </h1>
            <p className="mt-4 text-body-lg text-muted-foreground">
              {plans.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Billing Cycle Toggle */}
      <section className="py-8 lg:py-12" aria-labelledby="billing-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4">
            <h2 id="billing-heading" className="text-lg font-medium text-foreground">
              {plans.billingCycle.monthly} / {plans.billingCycle.quarterly} / {plans.billingCycle.annual}
            </h2>
            <Tabs defaultValue="monthly" className="w-full max-w-md">
              <TabsList aria-label="Billing cycle">
                {cycleKeys.map((cycle) => (
                  <TabsTrigger key={cycle} value={cycle}>
                    {plans.billingCycle[cycle]}
                    {cycle === "annual" && (
                      <span className="ml-2 text-xs text-success font-semibold">
                        {plans.billingCycle.save.replace("{percent}", "20")}
                      </span>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Plans Comparison Table */}
      <section className="py-8 lg:py-16" aria-labelledby="comparison-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" role="table">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium text-muted-foreground sticky left-0 bg-background z-10">
                    {plans.features.speed}
                  </th>
                  {allPlans.map((plan) => (
                    <th key={plan.id} className="text-center p-4 font-medium text-foreground sticky top-0 bg-background z-10">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-lg font-semibold">{plan.speed}</span>
                        <span className="text-xs text-muted-foreground">{plan.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="p-4 font-medium text-foreground sticky left-0 bg-background z-10">
                    {plans.features.data}
                  </td>
                  {allPlans.map((plan) => (
                    <td key={`${plan.id}-data`} className="text-center p-4 text-muted-foreground">
                      {plan.features.data}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4 font-medium text-foreground sticky left-0 bg-background z-10">
                    {plans.features.ott}
                  </td>
                  {allPlans.map((plan) => (
                    <td key={`${plan.id}-ott`} className="text-center p-4">
                      {plan.features.ott === "Not included" ? (
                        <span className="text-muted-foreground">{plan.features.ott}</span>
                      ) : (
                        <Badge variant="success" className="mx-auto max-w-xs">
                          {plan.features.ott}
                        </Badge>
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4 font-medium text-foreground sticky left-0 bg-background z-10">
                    {plans.features.tvChannels}
                  </td>
                  {allPlans.map((plan) => (
                    <td key={`${plan.id}-tv`} className="text-center p-4 text-muted-foreground">
                      {plan.features.tvChannels}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4 font-medium text-foreground sticky left-0 bg-background z-10">
                    {plans.features.router}
                  </td>
                  {allPlans.map((plan) => (
                    <td key={`${plan.id}-router`} className="text-center p-4 text-muted-foreground">
                      {plan.features.router}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4 font-medium text-foreground sticky left-0 bg-background z-10">
                    {plans.features.installation}
                  </td>
                  {allPlans.map((plan) => (
                    <td key={`${plan.id}-install`} className="text-center p-4">
                      {plan.features.installation.includes("Free") ? (
                        <Badge variant="success" className="mx-auto max-w-xs">
                          {plan.features.installation}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">{plan.features.installation}</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-4 font-medium text-foreground sticky left-0 bg-background z-10">
                    {plans.features.support}
                  </td>
                  {allPlans.map((plan) => (
                    <td key={`${plan.id}-support`} className="text-center p-4 text-muted-foreground">
                      {plan.features.support}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-medium text-foreground sticky left-0 bg-background z-10">
                    {plans.features.staticIp}
                  </td>
                  {allPlans.map((plan) => (
                    <td key={`${plan.id}-ip`} className="text-center p-4 text-muted-foreground">
                      {plan.features.staticIp}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Detailed Plan Cards */}
      <section className="py-16 lg:py-24" aria-labelledby="details-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="details-heading" className="sr-only">
            Plan Details
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allPlans.map((plan, index) => (
              <Card key={plan.id} className="relative flex flex-col h-full animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <Badge variant="success">{plans.mostPopular}</Badge>
                  </div>
                )}

                <CardContent className="flex-1 flex flex-col p-6">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold">{plan.name}</h3>
                    </div>
                    <p className="text-muted-foreground">{plan.recommendedFor}</p>
                  </div>

                  {/* Price for each cycle */}
                  <div className="space-y-3 mb-6">
                    {cycleKeys.map((cycle) => {
                      const price = plan.pricing[cycle];
                      if (!price) return null;
                      const monthlyEquivalent = cycle === "monthly" ? price : cycle === "quarterly" ? price / 3 : price / 12;

                      return (
                        <div key={cycle} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                          <span className="text-sm font-medium capitalize">{plans.billingCycle[cycle]}</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-foreground">
                              ₹{price}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {cycle !== "monthly" ? `(${formatINR(monthlyEquivalent, { showSymbol: true })}/mo)` : ""}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Key Features */}
                  <ul className="space-y-3 mb-6 flex-1">
                    {[
                      { key: "data", icon: Wifi, label: plans.features.data },
                      { key: "ott", icon: Tv, label: plans.features.ott },
                      { key: "tvChannels", icon: Monitor, label: plans.features.tvChannels },
                      { key: "router", icon: Smartphone, label: plans.features.router },
                      { key: "installation", icon: Headphones, label: plans.features.installation },
                      { key: "support", icon: Shield, label: plans.features.support },
                      { key: "staticIp", icon: Zap, label: plans.features.staticIp },
                    ].map((feature) => {
                      const value = plan.features[feature.key as keyof typeof plan.features];
                      const isPositive = value && !value.includes("Not") && !value.includes("₹199") && !value.includes("₹500");
                      return (
                        <li key={feature.key} className="flex items-start gap-3 text-sm">
                          <feature.icon className={`h-5 w-5 shrink-0 mt-0.5 ${isPositive ? "text-success" : "text-muted-foreground"}`} aria-hidden="true" />
                          <span className="text-body">{value}</span>
                        </li>
                      );
                    })}
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
        </div>
      </section>

      {/* GST Notice */}
      <section className="py-8 bg-muted/30" aria-labelledby="gst-notice">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">
            {common.gstNotice} • {plans.fairUsage}
          </p>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-16 lg:py-24 text-center" aria-labelledby="faq-cta-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="faq-cta-heading" className="text-h2 text-foreground">
            Have Questions?
          </h2>
          <p className="mt-4 text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Visit our FAQ for answers about installation, billing, speeds, and more.
          </p>
          <div className="mt-8">
                <Link href={localizedPath("en", "/faq")}>
              <Button size="lg" variant="apple" className="gap-2">
                {common.learnMore}
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper function for formatting (client-side would use the lib version)
function formatINR(amount: number, options: { showSymbol?: boolean } = {}): string {
  const { showSymbol = true } = options;
  return `${showSymbol ? "₹" : ""}${Math.round(amount).toLocaleString("en-IN")}`;
}