"use client";

import { motion } from "@/lib/motion";
import { ParallaxLayer } from "@/lib/parallax";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Tv, Play, Film, Music } from "@/components/ui/icons";

export function EntertainmentSection() {
  const features = [
    { icon: Tv, title: "200+ Channels", description: "SD & HD channels including regional" },
    { icon: Play, title: "8 OTT Apps", description: "Hotstar, SonyLIV, ZEE5 & more" },
    { icon: Film, title: "4K Content", description: "Crystal clear streaming quality" },
    { icon: Music, title: "Live Sports", description: "Cricket, Football, Kabaddi" },
  ];

  const ottApps = [
    { name: "Hotstar", color: "#e50914" },
    { name: "SonyLIV", color: "#0066cc" },
    { name: "ZEE5", color: "#1ce783" },
    { name: "JioCinema", color: "#0066ff" },
    { name: "Discovery+", color: "#ff6b00" },
    { name: "Sun NXT", color: "#ff9900" },
    { name: "Eros Now", color: "#ff6699" },
    { name: "Hoichoi", color: "#ff0066" },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" aria-labelledby="entertainment-heading">
      {/* Parallax Background */}
      <ParallaxLayer
        y={{ pts: [0, 1], vals: [0, 80] }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#f7fbff] via-[#f5f0ff] to-[#ffeef5]" />
        <img
          src="/images/tv-entertainment-light.svg"
          alt=""
          width={1200}
          height={800}
          className="w-full h-full object-cover opacity-40 blur-[72px] scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-white" />
      </ParallaxLayer>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div>
            <ScrollReveal>
              <h2 id="entertainment-heading" className="text-h1 text-foreground mb-4">
                Premium Entertainment Bundled
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-body-lg text-muted-foreground mb-8">
                Get access to 200+ TV channels and 8 premium OTT apps with your internet plan. 
                Stream movies, series, and live sports in stunning quality.
              </p>
            </ScrollReveal>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <ScrollReveal key={feature.title} delay={0.2 + index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="p-4 rounded-xl bg-card border border-border/50"
                  >
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>

            {/* OTT Apps */}
            <ScrollReveal delay={0.6}>
              <div className="p-4 rounded-xl bg-card border border-border/50">
                <div className="text-sm font-semibold mb-3">Included OTT Apps</div>
                <div className="flex flex-wrap gap-2">
                  {ottApps.map((app) => (
                    <motion.span
                      key={app.name}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: app.color }}
                    >
                      {app.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right - TV Image */}
          <ScrollReveal direction="right" delay={0.2}>
            <ParallaxLayer
              scale={{ pts: [0, 0.5, 1], vals: [0.85, 1, 0.95] }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#8e7cf8]/20 to-[#ff6b9d]/20 rounded-3xl blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden border border-border/50 bg-white shadow-2xl">
                <img
                  src="/images/tv-entertainment-light.svg"
                  alt="Smart TV with streaming apps"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-sm border-t border-border/40">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Play className="h-6 w-6 text-primary-foreground ml-1" />
                    </div>
                    <div>
                      <div className="text-foreground font-semibold">Start Streaming</div>
                      <div className="text-muted-foreground text-sm">200+ channels & 8 OTT apps</div>
                    </div>
                  </div>
                </div>
              </div>
            </ParallaxLayer>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
