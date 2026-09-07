import Link from "next/link";
import { localizedPath } from "@/lib/i18n/config";

interface FooterProps {
  locale: string;
}

const socialIcons: Record<string, React.ReactNode> = {
  facebook: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  twitter: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
    </svg>
  ),
  instagram: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" strokeWidth="2" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" strokeWidth="2" />
    </svg>
  ),
  youtube: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122 2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

export function Footer({ locale }: FooterProps) {
  const footerLinks = {
    quickLinks: [
      { name: "Home", href: localizedPath(locale) },
      { name: "Plans", href: localizedPath(locale, "/plans") },
      { name: "TV & OTT", href: localizedPath(locale, "/tv-ott") },
      { name: "Coverage", href: localizedPath(locale, "/coverage") },
      { name: "About", href: localizedPath(locale, "/about") },
    ],
    support: [
      { name: "Contact Us", href: localizedPath(locale, "/contact") },
      { name: "FAQ", href: localizedPath(locale, "/faq") },
      { name: "Apply for Connection", href: localizedPath(locale, "/apply") },
      { name: "Check Availability", href: localizedPath(locale, "/coverage") },
    ],
    legal: [
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Fair Usage Policy", href: "/fup" },
    ],
    social: [
      { name: "Facebook", href: "#", icon: "facebook" },
      { name: "Twitter", href: "#", icon: "twitter" },
      { name: "Instagram", href: "#", icon: "instagram" },
      { name: "YouTube", href: "#", icon: "youtube" },
    ],
  };

  return (
    <footer className="border-t border-border/50 bg-muted/30" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href={localizedPath(locale)} className="flex items-center gap-2 mb-4" aria-label="P2P Broadband Home">
              <svg
                className="h-8 w-8 text-primary"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M16 8V24M8 16H24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-xl font-bold tracking-tight">P2P Broadband</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              High-speed fiber internet for every home in Madhya Pradesh & Chhattisgarh.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="tel:+919993996840"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                +91 99939 96840
              </a>
              <a
                href="mailto:p2infra@gmail.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                p2infra@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support */}
          <nav aria-label="Support">
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal">
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {footerLinks.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {socialIcons[social.icon]}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 P2P Broadband. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Dindayal, Supela, Khamariya, Bhilai, Chhattisgarh 490009
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}