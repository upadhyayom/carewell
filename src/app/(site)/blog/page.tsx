import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { Eyebrow } from "@/components/site/section";
import { CtaStrip } from "@/components/site/cta-strip";
import { BlogExplorer, type BlogCardData } from "@/components/site/blog/blog-explorer";
import { categoryGradients } from "@/components/site/blog/category-style";
import { blogPosts, blogCategories } from "@/lib/data/blog";
import { cn, formatDate, initials } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dental Health Blog — Honest Guides from Practicing Dentists | CareWell",
  description:
    "100+ plain-language articles on implants, braces, kids' dentistry, smile design and everyday oral health — written by the clinicians at CareWell Dental Clinic, Dwarka.",
  openGraph: {
    title: "CareWell Dental Blog",
    description:
      "Honest, plain-language dental guides written by practicing clinicians in Dwarka, New Delhi.",
    type: "website",
  },
};

export default function BlogIndexPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  const cards: BlogCardData[] = rest.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    author: p.author,
    publishedAt: p.publishedAt,
    readMins: p.readMins,
    emoji: p.emoji,
  }));

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" />

        <div className="relative mx-auto w-full max-w-6xl px-5 pt-14 sm:px-8 md:pt-20">
          {/* Heading */}
          <Reveal className="max-w-2xl">
            <Eyebrow>The CareWell Journal</Eyebrow>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-ink-900 md:text-5xl">
              Dentistry, explained <span className="text-gradient">without the jargon</span>
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-ink-500 md:text-lg">
              {blogPosts.length} honest guides written by our clinicians — real costs, real
              timelines, and the occasional myth given a proper burial.
            </p>
          </Reveal>

          {/* Featured post — big split card */}
          <Reveal delay={0.1} className="mt-10">
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-3xl bg-white ring-hairline shadow-soft transition-all duration-300 hover:shadow-lift md:grid-cols-2"
            >
              {/* Visual half */}
              <div
                className={cn(
                  "relative flex min-h-56 items-center justify-center bg-gradient-to-br md:min-h-full",
                  categoryGradients[featured.category] ?? "from-brand-400 to-brand-600"
                )}
              >
                <span className="text-8xl drop-shadow transition-transform duration-500 group-hover:scale-110 md:text-9xl">
                  {featured.emoji}
                </span>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_55%)]" />
                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-900 backdrop-blur">
                  Featured guide
                </span>
              </div>

              {/* Text half */}
              <div className="flex flex-col justify-center p-7 md:p-10">
                <div className="flex items-center gap-3">
                  <Badge>{featured.category}</Badge>
                  <span className="tnum inline-flex items-center gap-1 text-xs text-ink-400">
                    <Clock className="size-3" /> {featured.readMins} min read
                  </span>
                </div>
                <h2 className="mt-4 text-balance text-2xl font-semibold leading-snug tracking-tight text-ink-900 transition-colors group-hover:text-brand-700 md:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-pretty text-[15px] leading-relaxed text-ink-500">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-800">
                      {initials(featured.author)}
                    </span>
                    <div>
                      <p className="text-[13px] font-medium text-ink-900">{featured.author}</p>
                      <p className="text-xs text-ink-400">{formatDate(featured.publishedAt)}</p>
                    </div>
                  </div>
                  <Button variant="soft" size="sm" className="pointer-events-none hidden sm:inline-flex">
                    Read article <ArrowRight />
                  </Button>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>

      {/* Explorer: chips + grid + load more */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-20 pt-12 sm:px-8 md:pb-24 md:pt-16">
        <BlogExplorer posts={cards} categories={[...blogCategories]} />
      </section>

      <CtaStrip
        title="Reading is free. So is our second opinion."
        text="Bring any question from these articles to a consultation — we'll give you an honest answer, even if it's 'you don't need treatment'."
      />
    </>
  );
}
