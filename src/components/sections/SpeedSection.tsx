"use client";

import { motion } from "@/lib/motion";
import { ParallaxLayer } from "@/lib/parallax";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Zap, Download, Upload, Clock } from "@/components/ui/icons";

export function SpeedSection() {
  const speedFeatures = [
    { icon: Download, value: 300, suffix: " Mbps", label: "Download Speed", color: "#00aaff" },
    { icon: Upload, value: 150, suffix: " Mbps", label: "Upload Speed", color: "#30d158" },
    { icon: Clock, value: 12, suffix: " ms", label: "Latency", color: "#ff9f0a" },
    { icon: Zap, value: 99, suffix: ".9%", label: "Uptime", color: "#ff6b6b" },
  ];

  const speedComparison = [
    { label: "Our Fiber", speed: 300, width: "100%", color: "#0a84ff" },
    { label: "Broadband Avg", speed: 100, width: "33%", color: "#9db2c8" },
    { label: "Mobile 4G", speed: 40, width: "13%", color: "#b7c6da" },
    { label: "Broadband Min", speed: 10, width: "3%", color: "#c9d4e2" },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" aria-labelledby="speed-heading">
      {/* Parallax Background */}
      <ParallaxLayer
        y={{ pts: [0, 1], vals: [0, 120] }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#f7fbff] via-[#eefbf3] to-[#f3f7ff]" />
        <img
          src="/images/speed-performance-light.svg"
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white" />
      </ParallaxLayer>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 id="speed-heading" className="text-h1 text-foreground mb-4">
              Blazing Fast Speeds
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Experience true fiber-to-home speeds with our advanced GPON technology. 
              Stream, game, and work without limits.
            </p>
          </div>
        </ScrollReveal>

        {/* Speed Gauge */}
        <ScrollReveal delay={0.2}>
          <div className="relative max-w-md mx-auto mb-16">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" />
            <div className="relative w-64 h-64 mx-auto">
              {/* Gauge background */}
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#dce8f5"
                  strokeWidth="12"
                />
                {/* Gauge progress */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="url(#gaugeGradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray="502"
                  initial={{ strokeDashoffset: 502 }}
                  animate={{ strokeDashoffset: 100 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
                />
                <defs>
                  <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0066cc" />
                    <stop offset="100%" stopColor="#00aaff" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-foreground">
                  <AnimatedCounter end={300} />
                </div>
                <div className="text-sm text-primary font-medium">Mbps</div>
                <div className="text-xs text-muted-foreground mt-1">Download Speed</div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Speed Features */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
          {speedFeatures.map((feature, index) => (
            <ScrollReveal key={feature.label} delay={0.3 + index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.03, y: -3 }}
                className="p-5 rounded-2xl bg-card border border-border/50 text-center group"
              >
                <div
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl mb-3 transition-colors duration-300"
                  style={{ backgroundColor: `${feature.color}20`, color: feature.color }}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold text-foreground">
                  <AnimatedCounter end={feature.value} suffix={feature.suffix} />
                </div>
                <div className="text-xs text-muted-foreground mt-1">{feature.label}</div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Speed Comparison */}
        <ScrollReveal delay={0.6}>
          <div className="p-6 lg:p-8 rounded-3xl bg-card border border-border/50">
            <h3 className="text-lg font-semibold mb-6">Speed Comparison</h3>
            <div className="space-y-4">
              {speedComparison.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-medium">{item.speed} Mbps</span>
                  </div>
                  <div className="h-3 rounded-full bg-muted/50 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: item.width }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
