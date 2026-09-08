"use client";

import { motion } from "@/lib/motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Star, Quote } from "@/components/ui/icons";

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Bhilai, CG",
    text: "Switched from a local cable ISP and the difference is night and day. 4K streaming with zero buffering.",
    rating: 5,
    plan: "Premium 300 Mbps",
  },
  {
    name: "Priya Sharma",
    location: "Raipur, CG",
    text: "The bundled OTT apps are incredible value. We watch everything on one connection now.",
    rating: 5,
    plan: "Standard 100 Mbps",
  },
  {
    name: "Amit Verma",
    location: "Indore, MP",
    text: "Work from home has never been smoother. Video calls are crystal clear and never drop.",
    rating: 5,
    plan: "Standard 100 Mbps",
  },
  {
    name: "Neha Patel",
    location: "Bhopal, MP",
    text: "Installation was same-day and the team was super helpful. Internet has been rock solid since.",
    rating: 5,
    plan: "Basic 50 Mbps",
  },
  {
    name: "Suresh Singh",
    location: "Gwalior, MP",
    text: "Gaming latency is amazing! The 300 Mbps plan delivers on every promise.",
    rating: 5,
    plan: "Premium 300 Mbps",
  },
  {
    name: "Anita Desai",
    location: "Jabalpur, MP",
    text: "Local support is the best part. They pick up the phone and actually solve problems quickly.",
    rating: 4,
    plan: "Basic 50 Mbps",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden" aria-labelledby="testimonials-heading">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ y: 0 }}
        whileInView={{ y: -30 }}
        viewport={{ once: false, margin: "0px 0px -100px 0px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] via-[#fffbf2] to-[#f2f9ff]" />
        <img
          src="/images/testimonials-light.svg"
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 id="testimonials-heading" className="text-h1 text-foreground">
              Loved by 10,000+ Customers
            </h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              Hear from real customers across Madhya Pradesh & Chhattisgarh
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.name} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className="h-full p-6 rounded-2xl bg-card border border-border/50 shadow-apple-sm hover:shadow-apple-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex" aria-label={`${testimonial.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? "text-warning fill-warning"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-primary/30" />
                </div>
                <p className="text-body text-foreground/90 mb-4">{testimonial.text}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {testimonial.plan}
                  </span>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
