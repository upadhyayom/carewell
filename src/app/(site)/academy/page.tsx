import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  CalendarDays,
  Clock,
  MapPin,
  Quote,
  Stethoscope,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Section, SectionHeading, Eyebrow } from "@/components/site/section";
import { AcademyLeadForm } from "@/components/site/academy/lead-form";
import { academyStats, courses, featuredCourses } from "@/lib/data/courses";
import { doctors, staff } from "@/lib/data/people";
import { inr, initials } from "@/lib/utils";
import type { Course } from "@/lib/data/types";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "CareWell Academy — Learn Dentistry from Practicing Clinicians | Dwarka",
  description:
    "Dental assistant training, implant courses, clinical internships and CE workshops at CareWell Academy, Dwarka. 480+ graduates, 92% placement, small batches, real chairside training.",
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const levelBadge: Record<Course["level"], "good" | "blue" | "violet"> = {
  Beginner: "good",
  Intermediate: "blue",
  Advanced: "violet",
};

const stats: { value: number; suffix: string; label: string; decimals?: number }[] = [
  { value: academyStats.graduates, suffix: "+", label: "Graduates trained" },
  { value: academyStats.placementRate, suffix: "%", label: "Placement rate" },
  { value: academyStats.batchesCompleted, suffix: "", label: "Batches completed" },
  { value: academyStats.avgRating, suffix: " ★", label: "Student rating", decimals: 1 },
];

const whyCards = [
  {
    icon: Stethoscope,
    title: "Real chairside training",
    text: "You learn inside a working NABH-accredited clinic — live patients, live procedures, not just models and slides.",
  },
  {
    icon: Users,
    title: "Small batches, real attention",
    text: "6 to 20 seats per batch, never more. Every student operates, assists and gets corrected by name.",
  },
  {
    icon: Award,
    title: "Verified certification",
    text: "Certificates backed by countersigned procedure logs and clinical hours — what employers actually check.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Placement support",
    text: "A placement cell wired into 40+ partner clinics across NCR. 92% of recent batches placed within six weeks.",
  },
];

const studentQuotes = [
  {
    quote:
      "I joined with zero medical background — 12th pass, working at a retail store. Three months later I was assisting implant surgeries, and CareWell's placement cell got me a job before my certificate was even printed.",
    name: "Ritika Yadav",
    detail: "Dental Assistant Program · placed at a partner clinic, Dwarka",
  },
  {
    quote:
      "Every implant course I looked at ended with a pig jaw. Here I placed five implants on real patients with Dr. Mehta standing next to me. I started implants in my own practice the following month.",
    name: "Dr. Karthik Rajan",
    detail: "Advanced Implant Course · practice owner, Chennai",
  },
  {
    quote:
      "The internship rebuilt my confidence after BDS. Presenting my own cases to two senior clinicians every week was intense — and exactly what college never gave me. My logbook got me my associateship.",
    name: "Dr. Sruthi Pillai",
    detail: "Clinical Internship Program · associate dentist, Delhi",
  },
];

