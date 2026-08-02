import type { Metadata } from "next";
import { Heart, MessageCircle, Quote, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Section, SectionHeading, Eyebrow } from "@/components/site/section";
import { CtaStrip } from "@/components/site/cta-strip";
import { clinic } from "@/lib/data/clinic";
import { reviews, ratingSummary } from "@/lib/data/reviews";
import { socialPosts } from "@/lib/data/social";
import { treatments } from "@/lib/data/treatments";
import { cn, formatDate, initials } from "@/lib/utils";
import type { SocialPost } from "@/lib/data/types";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Smile Stories — Reviews, Transformations & Patient Voices | CareWell",
  description:
    "4.9-star rated by 1,284 patients on Google. Real reviews, before-and-after smile transformations, video testimonials and behind-the-scenes stories from CareWell Dental Clinic, Dwarka.",
};

/* ------------------------------------------------------------------ */
/* Static content                                                      */
/* ------------------------------------------------------------------ */

const pillarStyle: Record<SocialPost["pillar"], { emoji: string; gradient: string }> = {
  Educational: { emoji: "📚", gradient: "from-sky-400 via-blue-500 to-indigo-600" },
  Testimonial: { emoji: "💬", gradient: "from-emerald-400 via-teal-500 to-brand-700" },
  Awareness: { emoji: "🫶", gradient: "from-violet-400 via-purple-500 to-indigo-600" },
  Offer: { emoji: "🎁", gradient: "from-amber-300 via-orange-400 to-rose-500" },
  "Behind the Scenes": { emoji: "🎬", gradient: "from-pink-400 via-rose-500 to-fuchsia-600" },
  Festival: { emoji: "🪔", gradient: "from-orange-400 via-red-500 to-rose-600" },
};

const youtubeVideos = [
  {
    title: "Inside a Smile Makeover: Aditi's 6-Veneer Transformation, Start to Finish",
    views: "48K views",
    duration: "12:41",
    tint: "from-ink-900 via-[#3b1d4f] to-violet-900",
  },
  {
    title: "All-on-4 Explained by Dr. Smriti Sharma — Fixed Teeth in 3 Days",
    views: "126K views",
    duration: "9:18",
    tint: "from-ink-900 via-[#123a4a] to-brand-900",
  },
  {
    title: "We Asked 5 Patients to Rate Their Root Canal Pain (1–10)",
    views: "212K views",
    duration: "6:02",
    tint: "from-ink-900 via-[#4a1d1d] to-rose-950",
  },
];

const videoTestimonials = [
  {
    quote:
      "I flew in from London for full-mouth implants after quotes back home crossed £18,000. The same Straumann system, a third of the price, and honestly better follow-up care.",
    name: "Deepa Krishnamurthy",
    detail: "Full-mouth rehabilitation · NRI patient",
    emoji: "🎥",
  },
  {
    quote:
      "My daughter used to cry at the word 'dentist'. Two happy visits later she asks when we're going back. Whatever magic they do with kids, it works.",
    name: "Ashish Trivedi",
    detail: "Kids dentistry · father of two",
    emoji: "🎥",
  },
  {
    quote:
      "The mock-up sold me — I wore my future smile home for a day before agreeing to veneers. Six weeks later my wedding photos looked exactly like the preview.",
    name: "Nandini Rao",
    detail: "Smile makeover · bride, Dec 2025",
    emoji: "🎥",
  },
];

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex gap-0.5", className)} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={cn(
            "size-3.5",
            s <= rating ? "fill-amber-400 text-amber-400" : "fill-ink-100 text-ink-100"
          )}
        />
      ))}
    </div>
  );
}

function PlayGlyph({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-full bg-white/95 shadow-lift transition-transform duration-300 group-hover:scale-110",
        className
      )}
    >
      <svg viewBox="0 0 24 24" className="ml-0.5 size-[38%] text-ink-900" fill="currentColor" aria-hidden>
        <path d="M8 5.5v13l11-6.5-11-6.5Z" />
      </svg>
    </span>
  );
}

