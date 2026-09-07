import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import type { Messages } from "@/lib/i18n/messages";
import { getPageMetadata } from "@/lib/seo";
import { localizedPath } from "@/lib/i18n/config";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    slug: "welcome-p2p-broadband",
    title: "Welcome to P2P Broadband: High-Speed Internet for Central India",
    excerpt: "We're excited to launch our new website and share our mission to bring fiber internet to every home in Madhya Pradesh and Chhattisgarh.",
    category: "news",
    date: "2026-09-01",
    readTime: "3 min read",
  },
  {
    slug: "new-300mbps-plan",
    title: "Introducing 300 Mbps Plan with Full OTT & TV Bundle",
    excerpt: "Our new Premium plan includes 200+ TV channels, 8 premium OTT apps, free Wi-Fi 6 router, and static IP — all for ₹1,499/month.",
    category: "offers",
    date: "2026-08-15",
    readTime: "2 min read",
  },
  {
    slug: "network-expansion-2024",
    title: "Network Expansion: Now Covering All 88 Districts",
    excerpt: "We've completed our rollout across all 55 districts of MP and 33 districts of Chhattisgarh. Check if your area is covered!",
    category: "expansion",
    date: "2026-07-20",
    readTime: "4 min read",
  },
  {
    slug: "wifi6-router-benefits",
    title: "Why Wi-Fi 6 Router Matters for Your Home Internet",
    excerpt: "Learn how our free Wi-Fi 6 router improves speed, coverage, and device capacity for modern smart homes.",
    category: "tips",
    date: "2026-06-10",
    readTime: "5 min read",
  },
  {
    slug: "monsoon-network-readiness",
    title: "Monsoon Ready: How We Keep You Connected During Rains",
    excerpt: "Our network engineering team shares how we maintain 99.9% uptime even during heavy monsoons in Central India.",
    category: "news",
    date: "2026-05-15",
    readTime: "3 min read",
  },
  {
    slug: "referral-program-launch",
    title: "Refer a Friend, Get 1 Month Free!",
    excerpt: "Our new referral program rewards you and your friends. Share your unique code and enjoy free internet.",
    category: "offers",
    date: "2026-04-01",
    readTime: "2 min read",
  },
];

const categories = [
  { id: "all", name: "All Posts" },
  { id: "offers", name: "Offers" },
  { id: "news", name: "News" },
  { id: "expansion", name: "Network Expansion" },
  { id: "tips", name: "Tips & Guides" },
];

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("en", "/blog");
}

export default async function BlogPage() {
  const messages = (await getMessages()) as Messages;
  const { blog } = messages;

  return (
    <div className="flex-1">
      {/* Page Header */}
      <section className="py-16 lg:py-24 bg-muted/30" aria-labelledby="blog-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 id="blog-heading" className="text-display text-foreground">
              {blog.title}
            </h1>
            <p className="mt-4 text-body-lg text-muted-foreground">
              {blog.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8" aria-labelledby="filter-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center" role="tablist" aria-label="Blog categories">
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
      </section>

      {/* Blog Posts Grid */}
      <section className="py-8 lg:py-16" aria-labelledby="posts-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <article key={post.slug} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-apple-lg transition-shadow">
                  <div className="aspect-video bg-muted/50 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="h-16 w-16 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <Badge variant="outline" className="absolute top-3 left-3 capitalize">{post.category}</Badge>
                  </div>
                  <CardContent className="flex-1 flex flex-col p-5">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Tag className="h-3.5 w-3.5" aria-hidden="true" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{post.excerpt}</p>
                    <Link
                      href={localizedPath("en", `/blog/${post.slug}`)}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      {blog.readMore}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" className="gap-2">
              Load More Posts
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground" aria-labelledby="newsletter-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="newsletter-heading" className="text-h2">
              {messages.footer.newsletter.title}
          </h2>
          <p className="mt-4 text-body-lg opacity-90 max-w-2xl mx-auto">
            Get the latest offers, network updates, and tips delivered to your inbox.
          </p>
          <form className="mt-8 max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder={messages.footer.newsletter.placeholder}
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Email address"
              required
            />
            <Button type="submit" variant="secondary" size="lg">
              {messages.footer.newsletter.button}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}