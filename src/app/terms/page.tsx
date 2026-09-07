import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("en", "/terms");
}

export default async function TermsPage() {
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
            <h1 className="text-display text-foreground">{messages.common.terms}</h1>
            <p className="mt-4 text-body-lg text-muted-foreground">
              Last updated: September 2026
            </p>
          </header>

          {/* Terms Content */}
          <div className="space-y-8 prose prose-muted max-w-none">
            <section>
              <h2 className="text-h2 text-foreground">1. Acceptance of Terms</h2>
              <p className="mt-2">
                By accessing or using P2P Broadband services, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">2. Service Description</h2>
              <p className="mt-2">
                P2P Broadband provides high-speed fiber internet services across Madhya Pradesh and Chhattisgarh. Services include internet connectivity, TV channel packages, and OTT app subscriptions as per the selected plan.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">3. Subscription & Billing</h2>
              <p className="mt-2">
                All prices are exclusive of 18% GST. Billing cycles are monthly, quarterly, or annually as selected. Payments are due in advance. Late payments may result in service suspension.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">4. Fair Usage Policy</h2>
              <p className="mt-2">
                All unlimited plans are subject to a Fair Usage Policy (FUP) of 3.3 TB/month. Beyond this limit, speeds may be reduced to manage network congestion. See our <Link href="/fup" className="text-primary hover:underline">Fair Usage Policy</Link> for details.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">5. Equipment</h2>
              <p className="mt-2">
                The Wi-Fi router provided on annual plans remains the property of P2P Broadband until the completion of the commitment period. Damage or loss may incur replacement charges.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">6. Service Availability</h2>
              <p className="mt-2">
                We strive for 99.9% uptime. However, service may be temporarily unavailable due to maintenance, force majeure, or technical issues. We are not liable for indirect damages from service interruptions.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">7. Termination</h2>
              <p className="mt-2">
                Either party may terminate the agreement with 30 days' notice. Early termination of annual commitments may incur prorated charges for installation and equipment.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">8. Limitation of Liability</h2>
              <p className="mt-2">
                Our liability is limited to the amount paid for services in the preceding 12 months. We are not liable for consequential, incidental, or indirect damages.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">9. Governing Law</h2>
              <p className="mt-2">
                These terms are governed by the laws of India. Disputes shall be subject to the jurisdiction of courts in Durg, Chhattisgarh.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">10. Contact Us</h2>
              <p className="mt-2">
                For questions about these terms, contact us at:
              </p>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>Email: <a href="mailto:p2infra@gmail.com" className="text-primary hover:underline">p2infra@gmail.com</a></li>
                <li>Phone: <a href="tel:+919993996840" className="text-primary hover:underline">+91 99939 96840</a></li>
                <li>Address: Dindayal, Supela, Khamariya, Bhilai, Chhattisgarh 490009</li>
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