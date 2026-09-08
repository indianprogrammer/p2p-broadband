"use client";

import { motion } from "@/lib/motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Wifi, Cpu, Signal, Home, Satellite } from "@/components/ui/icons";

export function TechSection() {
  const layers = [
    {
      icon: Satellite,
      title: "Backbone Network",
      description: "Multi-gigabit fiber backbone connecting major cities",
      height: "h-8",
      color: "from-[#0066cc] to-[#00aaff]",
    },
    {
      icon: Cpu,
      title: "GPON Technology",
      description: "Advanced fiber-to-home for symmetrical speeds",
      height: "h-6",
      color: "from-[#30d158] to-[#00ff88]",
    },
    {
      icon: Wifi,
      title: "Wi-Fi 6 Router",
      description: "Dual-band 3000 Mbps router for whole-home coverage",
      height: "h-4",
      color: "from-[#ff9f0a] to-[#ffcc00]",
    },
    {
      icon: Home,
      title: "Your Devices",
      description: "Up to 32 connected devices without slowdown",
      height: "h-2",
      color: "from-[#ff6b6b] to-[#ff8fab]",
    },
  ];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden" aria-labelledby="tech-heading">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ y: 0 }}
        whileInView={{ y: -30 }}
        viewport={{ once: false, margin: "0px 0px -100px 0px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] via-[#f1f7fb] to-[#f6f2ff]" />
        <img
          src="/images/tech-network-light.svg"
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 id="tech-heading" className="text-h1 text-foreground">
              How Our Network Works
            </h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              From backbone to your home - see the journey of your internet
            </p>
          </div>
        </ScrollReveal>

        {/* Visualization */}
        <div className="mb-16">
          <ScrollReveal>
            <div className="relative p-8 rounded-3xl bg-card border border-border/50 overflow-visible">
              {/* Connection lines */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent opacity-50" />

              {layers.map((layer, index) => (
                <motion.div
                  key={layer.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center gap-4 mb-6 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Icon node */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-border/50 flex items-center justify-center z-10">
                    <layer.icon className="h-7 w-7 text-primary" />
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 ${
                      index % 2 === 0 ? "lg:text-right" : "lg:text-left"
                    } ${index % 2 === 0 ? "lg:pr-8" : "lg:pl-8"}`}
                  >
                    <div className="font-semibold text-lg">{layer.title}</div>
                    <div className="text-sm text-muted-foreground">{layer.description}</div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-32 lg:w-48 h-2 rounded-full bg-muted/50 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: index * 0.15, ease: "easeOut" }}
                      className={`h-full rounded-full bg-gradient-to-r ${layer.color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Signal coverage strip */}
        <ScrollReveal delay={0.4}>
          <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-border/50">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Signal className="h-5 w-5 text-primary animate-pulse-soft" />
              <span className="font-semibold text-center">Full Coverage Signal</span>
            </div>
            <div className="flex items-center justify-center gap-8">
              {[20, 40, 60, 80, 100].map((strength, index) => (
                <motion.div
                  key={index}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  style={{ height: `${strength}px` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-3 rounded-full bg-gradient-to-t from-primary to-accent"
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