const academyFaqs = [
  {
    q: "Who is eligible to join CareWell Academy courses?",
    a: "It depends on the track. Assistant and front-desk programs need only a 12th-pass qualification in any stream — no science background required. Clinical and CE courses (implants, endodontics, aligners) are open to registered dental practitioners with BDS/MDS and valid DCI registration. Each course page lists its exact eligibility.",
  },
  {
    q: "Are the certificates recognised by employers?",
    a: "Every program ends with a Certificate of Completion from CareWell Academy, and clinical programs add a countersigned log of your supervised procedures and hours. For non-licensed roles like dental assisting, this documented hands-on record is what hiring clinics verify — and our graduates' 92% placement rate reflects how seriously it is taken.",
  },
  {
    q: "Can I pay fees in instalments or EMI?",
    a: "Yes. Most programs split into 2–3 instalments, and no-cost EMI over 3 or 6 months is available via Razorpay on all fees. Larger clinical courses reserve your seat with a booking amount, with the balance due before the batch starts. GST invoices are provided for practitioners.",
  },
  {
    q: "What are the batch timings? I work / study full-time.",
    a: "Full-time programs run weekday mornings-to-afternoons. Weekend and hybrid options exist for working professionals — the Reception & Practice Management course runs on weekday evenings online plus Saturday practicals, and several workshops are single-day Sunday formats. Check the schedule on each course page.",
  },
  {
    q: "How does placement support actually work?",
    a: "In the final month, our placement cell runs mock interviews, polishes your logbook and CV, and matches you with openings across 40+ partner clinics in Dwarka, New Delhi, Delhi and Noida. Top performers are frequently absorbed at CareWell itself. Placement support continues for six months after you graduate.",
  },
];

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function FeaturedCourseCard({ course }: { course: Course }) {
  const seatsLeft = course.seats - course.enrolled;
  return (
    <div className="group relative flex h-full flex-col rounded-2xl bg-white p-6 ring-hairline shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="flex items-center justify-between gap-3">
        <Badge variant={levelBadge[course.level]}>{course.level}</Badge>
        <span
          className={
            seatsLeft <= 2
              ? "text-xs font-semibold text-orange-600"
              : "text-xs font-medium text-ink-400"
          }
        >
          {seatsLeft} seat{seatsLeft === 1 ? "" : "s"} left
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-ink-900 transition-colors group-hover:text-violet-700">
        {course.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-500">{course.tagline}</p>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-ink-500">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-3.5 text-violet-500" /> {course.duration}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="size-3.5 text-violet-500" /> {course.mode}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="size-3.5 text-violet-500" /> {course.nextBatch}
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-ink-100 pt-4">
        <div>
          <p className="tnum text-lg font-semibold text-ink-900">{inr(course.fee)}</p>
          <p className="text-[11px] text-ink-400">EMI available</p>
        </div>
        <Button size="sm" className="bg-violet-600 hover:bg-violet-700" asChild>
          <Link href={`/academy/${course.slug}`}>
            Apply <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}

function CourseRow({ course }: { course: Course }) {
  return (
    <Link
      href={`/academy/${course.slug}`}
      className="group grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl px-4 py-3.5 transition-colors hover:bg-violet-50/60 sm:grid-cols-[minmax(0,1.8fr)_repeat(3,minmax(0,0.7fr))_auto]"
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-ink-900 group-hover:text-violet-700">
          {course.name}
        </p>
        <p className="mt-0.5 text-xs text-ink-400 sm:hidden">
          {course.duration} · {inr(course.fee)} · {course.nextBatch}
        </p>
      </div>
      <span className="hidden text-[13px] text-ink-500 sm:block">{course.duration}</span>
      <span className="tnum hidden text-[13px] font-medium text-ink-700 sm:block">
        {inr(course.fee)}
      </span>
      <span className="hidden text-[13px] text-ink-500 sm:block">{course.nextBatch}</span>
      <ArrowRight className="size-4 shrink-0 text-ink-300 transition-all group-hover:translate-x-0.5 group-hover:text-violet-600" />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function AcademyPage() {
  const otherCourses = courses.slice(5);
  const levels: Course["level"][] = ["Beginner", "Intermediate", "Advanced"];
  const faculty = [
    ...doctors.map((d) => ({
      name: d.name,
      role: d.role,
      detail: d.qualifications,
      note: `${d.experienceYears} yrs experience · ${d.casesCompleted.toLocaleString("en-IN")} cases`,
      tint: "bg-violet-100 text-violet-800",
    })),
    {
      name: staff[0].name,
      role: "Practice Management Faculty",
      detail: `Practice Manager at CareWell since ${staff[0].since}`,
      note: staff[0].bio,
      tint: "bg-brand-100 text-brand-800",
    },
  ];

  return (
    <>
      {/* ------------------------------------------------------------ */}
      {/* Hero — distinct sub-brand feel                                */}
      {/* ------------------------------------------------------------ */}
      <section className="relative overflow-hidden px-5 pb-16 pt-16 sm:px-8 md:pb-24 md:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-dots [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(139,92,246,0.16), rgba(13,148,136,0.10), transparent)",
          }}
        />
        <div className="relative mx-auto w-full max-w-6xl">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow className="bg-violet-50 text-violet-700 ring-violet-600/10 [&>span]:bg-violet-500">
              CareWell Academy
            </Eyebrow>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-ink-900 md:text-6xl">
              Learn dentistry from people who{" "}
              <span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-brand-600 bg-clip-text text-transparent">
                practice it every day
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-ink-500 md:text-lg">
              The training wing of CareWell Dental Clinic — assistant programs, implant
              mentorships, internships and CE workshops, taught chairside inside a working
              NABH-accredited practice in Dwarka, New Delhi.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700" asChild>
                <a href="#courses">Browse courses</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#enquire">Talk to admissions</a>
              </Button>
            </div>
          </Reveal>

          {/* Stats */}
          <Stagger className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="rounded-2xl bg-white/80 px-5 py-6 text-center ring-hairline shadow-soft backdrop-blur">
                  <p className="tnum text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">
                    <CountUp to={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                  </p>
                  <p className="mt-1.5 text-[13px] text-ink-500">{s.label}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Featured courses                                              */}
      {/* ------------------------------------------------------------ */}
      <Section id="courses" className="pt-4 md:pt-8">
        <SectionHeading
          eyebrow="Flagship programs"
          title="Five programs. Zero passive learning."
          lead="Every flagship program is built around supervised, hands-on work — because a certificate means nothing without the hours behind it."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((c) => (
            <StaggerItem key={c.slug} className="h-full">
              <FeaturedCourseCard course={c} />
            </StaggerItem>
          ))}
          {/* Filler card to complete the grid */}
          <StaggerItem className="h-full">
            <div className="flex h-full flex-col justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 p-6 text-white shadow-soft">
              <p className="text-2xl">🎓</p>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">
                Not sure which program fits?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Tell us your background — 12th pass, working assistant, or BDS/MDS — and our
                admissions team will map the right track for you.
              </p>
              <Button size="sm" className="mt-5 w-fit bg-white text-violet-800 hover:bg-violet-50" asChild>
                <a href="#enquire">
                  Get guidance <ArrowRight />
                </a>
              </Button>
            </div>
          </StaggerItem>
        </Stagger>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* Why learn here                                                */}
      {/* ------------------------------------------------------------ */}
      <Section className="pt-0 md:pt-0">
        <SectionHeading
          eyebrow="Why learn here"
          title="A clinic first, a classroom second"
          lead="Most academies teach in rented seminar halls. You will train where the actual dentistry happens."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyCards.map((w) => (
            <StaggerItem key={w.title} className="h-full">
              <div className="h-full rounded-2xl bg-white p-6 ring-hairline shadow-soft transition-shadow hover:shadow-lift">
                <div className="flex size-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-600/10">
                  <w.icon className="size-5" />
                </div>
                <h3 className="mt-4 text-[15px] font-semibold text-ink-900">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{w.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* All courses                                                   */}
      {/* ------------------------------------------------------------ */}
      <Section className="pt-0 md:pt-0">
        <SectionHeading
          eyebrow="CE workshops & short courses"
          title={`${otherCourses.length} more ways to level up`}
          lead="Single-day workshops, weekend intensives and refreshers — for clinic teams and practitioners who want one specific skill, fast."
        />
        <Reveal>
          <Tabs defaultValue="All">
            <TabsList className="flex-wrap">
              <TabsTrigger value="All">All</TabsTrigger>
              {levels.map((l) => (
                <TabsTrigger key={l} value={l}>
                  {l}
                </TabsTrigger>
              ))}
            </TabsList>

            {["All", ...levels].map((tab) => {
              const list =
                tab === "All" ? otherCourses : otherCourses.filter((c) => c.level === tab);
              return (
                <TabsContent key={tab} value={tab}>
                  <div className="overflow-hidden rounded-2xl bg-white ring-hairline shadow-soft">
                    <div className="hidden grid-cols-[minmax(0,1.8fr)_repeat(3,minmax(0,0.7fr))_auto] gap-3 border-b border-ink-100 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-400 sm:grid">
                      <span>Course</span>
                      <span>Duration</span>
                      <span>Fee</span>
                      <span>Next batch</span>
                      <span />
                    </div>
                    <div className="divide-y divide-ink-50">
                      {list.map((c) => (
                        <CourseRow key={c.slug} course={c} />
                      ))}
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* Faculty                                                       */}
      {/* ------------------------------------------------------------ */}
      <Section className="pt-0 md:pt-0">
        <SectionHeading
          eyebrow="Faculty"
          title="Taught by the people who treat"
          lead="Your instructors run the clinic downstairs. What they teach in the morning, they practise in the afternoon."
        />
        <Stagger className="grid gap-5 md:grid-cols-3">
          {faculty.map((f) => (
            <StaggerItem key={f.name} className="h-full">
              <div className="flex h-full flex-col rounded-2xl bg-white p-6 ring-hairline shadow-soft">
                <div className="flex items-center gap-4">
                  <span
                    className={`flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${f.tint}`}
                  >
                    {initials(f.name)}
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-ink-900">{f.name}</p>
                    <p className="text-[13px] text-violet-700">{f.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-[13px] font-medium text-ink-700">{f.detail}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-500">{f.note}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* Student quotes                                                */}
      {/* ------------------------------------------------------------ */}
      <Section className="pt-0 md:pt-0">
        <SectionHeading
          eyebrow="Alumni voices"
          title="What graduates say a year later"
        />
        <Stagger className="grid gap-5 md:grid-cols-3">
          {studentQuotes.map((q) => (
            <StaggerItem key={q.name} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl bg-gradient-to-b from-violet-50/70 to-white p-6 ring-hairline shadow-soft">
                <Quote className="size-5 text-violet-400" />
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-700">
                  {q.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-violet-100 pt-4">
                  <p className="text-sm font-semibold text-ink-900">{q.name}</p>
                  <p className="mt-0.5 text-xs text-ink-500">{q.detail}</p>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* FAQs                                                          */}
      {/* ------------------------------------------------------------ */}
      <Section className="pt-0 md:pt-0">
        <div className="grid gap-10 lg:grid-cols-[2fr_3fr]">
          <SectionHeading
            eyebrow="Questions"
            title="Before you apply"
            lead="The five questions our admissions desk answers every single day."
            className="mb-0"
          />
          <Reveal>
            <div className="rounded-2xl bg-white px-6 ring-hairline shadow-soft">
              <Accordion type="single" collapsible>
                {academyFaqs.map((f, i) => (
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
      {/* Lead-form CTA band                                            */}
      {/* ------------------------------------------------------------ */}
      <section id="enquire" className="px-5 pb-16 sm:px-8 md:pb-24">
        <Reveal className="mx-auto w-full max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-indigo-700 to-ink-900 px-6 py-12 md:px-14 md:py-14">
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(560px 280px at 15% 0%, rgba(167,139,250,0.5), transparent 60%), radial-gradient(480px 240px at 90% 100%, rgba(13,148,136,0.45), transparent 60%)",
              }}
            />
            <div className="relative">
              <div className="max-w-2xl">
                <h2 className="text-balance text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  Get the batch calendar & fee guide
                </h2>
                <p className="mt-2 text-pretty text-[15px] leading-relaxed text-white/70">
                  Drop your details and our admissions team will WhatsApp you the brochure, EMI
                  options and the next available batch for your course.
                </p>
              </div>
              <div className="mt-7">
                <AcademyLeadForm courseNames={featuredCourses.map((c) => c.name)} />
              </div>
              <p className="mt-5 text-xs text-white/50">
                No spam, no cold calls — one counsellor, one conversation.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