const sourceBadge: Record<string, "blue" | "good" | "warning"> = {
  Google: "blue",
  Practo: "good",
  JustDial: "warning",
};

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function SocialProofPage() {
  const wallReviews = reviews.slice(0, 15);
  const instaPosts = socialPosts
    .filter((p) => p.platform === "Instagram" && p.status === "Published")
    .slice(0, 9);
  const beforeAfters = treatments
    .flatMap((t) => t.beforeAfter.map((b) => ({ ...b, treatment: t.name, emoji: t.emoji })))
    .slice(0, 10);

  return (
    <>
      {/* ------------------------------------------------------------ */}
      {/* Hero — rating + distribution                                  */}
      {/* ------------------------------------------------------------ */}
      <section className="relative overflow-hidden px-5 pb-14 pt-16 sm:px-8 md:pb-20 md:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div
          className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[720px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(13,148,136,0.16), transparent)" }}
        />
        <div className="relative mx-auto w-full max-w-6xl">
          <div className="grid items-center gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
            <Reveal>
              <Eyebrow>Smile stories</Eyebrow>
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-ink-900 md:text-5xl">
                {clinic.stats.googleReviews.toLocaleString("en-IN")} patients said it{" "}
                <span className="text-gradient">better than we ever could</span>
              </h1>
              <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-ink-500 md:text-lg">
                Unfiltered reviews, real transformations and the occasional happy tear — collected
                from Google, Practo and our own chairs since 2012.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <a href={clinic.social.google} target="_blank" rel="noopener noreferrer">
                    Read us on Google
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#gallery">See transformations</a>
                </Button>
              </div>
            </Reveal>

            {/* Rating card */}
            <Reveal delay={0.12}>
              <div className="rounded-3xl bg-white p-7 ring-hairline shadow-lift">
                <div className="flex items-end gap-4">
                  <p className="tnum text-6xl font-semibold tracking-tight text-ink-900">
                    <CountUp to={ratingSummary.average} decimals={1} />
                  </p>
                  <div className="pb-1.5">
                    <Stars rating={5} />
                    <p className="tnum mt-1 text-xs text-ink-400">
                      {ratingSummary.total.toLocaleString("en-IN")} Google reviews
                    </p>
                  </div>
                </div>
                <div className="mt-6 space-y-2.5">
                  {ratingSummary.distribution.map((d) => (
                    <div key={d.stars} className="flex items-center gap-3">
                      <span className="tnum w-7 text-right text-xs font-medium text-ink-500">
                        {d.stars} ★
                      </span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500"
                          style={{ width: `${Math.max(d.pct, 1)}%` }}
                        />
                      </div>
                      <span className="tnum w-10 text-xs text-ink-400">{d.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Review wall — masonry                                          */}
      {/* ------------------------------------------------------------ */}
      <Section className="pt-2 md:pt-4">
        <SectionHeading
          eyebrow="The review wall"
          title="In their own words"
          lead="Fifteen recent reviews, exactly as patients wrote them — typos, emotion and all."
        />
        <Reveal>
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            {wallReviews.map((r) => (
              <figure
                key={r.id}
                className="break-inside-avoid rounded-2xl bg-white p-5 ring-hairline shadow-soft transition-shadow hover:shadow-lift"
              >
                <div className="flex items-center justify-between gap-3">
                  <Stars rating={r.rating} />
                  <Badge variant={sourceBadge[r.source] ?? "secondary"}>{r.source}</Badge>
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed text-ink-700">
                  {r.text}
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3 border-t border-ink-50 pt-3.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[11px] font-semibold text-brand-700">
                    {initials(r.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-semibold text-ink-900">{r.name}</p>
                    <p className="truncate text-xs text-ink-400">
                      {r.treatment} · {formatDate(r.date)}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* Instagram feed                                                 */}
      {/* ------------------------------------------------------------ */}
      <Section className="pt-0 md:pt-0">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
          <SectionHeading
            eyebrow="@carewell.dental"
            title="Life at the clinic, one post at a time"
            className="mb-0"
          />
          <Button variant="secondary" asChild>
            <a href={clinic.social.instagram} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
              </svg>
              Follow on Instagram
            </a>
          </Button>
        </div>

        <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
          {instaPosts.map((p) => {
            const style = pillarStyle[p.pillar];
            return (
              <StaggerItem key={p.id}>
                <a
                  href={clinic.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group relative flex aspect-square flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br p-4 text-white shadow-soft transition-transform duration-300 hover:-translate-y-1",
                    style.gradient
                  )}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(255,255,255,0.28),transparent_55%)]" />
                  <div className="relative flex items-start justify-between">
                    <span className="text-3xl drop-shadow-sm md:text-4xl">{style.emoji}</span>
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
                      {p.format}
                    </span>
                  </div>
                  <div className="relative">
                    <p className="line-clamp-2 text-[13px] font-semibold leading-snug drop-shadow-sm md:text-sm">
                      {p.title}
                    </p>
                    <div className="tnum mt-2 flex items-center gap-3 text-[11px] text-white/85">
                      <span className="inline-flex items-center gap-1">
                        <Heart className="size-3 fill-current" />
                        {(p.likes ?? 0).toLocaleString("en-IN")}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MessageCircle className="size-3" />
                        {(p.comments ?? 0).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-ink-900/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                    <span className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-ink-900">
                      View on Instagram ↗
                    </span>
                  </div>
                </a>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* YouTube                                                        */}
      {/* ------------------------------------------------------------ */}
      <Section className="pt-0 md:pt-0">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
          <SectionHeading
            eyebrow="CareWell on YouTube"
            title="Watch the work, not the ads"
            className="mb-0"
          />
          <Button variant="secondary" asChild>
            <a href={clinic.social.youtube} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" className="size-4 text-red-600" fill="currentColor" aria-hidden>
                <path d="M23.5 7.2a3 3 0 0 0-2.12-2.13C19.5 4.55 12 4.55 12 4.55s-7.5 0-9.38.52A3 3 0 0 0 .5 7.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 4.8 3 3 0 0 0 2.12 2.13c1.88.52 9.38.52 9.38.52s7.5 0 9.38-.52a3 3 0 0 0 2.12-2.13A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-4.8ZM9.6 15.3V8.7l6.27 3.3-6.27 3.3Z" />
              </svg>
              Subscribe
            </a>
          </Button>
        </div>

        <Stagger className="grid gap-5 md:grid-cols-3">
          {youtubeVideos.map((v) => (
            <StaggerItem key={v.title} className="h-full">
              <a
                href={clinic.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-hairline shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                {/* Thumbnail mock */}
                <div
                  className={cn(
                    "relative flex aspect-video items-center justify-center bg-gradient-to-br",
                    v.tint
                  )}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.14),transparent_55%)]" />
                  <PlayGlyph className="size-14" />
                  <span className="tnum absolute bottom-2.5 right-2.5 rounded-md bg-ink-900/80 px-1.5 py-0.5 text-[11px] font-medium text-white">
                    {v.duration}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-700">
                    {v.title}
                  </h3>
                  <p className="tnum mt-auto pt-2 text-xs text-ink-400">
                    CareWell Dental · {v.views}
                  </p>
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* Video testimonials                                             */}
      {/* ------------------------------------------------------------ */}
      <Section className="pt-0 md:pt-0">
        <SectionHeading
          eyebrow="On camera"
          title="Patients who said yes to the camera"
          lead="Three of the many patients who let us record their story — the full versions live on our YouTube channel."
        />
        <Stagger className="grid gap-5 md:grid-cols-3">
          {videoTestimonials.map((t) => (
            <StaggerItem key={t.name} className="h-full">
              <figure className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-ink-900 p-6 text-white shadow-soft">
                <div
                  className="pointer-events-none absolute inset-0 opacity-50"
                  style={{
                    background:
                      "radial-gradient(300px 200px at 85% 0%, rgba(13,148,136,0.4), transparent 60%)",
                  }}
                />
                <div className="relative flex items-center justify-between">
                  <Quote className="size-5 text-brand-400" />
                  <span className="text-xl">{t.emoji}</span>
                </div>
                <blockquote className="relative mt-4 flex-1 text-sm leading-relaxed text-white/85">
                  {t.quote}
                </blockquote>
                <figcaption className="relative mt-5 border-t border-white/10 pt-4">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="mt-0.5 text-xs text-white/55">{t.detail}</p>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* Smile gallery — horizontal snap scroll                         */}
      {/* ------------------------------------------------------------ */}
      <Section id="gallery" className="pt-0 md:pt-0">
        <SectionHeading
          eyebrow="Smile gallery"
          title="Before, after, and everything we planned in between"
          lead="A scroll through recent cases. Every transformation shown with the patient's written consent."
        />
        <Reveal>
          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 [scrollbar-width:thin]">
            {beforeAfters.map((b, i) => (
              <div
                key={`${b.treatment}-${i}`}
                className="w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl bg-white ring-hairline shadow-soft transition-shadow hover:shadow-lift sm:w-[320px]"
              >
                {/* Before/after split */}
                <div className="relative grid h-36 grid-cols-2">
                  <div className="relative flex items-center justify-center bg-gradient-to-br from-ink-200 to-ink-400">
                    <span className="text-3xl opacity-70 grayscale">{b.emoji}</span>
                    <span className="absolute left-2.5 top-2.5 rounded-full bg-ink-900/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                      Before
                    </span>
                  </div>
                  <div className="relative flex items-center justify-center bg-gradient-to-br from-brand-300 to-brand-600">
                    <span className="text-4xl drop-shadow-sm">{b.emoji}</span>
                    <span className="absolute right-2.5 top-2.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-800">
                      After
                    </span>
                  </div>
                  <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-white/90" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13px] font-semibold text-ink-900">{b.label}</p>
                    <Badge variant="secondary" className="shrink-0">
                      {b.treatment}
                    </Badge>
                  </div>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-ink-500">{b.note}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <CtaStrip
        title="Your smile story starts with one visit"
        text="Join 21,400+ patients who trusted us with their smiles — consultation first, honest plan always."
      />
    </>
  );
}
