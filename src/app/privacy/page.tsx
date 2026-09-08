import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "@/components/ui/icons";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("en", "/privacy");
}

export default async function PrivacyPage() {
  const messages = (await getMessages()) as any;

  return (
    <div className="flex-1 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Back Link */}
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Home
          </Link>

          {/* Page Header */}
          <header className="mb-12 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mb-6">
              <Shield className="h-6 w-6" aria-hidden="true" />
            </div>
            <h1 className="text-display text-foreground">{messages.common.privacy}</h1>
            <p className="mt-4 text-body-lg text-muted-foreground">
              Last updated: September 2026
            </p>
          </header>

          {/* Privacy Content */}
          <div className="space-y-8 prose prose-muted max-w-none">
            <section>
              <h2 className="text-h2 text-foreground">1. Information We Collect</h2>
              <p className="mt-2">
                We collect information you provide directly to us, including:
              </p>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>Name, phone number, email address</li>
                <li>Service address and location details</li>
                <li>Government ID (Aadhaar) for KYC verification</li>
                <li>Payment and billing information</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">2. How We Use Your Information</h2>
              <p className="mt-2">
                Your information is used to:
              </p>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>Provide, maintain, and improve our internet services</li>
                <li>Process applications and manage your account</li>
                <li>Bill and collect payments</li>
                <li>Send service notifications and updates</li>
                <li>Respond to support requests</li>
                <li>Comply with legal obligations (TRAI, DoT regulations)</li>
                <li>Send promotional offers (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">3. Information Sharing</h2>
              <p className="mt-2">
                We do not sell your personal information. We may share data with:
              </p>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>Service partners (installation, maintenance)</li>
                <li>Payment processors</li>
                <li>Government authorities as required by law</li>
                <li>Legal advisors for compliance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">4. Data Security</h2>
              <p className="mt-2">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">5. Data Retention</h2>
              <p className="mt-2">
                We retain your data for the duration of your service agreement plus 3 years for legal and billing purposes, or as required by applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">6. Your Rights</h2>
              <p className="mt-2">
                Under applicable data protection laws, you have the right to:
              </p>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion (subject to legal obligations)</li>
                <li>Restrict or object to processing</li>
                <li>Data portability</li>
                <li>Withdraw consent for marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">7. Cookies & Tracking</h2>
              <p className="mt-2">
                Our website uses essential cookies for functionality and analytics cookies to improve user experience. You can manage cookie preferences in your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">8. Children's Privacy</h2>
              <p className="mt-2">
                Our services are not directed to individuals under 18. We do not knowingly collect personal information from minors.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">9. Changes to This Policy</h2>
              <p className="mt-2">
                We may update this policy periodically. Changes will be posted on this page with an updated effective date. Continued use of our services constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">10. Contact Us</h2>
              <p className="mt-2">
                For privacy concerns or to exercise your rights:
              </p>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>Email: <a href="mailto:p2infra@gmail.com" className="text-primary hover:underline">p2infra@gmail.com</a></li>
                <li>Phone: <a href="tel:+919993996840" className="text-primary hover:underline">+91 99939 96840</a></li>
                <li>Address: P2P, Dakshin Gangotri, Supela, Bhilai, Chhattisgarh 490009</li>
              </ul>
            </section>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link href="/apply">
              <Button size="lg" variant="apple" className="gap-2">
                Get Connected
                <ArrowLeft className="h-4 w-4 rotate-180" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}