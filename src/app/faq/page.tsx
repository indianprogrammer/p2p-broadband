import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import type { Messages } from "@/lib/i18n/messages";
import { getPageMetadata } from "@/lib/seo";
import { localizedPath } from "@/lib/i18n/config";
import Link from "next/link";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Search, ChevronDown } from "lucide-react";

const faqData = [
  {
    category: "general",
    question: "What areas do you serve?",
    answer: "We serve all 55 districts of Madhya Pradesh and 33 districts of Chhattisgarh — 88 districts total. Use our pincode checker to confirm availability at your exact location."
  },
  {
    category: "general",
    question: "What is P2P Broadband & CCTV?",
    answer: "We're a licensed Internet Service Provider (Category A) based in Bhilai, Chhattisgarh. We also provide CCTV installation services for homes and businesses."
  },
  {
    category: "plans",
    question: "Are prices inclusive of GST?",
    answer: "No, all prices shown are before 18% GST. The final bill will include GST. For example, the ₹499/month plan becomes ₹589/month with GST."
  },
  {
    category: "plans",
    question: "Can I change my plan later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect from the next billing cycle. No change fees apply."
  },
  {
    category: "plans",
    question: "What OTT apps are included?",
    answer: "Our 100 Mbps and 300 Mbps plans include Disney+ Hotstar, SonyLIV, ZEE5, JioCinema, Discovery+, Sun NXT, Eros Now, and Hoichoi. The exact lineup may vary by region."
  },
  {
    category: "installation",
    question: "Is installation free?",
    answer: "Installation is free on 12-month commitments. For month-to-month plans, a one-time ₹500 installation fee applies (refundable as credit)."
  },
  {
    category: "installation",
    question: "How long does installation take?",
    answer: "Standard installation takes 2–4 hours. Our technician will schedule a convenient time after your application is approved. Same-day installation available in select areas."
  },
  {
    category: "installation",
    question: "Do you provide a Wi-Fi router?",
    answer: "Yes! A Wi-Fi 6 dual-band router is included free on 12-month plans. For shorter commitments, you can rent one for ₹199/month or purchase for ₹1,500."
  },
  {
    category: "technical",
    question: "What speeds can I expect?",
    answer: "You'll typically get 90–95% of your plan speed over Wi-Fi, and full speed over wired Ethernet. We use GPON fiber technology for consistent performance."
  },
  {
    category: "technical",
    question: "Is there a data cap (FUP)?",
    answer: "All plans are unlimited with a Fair Usage Policy (FUP) of 3.3 TB/month — more than enough for 4K streaming, gaming, and work from home."
  },
  {
    category: "support",
    question: "How do I get support?",
    answer: "Call/WhatsApp us at +91 99939 96840 (10 AM–7 PM, Mon–Sat), email p2infra@gmail.com, or use the contact form. We respond within 4 hours during business hours."
  },
  {
    category: "support",
    question: "What if my internet goes down?",
    answer: "We monitor our network 24/7. Most issues are resolved remotely within 2 hours. For on-site visits, our local technicians typically arrive within 24 hours."
  }
];

const categories = [
  { id: "all", name: "All" },
  { id: "general", name: "General" },
  { id: "plans", name: "Plans & Billing" },
  { id: "installation", name: "Installation" },
  { id: "technical", name: "Technical" },
  { id: "support", name: "Support" },
];

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("en", "/faq");
}

export default async function FAQPage() {
  const messages = (await getMessages()) as Messages;
  const { common, faq } = messages;

  return (
    <div className="flex-1">
      {/* Page Header */}
      <section className="py-16 lg:py-24 bg-muted/30" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 id="faq-heading" className="text-display text-foreground">
              {faq.title}
            </h1>
            <p className="mt-4 text-body-lg text-muted-foreground">
              {faq.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 lg:py-12" aria-labelledby="search-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <input
                type="search"
                id="faq-search"
                placeholder="Search FAQs..."
                className="w-full pl-12 pr-4 py-3 text-lg rounded-xl border border-input bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                aria-label="Search FAQs"
              />
            </div>

            <div className="flex flex-wrap gap-2" role="tablist" aria-label="FAQ Categories">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={cat.id === "all"}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    cat.id === "all"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-8 lg:py-16" aria-labelledby="faq-list-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Accordion type="multiple" className="space-y-3">
              {faqData.map((item, index) => (
                <AccordionItem key={`${item.category}-${index}`} value={`${item.category}-${index}`}>
                  <AccordionTrigger className="text-left py-4 text-lg">
                    <span className="flex-1">{item.question}</span>
                    <ChevronDown className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-body text-muted-foreground">
                    <p>{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16 lg:py-24 bg-muted/30" aria-labelledby="help-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="help-heading" className="text-h2 text-foreground">
            Still Need Help?
          </h2>
          <p className="mt-4 text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Can&apos;t find the answer you&apos;re looking for? Our local support team is here to help.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={localizedPath("en", "/contact")}>
              <button className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
                {common.contactUs}
              </button>
            </Link>
            <a href="tel:+919993996840">
              <button className="px-8 py-3 rounded-xl border border-border bg-background font-medium hover:bg-muted transition-colors">
                {common.phone}
              </button>
            </a>
            <a href={`https://wa.me/919993996840?text=${encodeURIComponent("Hi, I have a question about P2P Broadband services.")}`} 
               target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-3 rounded-xl border border-border bg-background font-medium hover:bg-muted transition-colors">
                WhatsApp Us
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}