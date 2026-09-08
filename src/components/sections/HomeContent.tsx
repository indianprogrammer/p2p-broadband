"use client";

import { motion } from "@/lib/motion";
import Image from "next/image";
import type { Messages } from "@/lib/i18n/messages";
import { localizedPath } from "@/lib/i18n/config";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { NetworkSection } from "@/components/sections/NetworkSection";
import { EntertainmentSection } from "@/components/sections/EntertainmentSection";
import { SpeedSection } from "@/components/sections/SpeedSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TechSection } from "@/components/sections/TechSection";
import { Zap, Tv, Shield, Headphones, IndianRupee, Wifi, Check, ArrowRight } from "@/components/ui/icons";

const iconMap = { Zap, Tv, Shield, Headphones, Rupee: IndianRupee, Wifi };

interface HomeContentProps {
  messages: Messages;
}

export function HomeContent({ messages }: HomeContentProps) {
  const { common, hero, valueProps, plans } = messages;

  const featuredPlans = [
    {
      id: "basic-50mbps",
      name: "Basic 50 Mbps",
      speed: "50 Mbps",
      price: 499,
      cycle: "monthly",
      features: ["Unlimited Data", "Free Installation (Annual)", "Email Support"],
      popular: false,
    },
    {
      id: "standard-100mbps",
      name: "Standard 100 Mbps",
      speed: "100 Mbps",
      price: 699,
      cycle: "monthly",
      features: ["Unlimited Data", "8 OTT Apps", "50+ TV Channels", "Free Installation", "Priority Support"],
      popular: true,
    },
    {
      id: "premium-300mbps",
      name: "Premium 300 Mbps",
      speed: "300 Mbps",
      price: 1499,
      cycle: "monthly",
      features: ["Unlimited Data", "8 OTT Apps", "200+ TV Channels", "Free Installation", "Priority Support", "Static IP Option"],
      popular: false,
    },
  ];

  const stats = [
    { value: 10000, suffix: "+", format: "compact" as const, label: "Happy Customers" },
    { value: 88, suffix: "", format: "number" as const, label: "Districts Covered" },
    { value: 99.9, suffix: "%", format: "decimal" as const, label: "Network Uptime" },
    { value: 24, suffix: "/7", format: "number" as const, label: "Local Support" },
  ];

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32" aria-labelledby="hero-heading">
        {/* Parallax Background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 -z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/20" />
          <motion.div
            className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{ y: [0, 20, 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-96 h-96 bg-accent/40 rounded-full blur-3xl"
            animate={{ y: [0, -20, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="success" className="mb-6">
                  {hero.stats.customers} Customers • {hero.stats.districts} • {hero.stats.uptime}
                </Badge>
              </motion.div>
              <motion.h1
                id="hero-heading"
                className="text-display text-foreground"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {hero.headline}
              </motion.h1>
              <motion.p
                className="mt-6 text-body-lg text-muted-foreground max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {hero.subheadline}
              </motion.p>
              <motion.div
                className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link href={localizedPath("en", "/coverage")}>
                  <Button size="xl" variant="apple" className="w-full sm:w-auto gap-2 group">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {common.checkAvailability}
                  </Button>
                </Link>
                <Link href={localizedPath("en", "/plans")}>
                  <Button size="xl" variant="outline" className="w-full sm:w-auto gap-2 group">
                    {common.viewPlans}
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
              <motion.p
                className="mt-8 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {hero.trustedBy}
              </motion.p>
            </div>

            <motion.div
              className="relative mx-auto w-full max-w-xl lg:max-w-none"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className="relative overflow-hidden rounded-[32px] border border-border/80 bg-[radial-gradient(circle_at_top_left,_rgba(76,141,255,0.18),_transparent_42%),linear-gradient(180deg,#f7fbff_0%,#edf5ff_100%)] p-4 shadow-[0_30px_80px_rgba(38,85,165,0.14)]"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/images/hero-customers.avif"
                  alt="Indian family using P2P Broadband Wi-Fi together on a laptop"
                  width={1100}
                  height={734}
                  fetchPriority="high"
                  loading="eager"
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 92vw"
                  className="h-auto w-full rounded-[24px]"
                />
              </motion.div>

              <motion.div
                className="absolute -left-2 bottom-8 rounded-2xl border border-border bg-background/90 px-4 py-3 shadow-lg backdrop-blur-sm sm:-left-6"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Wifi className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Peak Speed</div>
                    <div className="text-lg font-semibold text-foreground">Up to 300 Mbps</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats Bar with animated counters */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    format={stat.format}
                  />
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plans Section - Internet Plans & Pricing */}
      <section className="relative py-20 lg:py-28 overflow-hidden" aria-labelledby="featured-plans-heading">
        {/* Parallax Background */}
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ y: 0 }}
          whileInView={{ y: -30 }}
          viewport={{ once: false, margin: "0px 0px -100px 0px" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] via-[#f2f8ff] to-[#f6f3ff]" />
          <img
            src="/images/plans-light.svg"
            alt=""
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white" />
        </motion.div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 id="featured-plans-heading" className="text-h1 text-foreground">
                {plans.title}
              </h2>
              <p className="mt-4 text-body-lg text-muted-foreground">
                {plans.subtitle}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredPlans.map((plan, index) => (
              <ScrollReveal key={plan.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="h-full relative"
                >
                  <Card className="relative flex flex-col h-full shadow-apple-md hover:shadow-apple-lg transition-shadow duration-300">
                    {plan.popular && (
                      <motion.div
                        className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Badge variant="success" className="px-3 py-1">
                          {plans.mostPopular}
                        </Badge>
                      </motion.div>
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
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="mt-10 text-center">
              <Link href={localizedPath("en", "/plans")}>
                <Button variant="ghost" size="lg" className="gap-2">
                  {common.viewPlans}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Network Infrastructure Section - Parallax */}
      <NetworkSection />

      {/* Entertainment Section - Parallax */}
      <EntertainmentSection />

      {/* Speed Section - Parallax */}
      <SpeedSection />

      {/* Value Props Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden" aria-labelledby="value-props-heading">
        {/* Parallax Background */}
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ y: 0 }}
          whileInView={{ y: -30 }}
          viewport={{ once: false, margin: "0px 0px -100px 0px" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#fbfdff] via-[#f3f8ff] to-[#f7f4ff]" />
          <img
            src="/images/value-props-light.svg"
            alt=""
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white" />
        </motion.div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 id="value-props-heading" className="text-h1 text-foreground">
                {valueProps.title}
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valueProps.items.map((item, index) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] || Zap;
              return (
                <ScrollReveal key={item.title} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="h-full"
                  >
                    <Card className="h-full shadow-apple-sm hover:shadow-apple-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <motion.div
                          className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary mb-4"
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </motion.div>
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-body">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Tech Section */}
      <TechSection />

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground relative overflow-hidden" aria-labelledby="cta-heading">
        {/* Animated background blobs */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <h2 id="cta-heading" className="text-h1">
              Ready for Better Internet?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-4 text-body-lg opacity-90 max-w-2xl mx-auto">
              Check availability in your area and get connected within 48 hours. Our local team handles everything.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
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
                <Button size="xl" variant="outline" className="w-full sm:w-auto text-primary border-primary-foreground/30 hover:bg-primary-foreground/10 hover:text-primary-foreground gap-2">
                  {common.applyNow}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
