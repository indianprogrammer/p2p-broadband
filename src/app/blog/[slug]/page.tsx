import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Tag, ArrowLeft, ArrowRight } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPost, getPostSlugs, type BlogBlock } from "@/lib/blog";
import { generateBlogPostingJsonLd, generateBreadcrumbJsonLd } from "@/lib/jsonld";

const siteUrl = "https://p2pbroadband.in";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    return { title: "Post Not Found" };
  }

  const url = `${siteUrl}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: url,
      languages: { en: url, "x-default": url },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["/og-image.png"],
    },
  };
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="text-h2 text-foreground mt-10 mb-4">{block.text}</h2>;
    case "ul":
      return (
        <ul className="list-disc pl-6 space-y-2 mb-6 text-body-lg text-muted-foreground">
          {block.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    default:
      return <p className="text-body-lg text-muted-foreground mb-6 leading-relaxed">{block.text}</p>;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    notFound();
  }

  const url = `${siteUrl}/blog/${post.slug}`;

  return (
    <div className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBlogPostingJsonLd(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbJsonLd([
              { name: "Home", url: siteUrl },
              { name: "Blog", url: `${siteUrl}/blog` },
              { name: post.title, url },
            ])
          ),
        }}
      />

      <section className="py-16 lg:py-24 bg-muted/30" aria-labelledby="post-title">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mb-8"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Blog
          </Link>

          <Badge variant="outline" className="mb-4 capitalize">
            {post.category}
          </Badge>
          <h1 id="post-title" className="text-display text-foreground mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1.5">
              <Tag className="h-4 w-4" aria-hidden="true" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      <article className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <p className="text-body-lg font-medium text-foreground mb-8">{post.excerpt}</p>
          {post.body.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </div>
      </article>

      <section className="py-16 lg:py-24 bg-muted/30" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-heading" className="text-h2 text-foreground">
            Ready for faster internet?
          </h2>
          <p className="mt-4 text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Check availability in your area and pick the right plan for your home.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/apply">
              <Button size="lg" className="gap-2">
                Apply Now
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/coverage">
              <Button size="lg" variant="outline">
                Check Coverage
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}