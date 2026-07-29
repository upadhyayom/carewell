import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Award,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  IndianRupee,
  MapPin,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Section, SectionHeading } from "@/components/site/section";
import { CourseApplyForm } from "@/components/site/academy/apply-form";
import { courses, findCourse } from "@/lib/data/courses";
import { doctors, staff } from "@/lib/data/people";
import { inr, initials } from "@/lib/utils";
import type { Course } from "@/lib/data/types";

/* ------------------------------------------------------------------ */
/* Static params & metadata                                            */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = findCourse(slug);
  if (!course) return { title: "Course not found | CareWell Academy" };
  return {
    title: `${course.name} | CareWell Academy, Dwarka`,
    description: `${course.tagline}. ${course.duration}, ${course.mode.toLowerCase()}, fee ${inr(
      course.fee
    )}. Next batch ${course.nextBatch} at CareWell Academy, Dwarka.`,
  };
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const levelBadge: Record<Course["level"], "good" | "blue" | "violet"> = {
  Beginner: "good",
  Intermediate: "blue",
  Advanced: "violet",
};

function facultyCard(name: string) {
  const doc = doctors.find((d) => d.name === name);
  if (doc) {
    return {
      name: doc.name,
      role: doc.role,
      note: `${doc.qualifications} · ${doc.experienceYears} yrs experience`,
      tint: "bg-violet-100 text-violet-800",
    };
  }
  const st = staff.find((s) => s.name === name);
  return {
    name,
    role: st ? `${st.role} · CareWell` : "CareWell Academy Faculty",
    note: st ? st.bio : "Core academy faculty and student mentor.",
    tint: "bg-brand-100 text-brand-800",
  };
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = findCourse(slug);
  if (!course) notFound();

  const seatsLeft = course.seats - course.enrolled;
  const related = courses
    .filter((c) => c.slug !== course.slug && c.level === course.level)
    .slice(0, 3);
  const relatedFinal = related.length
    ? related
    : courses.filter((c) => c.slug !== course.slug).slice(0, 3);

  const keyFacts = [
    { icon: Clock, label: "Duration", value: course.duration },
    { icon: IndianRupee, label: "Fee", value: inr(course.fee) },
    { icon: CalendarDays, label: "Next batch", value: course.nextBatch },
    {
      icon: Users,
      label: "Seats",
      value: `${seatsLeft} of ${course.seats} left`,
    },
  ];

  return (
    <>
      {/* ------------------------------------------------------------ */}
      {/* Hero                                                          */}
      {/* ------------------------------------------------------------ */}
      <section className="relative overflow-hidden px-5 pb-12 pt-10 sm:px-8 md:pb-16 md:pt-14">
        <div className="pointer-events-none absolute inset-0 bg-dots [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
        <div
          className="pointer-events-none absolute -top-24 right-[-8%] h-80 w-[520px] rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(139,92,246,0.18), transparent)" }}
        />
        <div className="relative mx-auto w-full max-w-6xl">
          {/* Breadcrumb */}
          <Reveal>
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[13px] text-ink-400">
              <Link href="/academy" className="transition-colors hover:text-violet-700">
                CareWell Academy
              </Link>
              <ChevronRight className="size-3.5" />
              <Link href="/academy#courses" className="transition-colors hover:text-violet-700">
                Courses
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="font-medium text-ink-700">{course.name}</span>
            </nav>
          </Reveal>

          <Reveal delay={0.05} className="mt-7 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={levelBadge[course.level]}>{course.level}</Badge>
              <Badge variant="secondary">
                <MapPin /> {course.mode}
              </Badge>
              {seatsLeft <= 3 && (
                <Badge variant="serious">Only {seatsLeft} seats left</Badge>
              )}
            </div>
            <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink-900 md:text-5xl">
              {course.name}
            </h1>
            <p className="mt-3 text-pretty text-base leading-relaxed text-ink-500 md:text-lg">
              {course.tagline}
            </p>
            <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700" asChild>
                <a href="#apply">
                  Apply now <ArrowRight />
                </a>
              </Button>
              <p className="text-[13px] text-ink-400">
                Free counselling call · no-cost EMI available
              </p>
            </div>
          </Reveal>

          {/* Key facts */}
          <Stagger className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {keyFacts.map((f) => (
              <StaggerItem key={f.label}>
                <div className="flex items-center gap-3.5 rounded-2xl bg-white px-5 py-4 ring-hairline shadow-soft">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                    <f.icon className="size-4.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                      {f.label}
                    </p>
                    <p className="tnum truncate text-[15px] font-semibold text-ink-900">{f.value}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Overview + Outcomes                                           */}
      {/* ------------------------------------------------------------ */}
      <Section className="pt-4 md:pt-6">
        <div className="grid gap-10 lg:grid-cols-[7fr_5fr] lg:gap-14">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-ink-900 md:text-3xl">
              About this program
            </h2>
            <div className="mt-5 space-y-4">
              {course.overview.map((p, i) => (
                <p key={i} className="text-pretty text-[15px] leading-relaxed text-ink-700">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-2xl bg-gradient-to-b from-violet-50/80 to-white p-6 ring-hairline shadow-soft lg:sticky lg:top-24">
              <h3 className="text-[15px] font-semibold text-ink-900">
                What you will walk out with
              </h3>
              <ul className="mt-4 space-y-3">
                {course.outcomes.map((o) => (
                  <li key={o} className="flex gap-2.5 text-sm leading-relaxed text-ink-700">
                    <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                      <Check className="size-3" />
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* Curriculum                                                    */}
      {/* ------------------------------------------------------------ */}
      <Section className="pt-0 md:pt-0">
        <SectionHeading
          eyebrow="Curriculum"
          title="Module by module"
          lead="Expand each module to see exactly what is covered — no vague syllabus lines, no filler."
        />
        <Reveal>
          <div className="rounded-2xl bg-white px-6 ring-hairline shadow-soft">
            <Accordion type="single" collapsible defaultValue="mod-0">
              {course.curriculum.map((m, i) => (
                <AccordionItem key={m.module} value={`mod-${i}`}>
                  <AccordionTrigger>
                    <span className="flex items-center gap-3">
                      <span className="tnum flex size-7 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-xs font-semibold text-violet-700">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {m.module}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2.5 pl-10">
                      {m.topics.map((t) => (
                        <li key={t} className="flex gap-2.5 text-sm leading-relaxed text-ink-500">
                          <span className="mt-2 size-1 shrink-0 rounded-full bg-violet-400" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* Faculty + Certification                                       */}
      {/* ------------------------------------------------------------ */}
      <Section className="pt-0 md:pt-0">
        <div className="grid gap-5 lg:grid-cols-[3fr_2fr]">
          <div>
            <SectionHeading eyebrow="Faculty" title="Who teaches this course" className="mb-6 md:mb-8" />
            <Stagger className="grid gap-4 sm:grid-cols-2">
              {course.faculty.map((name) => {
                const f = facultyCard(name);
                return (
                  <StaggerItem key={name} className="h-full">
                    <div className="flex h-full items-start gap-4 rounded-2xl bg-white p-5 ring-hairline shadow-soft">
                      <span
                        className={`flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${f.tint}`}
                      >
                        {initials(f.name)}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-ink-900">{f.name}</p>
                        <p className="mt-0.5 text-xs text-violet-700">{f.role}</p>
                        <p className="mt-1.5 text-xs leading-relaxed text-ink-500">{f.note}</p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>

          {/* Certification card */}
          <div>
            <SectionHeading eyebrow="Certification" title="What you earn" className="mb-6 md:mb-8" />
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-violet-200 bg-gradient-to-b from-white to-violet-50/50 p-6 shadow-soft">
                <div className="absolute right-4 top-4 text-violet-100">
                  <Award className="size-16" strokeWidth={1} />
                </div>
                <div className="relative">
                  <div className="flex size-11 items-center justify-center rounded-full bg-violet-600 text-white shadow-soft">
                    <Award className="size-5" />
                  </div>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-600">
                    CareWell Academy · Dwarka
                  </p>
                  <p className="mt-2 text-[15px] font-semibold leading-snug text-ink-900">
                    {course.certification}
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-ink-500">
                    Issued after attendance and final assessment. Verifiable on request by any
                    employer or institution.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* FAQs                                                          */}
      {/* ------------------------------------------------------------ */}
      <Section className="pt-0 md:pt-0">
        <div className="grid gap-10 lg:grid-cols-[2fr_3fr]">
          <SectionHeading
            eyebrow="FAQs"
            title="Common questions"
            lead="Everything applicants ask before joining this program."
            className="mb-0"
          />
          <Reveal>
            <div className="rounded-2xl bg-white px-6 ring-hairline shadow-soft">
              <Accordion type="single" collapsible>
                {course.faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`faq-${i}`}>
                    <AccordionTrigger>{f.q}</AccordionTrigger>
                    <AccordionContent>{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* Apply form                                                    */}
      {/* ------------------------------------------------------------ */}
      <Section id="apply" className="pt-0 md:pt-0">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Apply"
            title={`Apply for the ${course.nextBatch} batch`}
            lead={`${seatsLeft} seat${seatsLeft === 1 ? "" : "s"} remaining · fee ${inr(course.fee)} with EMI options · applying is free and non-binding.`}
            center
          />
          <Reveal>
            <div className="overflow-hidden rounded-3xl bg-white ring-hairline shadow-lift">
              <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 via-indigo-500 to-brand-500" />
              <CourseApplyForm
                courseSlug={course.slug}
                courseName={course.name}
                nextBatch={course.nextBatch}
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* Related courses                                               */}
      {/* ------------------------------------------------------------ */}
      <Section className="pt-0 md:pt-0">
        <SectionHeading eyebrow="Keep exploring" title="Related programs" />
        <Stagger className="grid gap-5 md:grid-cols-3">
          {relatedFinal.map((c) => (
            <StaggerItem key={c.slug} className="h-full">
              <Link
                href={`/academy/${c.slug}`}
                className="group flex h-full flex-col rounded-2xl bg-white p-6 ring-hairline shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex items-center justify-between gap-3">
                  <Badge variant={levelBadge[c.level]}>{c.level}</Badge>
                  <span className="text-xs text-ink-400">{c.duration}</span>
                </div>
                <h3 className="mt-3.5 text-[15px] font-semibold leading-snug text-ink-900 transition-colors group-hover:text-violet-700">
                  {c.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink-500">
                  {c.tagline}
                </p>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="tnum text-sm font-semibold text-ink-900">{inr(c.fee)}</span>
                  <span className="inline-flex items-center gap-1 text-[13px] font-medium text-violet-700">
                    View course
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
