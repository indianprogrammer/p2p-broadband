"use client";

import { motion } from "@/lib/motion";
import { ParallaxLayer } from "@/lib/parallax";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Shield, Globe, Server, Wifi } from "@/components/ui/icons";

export function NetworkSection() {
  const stats = [
    { icon: Globe, value: 88, suffix: "+", label: "Districts Connected" },
    { icon: Server, value: 99, suffix: ".9%", label: "Network Uptime" },
    { icon: Shield, value: 24, suffix: "/7", label: "Monitoring" },
    { icon: Wifi, value: 10000, suffix: "+", label: "Active Users" },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" aria-labelledby="network-heading">
      {/* Parallax Background */}
      <ParallaxLayer
        y={{ pts: [0, 1], vals: [0, 100] }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#f7fbff] via-[#edf5ff] to-[#e8f2ff]" />
        <img
          src="/images/network-infrastructure-light.svg"
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white" />
      </ParallaxLayer>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ParallaxLayer
          scale={{ pts: [0, 0.5, 1], vals: [0.8, 1, 0.9] }}
          opacity={{ pts: [0, 0.2, 0.8, 1], vals: [0, 1, 1, 0] }}
          className="text-center mb-16"
        >
          <ScrollReveal>
            <h2 id="network-heading" className="text-h1 text-foreground mb-4">
              Enterprise-Grade Network Infrastructure
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Our fiber backbone spans across Madhya Pradesh and Chhattisgarh with redundant paths ensuring 99.9% uptime.
            </p>
          </ScrollReveal>
        </ParallaxLayer>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-border/50 shadow-apple-md text-center group"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                    <stat.icon className="h-7 w-7" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-foreground mb-1">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Network visualization */}
        <ScrollReveal delay={0.4}>
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-success/10 to-primary/10 rounded-3xl blur-xl" />
            <div className="relative p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-border/50 shadow-apple-lg">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="text-foreground">
                  <div className="text-lg font-semibold">Live Network Status</div>
                  <div className="text-sm text-muted-foreground">All systems operational</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
                  <span className="text-sm text-success">Active</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-xl bg-accent/60">
                  <div className="text-2xl font-bold text-primary">12ms</div>
                  <div className="text-xs text-muted-foreground">Avg Latency</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-accent/60">
                  <div className="text-2xl font-bold text-success">0.1%</div>
                  <div className="text-xs text-muted-foreground">Packet Loss</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-accent/60">
                  <div className="text-2xl font-bold text-warning">98%</div>
                  <div className="text-xs text-muted-foreground">Bandwidth Usage</div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}