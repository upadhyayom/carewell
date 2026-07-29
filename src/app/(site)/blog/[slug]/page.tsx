import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight, Clock, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion";
import { CtaStrip } from "@/components/site/cta-strip";
import { ShareRow } from "@/components/site/blog/share-row";
import { categoryGradients } from "@/components/site/blog/category-style";
import { blogPosts, findPost, relatedPosts } from "@/lib/data/blog";
import { cn, formatDate, initials } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Static params & metadata                                            */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return { title: "Article not found | CareWell Blog" };
  return {
    title: `${post.title} | CareWell Blog`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

/* ------------------------------------------------------------------ */
/* Author bios                                                         */
/* ------------------------------------------------------------------ */

const authorBios: Record<string, string> = {
  "Dr. Smriti Sharma":
    "Founder of CareWell Dental Clinic and an implantologist with 16 years of surgical practice and 3,000+ implants placed. She writes the way she consults: unhurried, evidence-first, and honest about what you don't need.",
  "Dr. Anuj":
    "Orthodontist, smile design specialist and Invisalign Platinum Provider with 1,200+ aligner cases. When he isn't straightening teeth, he's photographing them — most before-afters on this site are his.",
};

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();

  const related = relatedPosts(post.slug, 3);
  const calloutAfter = Math.max(1, Math.ceil(post.content.length / 2)) - 1;

  return (
    <>
      <article className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-dots [mask-image:linear-gradient(to_bottom,black,transparent)]" />

        <div className="relative mx-auto w-full max-w-3xl px-5 pb-16 pt-12 sm:px-8 md:pb-20 md:pt-16">
          {/* Breadcrumb */}
          <Reveal>
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[13px] text-ink-400">
              <Link href="/blog" className="transition-colors hover:text-brand-700">
                Blog
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="font-medium text-ink-700">{post.category}</span>
            </nav>
          </Reveal>

          {/* Header */}
          <Reveal delay={0.05}>
            <div className="mt-6 flex items-center gap-3">
              <Badge>{post.category}</Badge>
              <span className="tnum inline-flex items-center gap-1 text-xs text-ink-400">
                <Clock className="size-3" /> {post.readMins} min read
              </span>
            </div>
            <h1 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-ink-900 md:text-4xl">
              {post.title}
            </h1>

            {/* Byline */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-ink-100 py-4">
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-semibold text-white",
                    categoryGradients[post.category] ?? "from-brand-500 to-brand-700"
                  )}
                >
                  {initials(post.author)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink-900">{post.author}</p>
                  <p className="text-xs text-ink-500">
                    {post.authorRole}
                    <span className="mx-1.5 text-ink-300">·</span>
                    {formatDate(post.publishedAt)}
                  </p>
                </div>
              </div>
              <ShareRow slug={post.slug} title={post.title} />
            </div>
          </Reveal>

          {/* Body */}
          <Reveal delay={0.1}>
            <div className="mx-auto mt-8 max-w-prose">
              {post.content.map((section, i) => (
                <div key={i}>
                  {section.heading && (
                    <h2 className="mt-10 text-xl font-semibold tracking-tight text-ink-900 md:text-2xl">
                      {section.heading}
                    </h2>
                  )}
                  {section.paragraphs.map((p, j) => (
                    <p
                      key={j}
                      className={cn(
                        "mt-5 text-pretty text-[16px] leading-relaxed text-ink-700",
                        i === 0 &&
                          j === 0 &&
                          "first-letter:float-left first-letter:mr-2 first-letter:text-5xl first-letter:font-semibold first-letter:leading-[0.9] first-letter:text-brand-700"
                      )}
                    >
                      {p}
                    </p>
                  ))}

                  {/* Key takeaway — mid-article */}
                  {i === calloutAfter && (
                    <aside className="my-10 rounded-2xl bg-brand-50 p-6 ring-1 ring-inset ring-brand-600/10">
                      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
                        <Lightbulb className="size-4" /> Key takeaway
                      </p>
                      <p className="mt-3 text-pretty text-[15px] font-medium leading-relaxed text-brand-900">
                        {post.excerpt}
                      </p>
                      <p className="mt-3 text-[13px] text-brand-800/70">
                        Unsure how this applies to you? A ten-minute consultation settles it —
                        honestly, and sometimes with “you don’t need treatment”.
                      </p>
                    </aside>
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Tags */}
          <div className="mx-auto mt-10 flex max-w-prose flex-wrap gap-2">
            {post.tags.map((t) => (
              <Badge key={t} variant="outline" className="capitalize">
                {t}
              </Badge>
            ))}
          </div>

          {/* Author bio card */}
          <Reveal className="mx-auto mt-10 max-w-prose">
            <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 ring-hairline shadow-soft sm:flex-row sm:items-start">
              <span
                className={cn(
                  "flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-lg font-semibold text-white",
                  categoryGradients[post.category] ?? "from-brand-500 to-brand-700"
                )}
              >
                {initials(post.author)}
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400">
                  Written by
                </p>
                <p className="mt-1 text-[15px] font-semibold text-ink-900">{post.author}</p>
                <p className="text-[13px] text-brand-700">{post.authorRole}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {authorBios[post.author] ??
                    "Part of the clinical team at CareWell Dental Clinic, Dwarka."}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 md:pb-20">
          <Reveal>
            <h2 className="text-xl font-semibold tracking-tight text-ink-900 md:text-2xl">
              More on {post.category}
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.06} className="h-full">
                <Link
                  href={`/blog/${r.slug}`}
                  className="group flex h-full flex-col rounded-2xl bg-white p-5 ring-hairline shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <div
                    className={cn(
                      "flex h-20 items-center justify-center rounded-xl bg-gradient-to-br",
                      categoryGradients[r.category] ?? "from-brand-400 to-brand-600"
                    )}
                  >
                    <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                      {r.emoji}
                    </span>
                  </div>
                  <h3 className="mt-4 line-clamp-2 text-sm font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-700">
                    {r.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between pt-3 text-xs text-ink-400">
                    <span>{formatDate(r.publishedAt)}</span>
                    <span className="tnum inline-flex items-center gap-1">
                      {r.readMins} min
                      <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <CtaStrip
        title="Questions this article didn't answer?"
        text="Bring them to a consultation — written estimate, honest advice, and no pressure to decide in the chair."
      />
    </>
  );
}
