import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Gauge } from "@/components/ui/icons";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("en", "/fup");
}

export default async function FupPage() {
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
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-warning/10 text-warning mb-6">
              <Gauge className="h-6 w-6" aria-hidden="true" />
            </div>
            <h1 className="text-display text-foreground">Fair Usage Policy (FUP)</h1>
            <p className="mt-4 text-body-lg text-muted-foreground">
              Last updated: September 2026
            </p>
          </header>

          {/* FUP Content */}
          <div className="space-y-8 prose prose-muted max-w-none">
            <section>
              <h2 className="text-h2 text-foreground">1. Purpose</h2>
              <p className="mt-2">
                This Fair Usage Policy ensures that all P2P Broadband customers enjoy a consistent, high-quality internet experience by preventing excessive usage that could degrade network performance for others.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">2. Fair Usage Limit</h2>
              <p className="mt-2">
                All unlimited broadband plans include a Fair Usage Policy (FUP) limit of <strong>3.3 TB (terabytes) per calendar month</strong>. This applies to the combined upload and download data usage.
              </p>
              <div className="mt-4 p-4 rounded-xl bg-muted/50 border border-border">
                <p className="text-sm text-muted-foreground">
                  <strong>What does 3.3 TB look like?</strong> You could stream 4K video for ~500 hours, download 800+ HD movies, or video conference for ~2,000 hours in a month — well beyond typical household usage.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">3. What Happens After the Limit</h2>
              <p className="mt-2">
                If your monthly usage exceeds 3.3 TB:
              </p>
              <ul className="mt-2 list-disc list-inside space-y-2">
                <li>Your connection speed may be reduced to <strong>2 Mbps</strong> for the remainder of the billing cycle.</li>
                <li>Full speed is automatically restored at the start of the next calendar month.</li>
                <li>You will receive a notification (SMS/email) when you reach 90% and 100% of the FUP limit.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">4. Monitoring Your Usage</h2>
              <p className="mt-2">
                You can monitor your data usage at any time:
              </p>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>Customer portal (coming soon)</li>
                <li>Monthly usage summary via email</li>
                <li>SMS alerts at 90% and 100% thresholds</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">5. Exceptions</h2>
              <p className="mt-2">
                The following traffic is <strong>not counted</strong> toward the FUP limit:
              </p>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>Traffic to P2P Broadband's own speed test servers</li>
                <li>Local network management traffic (DHCP, DNS, etc.)</li>
                <li>TV channel streaming (where bundled with plan)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">6. Prohibited Activities</h2>
              <p className="mt-2">
                The following activities violate this policy and may result in service suspension:
              </p>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>Running servers, hosting, or commercial services without a business plan</li>
                <li>Automated bulk data transfers (scraping, mining, etc.)</li>
                <li>Circumventing FUP limits via VPN, proxies, or other means</li>
                <li>Any illegal activity or copyright infringement</li>
                <li>Network attacks, spam, or malware distribution</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">7. Business & Enterprise Plans</h2>
              <p className="mt-2">
                Business plans may have higher or customized FUP limits. Contact our sales team for dedicated bandwidth and SLA-backed enterprise connectivity.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">8. Policy Changes</h2>
              <p className="mt-2">
                We may update this policy with 30 days' notice. Changes will be communicated via email, SMS, or bill notification. Continued use constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-h2 text-foreground">9. Contact Us</h2>
              <p className="mt-2">
                For questions about Fair Usage Policy or your usage:
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
            <Link href="/plans">
              <Button size="lg" variant="apple" className="gap-2">
                View Plans
                <ArrowLeft className="h-4 w-4 rotate-180" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}