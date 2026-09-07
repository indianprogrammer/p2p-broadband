import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import type { Messages } from "@/lib/i18n/messages";
import { getPageMetadata } from "@/lib/seo";
import { localizedPath } from "@/lib/i18n/config";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Target, Users, Award, Globe, Check } from "lucide-react";

const certifications = [
  "ISP License (Category A)",
  "DOT Registered",
  "ISO 27001 Certified",
  "TRAI Compliant",
];

const values = [
  { icon: Target, title: "Customer First", description: "Every decision starts with what's best for our users." },
  { icon: Globe, title: "Local Roots", description: "We're from here. We speak your language. We understand your challenges." },
  { icon: Shield, title: "Quality Network", description: "Enterprise-grade fiber infrastructure with 99.9% uptime guarantee." },
  { icon: Award, title: "Transparent Pricing", description: "No hidden fees, no surprise bills. What you see is what you pay." },
];

const team = [
  { name: "Founder & CEO", role: "Network Engineering, 15+ years experience" },
  { name: "CTO", role: "Fiber Architecture & Operations" },
  { name: "Head of Customer Experience", role: "Local Support & Regional Operations" },
];

const milestones = [
  { year: "2019", title: "Founded in Bhilai", description: "Started with a vision to connect Central India" },
  { year: "2020", title: "First 1,000 Customers", description: "Expanded to 10 districts across CG" },
  { year: "2021", title: "MP Expansion", description: "Launched services in Madhya Pradesh" },
  { year: "2022", title: "OTT & TV Bundles", description: "Partnered with major content providers" },
  { year: "2023", title: "10,000+ Connections", description: "Covering 50+ districts across both states" },
  { year: "2024", title: "88 Districts Covered", description: "Full state coverage achieved" },
];

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("en", "/about");
}

export default async function AboutPage() {
  const messages = (await getMessages()) as Messages;
  const { common, about } = messages;

  return (
    <div className="flex-1">
      {/* Page Header */}
      <section className="py-16 lg:py-24 bg-muted/30" aria-labelledby="about-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 id="about-heading" className="text-display text-foreground">
              {about.title}
            </h1>
            <p className="mt-4 text-body-lg text-muted-foreground">
              {about.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Story & Mission */}
      <section className="py-16 lg:py-24" aria-labelledby="story-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 id="story-heading" className="text-h2 text-foreground mb-6">
                {about.story.title}
              </h2>
              <div className="prose prose-lg text-muted-foreground">
                <p>{about.story.content}</p>
              </div>
            </div>
            <div>
              <h2 className="text-h2 text-foreground mb-6">
                {about.mission.title}
              </h2>
              <div className="prose prose-lg text-muted-foreground">
                <p>{about.mission.content}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-muted/30" aria-labelledby="values-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 id="values-heading" className="text-h1 text-foreground">
              Our Values
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={value.title} className="h-full animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary mb-4">
                    <value.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-body">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 lg:py-24" aria-labelledby="milestones-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 id="milestones-heading" className="text-h1 text-foreground">
              Our Journey
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <ol className="relative">
              <li className="absolute left-7 top-0 bottom-0 w-0.5 bg-border" aria-hidden="true" />
              {milestones.map((milestone, index) => (
                <li key={milestone.year} className="relative pb-12 pl-16 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="absolute left-0 top-1 w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg border-4 border-background z-10">
                    {milestone.year}
                  </div>
                  <div className="bg-card rounded-xl border p-6">
                    <h3 className="text-lg font-semibold mb-1">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 lg:py-24 bg-muted/30" aria-labelledby="certs-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 id="certs-heading" className="text-h2 text-foreground">
              Certifications & Compliance
            </h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              We meet all regulatory requirements and industry standards.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {certifications.map((cert, index) => (
              <Badge key={cert} variant="outline" className="h-14 px-4 text-base justify-center animate-slide-up" style={{ animationDelay: `${index * 80}ms` }}>
                <Check className="h-4 w-4 mr-2 text-success" aria-hidden="true" />
                {cert}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24" aria-labelledby="team-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 id="team-heading" className="text-h1 text-foreground">
              {about.team.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card key={member.name} className="text-center animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="h-24 w-24 rounded-full bg-accent mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Network Stats */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground" aria-labelledby="stats-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 id="stats-heading" className="text-h1">
              Network at a Glance
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold">88</div>
              <div className="opacity-80">Districts</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">10,000+</div>
              <div className="opacity-80">Connections</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">99.9%</div>
              <div className="opacity-80">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">300 Mbps</div>
              <div className="opacity-80">Max Speed</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 text-center" aria-labelledby="about-cta-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="about-cta-heading" className="text-h2 text-foreground">
            Want to Join Our Network?
          </h2>
          <p className="mt-4 text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you&apos;re a home user, business, or potential partner — we&apos;d love to connect.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={localizedPath("en", "/apply")}>
              <Button size="lg" variant="apple" className="gap-2 w-full sm:w-auto">
                {common.applyNow}
              </Button>
            </Link>
            <Link href={localizedPath("en", "/contact")}>
              <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                {common.contactUs}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}