"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles, Copy, Check, RefreshCw, CalendarPlus, Save, Clapperboard, Image as ImageIcon,
  CalendarClock, Wand2, Hash, Megaphone,
} from "lucide-react";
import { PageHeader } from "@/components/admin/widgets";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { aiTemplates, festivals, type AiTemplate } from "@/lib/data/social";
import { treatmentNames } from "@/lib/data/treatments";
import { cn } from "@/lib/utils";

const CONTENT_TYPES = [
  "Reel", "Carousel", "Story", "Educational Post", "Testimonial",
  "Festival Post", "Awareness Campaign", "Offer Campaign",
] as const;
type ContentType = (typeof CONTENT_TYPES)[number];

const TONES = ["Warm & reassuring", "Expert & authoritative", "Playful & upbeat", "Festive & celebratory"];

/** Deterministic mapping: content type → base index into aiTemplates (8 templates). */
const typeToTemplate: Record<ContentType, number> = {
  Reel: 0, // Reel — Testimonial
  Carousel: 1, // Carousel — Testimonial
  Story: 6, // Story — Behind the Scenes
  "Educational Post": 3, // Post — Educational (Kids)
  Testimonial: 0,
  "Festival Post": 4, // Post — Festival
  "Awareness Campaign": 5, // Reel — Educational (myth-buster)
  "Offer Campaign": 2, // Post — Offer
};

const ideaStarters: { label: string; type: ContentType; topic: string; tone: string; occasion: string }[] = [
  { label: "Implant testimonial reel", type: "Reel", topic: "Dental Implants", tone: TONES[0], occasion: "None" },
  { label: "Diwali mithai guide", type: "Festival Post", topic: "Teeth Whitening", tone: TONES[3], occasion: "Diwali" },
  { label: "Root canal myth-buster", type: "Awareness Campaign", topic: "Root Canal Treatment", tone: TONES[1], occasion: "None" },
  { label: "Shaadi-season whitening offer", type: "Offer Campaign", topic: "Teeth Whitening", tone: TONES[2], occasion: "None" },
];

const recentGenerations = [
  { title: "Kids' 6-year molar carousel", type: "Carousel · Educational", when: "Today, 10:12 AM" },
  { title: "Sterilisation BTS story pack", type: "Story · Behind the Scenes", when: "Yesterday, 4:40 PM" },
  { title: "Aligner FAQ rapid-fire", type: "Story · Educational", when: "17 Jul, 12:05 PM" },
];

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-7 text-xs"
      onClick={() => {
        navigator.clipboard?.writeText(text).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
    >
      {copied ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
      {copied ? "Copied" : label}
    </Button>
  );
}

export default function AiAssistantPage() {
  const [contentType, setContentType] = React.useState<ContentType>("Reel");
  const [topic, setTopic] = React.useState(treatmentNames[0]);
  const [tone, setTone] = React.useState(TONES[0]);
  const [occasion, setOccasion] = React.useState("None");

  const [phase, setPhase] = React.useState<"idle" | "loading" | "done">("idle");
  const [variant, setVariant] = React.useState(0);
  const [savedDraft, setSavedDraft] = React.useState(false);

  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  React.useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const generate = (nextVariant = 0) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase("loading");
    setSavedDraft(false);
    setVariant(nextVariant);
    timerRef.current = setTimeout(() => setPhase("done"), 1200);
  };

  const template: AiTemplate = aiTemplates[(typeToTemplate[contentType] + variant) % aiTemplates.length];
  const scenes = template.videoScript?.split("\n").filter(Boolean) ?? [];

  return (
    <div>
      <PageHeader
        title="AI Content Assistant"
        description="Brief the studio, get a post-ready draft — captions, hashtags, visuals and scripts."
      />

      {/* Idea starters */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-ink-400">Idea starters</span>
        {ideaStarters.map((s) => (
          <button
            key={s.label}
            onClick={() => {
              setContentType(s.type);
              if (treatmentNames.includes(s.topic)) setTopic(s.topic);
              setTone(s.tone);
              setOccasion(s.occasion);
              setPhase("idle");
              setVariant(0);
            }}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-ink-700 ring-hairline transition-all hover:bg-brand-50 hover:text-brand-800 hover:shadow-soft"
          >
            <Wand2 className="size-3 text-brand-600" />
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
        {/* ---------------- Brief panel ---------------- */}
        <Card className="h-fit p-5">
          <h3 className="flex items-center gap-2 text-[14.5px] font-semibold text-ink-900">
            <Sparkles className="size-4 text-brand-600" /> Brief
          </h3>
          <p className="mt-0.5 text-xs text-ink-400">Tell the studio what you need</p>

          <div className="mt-4 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="ai-type">Content type</Label>
              <Select
                id="ai-type"
                value={contentType}
                onChange={(e) => {
                  setContentType(e.target.value as ContentType);
                  setPhase("idle");
                  setVariant(0);
                }}
              >
                {CONTENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ai-topic">Topic / treatment</Label>
              <Select id="ai-topic" value={topic} onChange={(e) => setTopic(e.target.value)}>
                {treatmentNames.map((t) => <option key={t} value={t}>{t}</option>)}
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ai-tone">Tone</Label>
              <Select id="ai-tone" value={tone} onChange={(e) => setTone(e.target.value)}>
                {TONES.map((t) => <option key={t} value={t}>{t}</option>)}
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ai-occasion">Occasion</Label>
              <Select id="ai-occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)}>
                <option value="None">None — evergreen</option>
                {festivals.map((f) => <option key={f.date} value={f.name}>{f.name}</option>)}
              </Select>
            </div>
            <Button className="w-full" onClick={() => generate(0)} disabled={phase === "loading"}>
              <Sparkles /> {phase === "loading" ? "Generating…" : "Generate"}
            </Button>
          </div>

          {/* Recent generations */}
          <div className="mt-6 border-t border-ink-100 pt-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-400">Recent generations</p>
            <div className="mt-2.5 space-y-2">
              {recentGenerations.map((r) => (
                <div key={r.title} className="rounded-xl border border-ink-100 px-3 py-2.5">
                  <p className="text-[12.5px] font-medium text-ink-900">{r.title}</p>
                  <p className="mt-0.5 text-[11px] text-ink-400">{r.type} · <span className="tnum">{r.when}</span></p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* ---------------- Result panel ---------------- */}
        <div className="min-w-0">
          {phase === "idle" && (
            <Card className="flex min-h-[420px] flex-col items-center justify-center p-8 text-center">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-blue-50 text-brand-600 ring-hairline">
                <Sparkles className="size-6" />
              </span>
              <h3 className="mt-4 text-[15px] font-semibold text-ink-900">Your studio is ready</h3>
              <p className="mt-1 max-w-sm text-sm text-ink-400">
                Set the brief on the left — or tap an idea starter — and generate a complete,
                post-ready content pack for {topic}.
              </p>
            </Card>
          )}

          {phase === "loading" && (
            <Card className="p-6">
              <div className="flex items-center gap-2 text-sm font-medium text-brand-700">
                <span className="size-4 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
                Drafting your {contentType.toLowerCase()}…
              </div>
              <div className="mt-5 space-y-3">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-24 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-28" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            </Card>
          )}

          {phase === "done" && (
            <div className="space-y-4">
              <Card className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Badge>{template.type}</Badge>
                    <h3 className="mt-2 text-[16px] font-semibold tracking-tight text-ink-900">{template.title}</h3>
                    <p className="mt-0.5 text-xs text-ink-400">
                      Brief: {contentType} · {topic} · {tone}{occasion !== "None" ? ` · ${occasion}` : ""}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1.5">
                    <Button asChild variant="secondary" size="sm">
                      <Link href="/admin/social"><CalendarPlus className="size-3.5" /> Add to calendar</Link>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => generate(variant + 1)}>
                      <RefreshCw className="size-3.5" /> Regenerate
                    </Button>
                    <Button
                      variant={savedDraft ? "soft" : "ghost"}
                      size="sm"
                      onClick={() => setSavedDraft(true)}
                    >
                      {savedDraft ? <Check className="size-3.5" /> : <Save className="size-3.5" />}
                      {savedDraft ? "Saved" : "Save draft"}
                    </Button>
                  </div>
                </div>

                {/* Caption */}
                <div className="mt-4 rounded-xl border border-ink-100 bg-ink-50/40 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                      <Megaphone className="size-3.5" /> Caption
                    </span>
                    <CopyButton text={template.caption} />
                  </div>
                  <p className="whitespace-pre-line text-[13.5px] leading-relaxed text-ink-800">{template.caption}</p>
                </div>

                {/* Hashtags */}
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                      <Hash className="size-3.5" /> Hashtags
                    </span>
                    <CopyButton text={template.hashtags.join(" ")} label="Copy all" />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {template.hashtags.map((h) => (
                      <Badge key={h} variant="blue">{h}</Badge>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-brand-50 px-4 py-3">
                  <p className="text-[13px] font-medium text-brand-800">
                    <span className="mr-1.5 text-[10px] font-bold uppercase tracking-wide text-brand-600">CTA</span>
                    {template.cta}
                  </p>
                  <CopyButton text={template.cta} />
                </div>
              </Card>

              <div className={cn("grid gap-4", template.videoScript ? "lg:grid-cols-2" : "")}>
                {/* Image prompt */}
                <Card className="p-5">
                  <div className="mb-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                      <ImageIcon className="size-3.5" /> Image prompt
                    </span>
                    <CopyButton text={template.imagePrompt} />
                  </div>
                  <p className="rounded-xl bg-ink-900 p-4 font-mono text-[12px] leading-relaxed text-emerald-200">
                    {template.imagePrompt}
                  </p>
                </Card>

                {/* Video script */}
                {template.videoScript && (
                  <Card className="p-5">
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                      <Clapperboard className="size-3.5" /> Video script
                    </span>
                    <ol className="mt-3 space-y-2.5">
                      {scenes.map((scene, i) => {
                        const [head, ...rest] = scene.split(": ");
                        return (
                          <li key={i} className="flex gap-2.5">
                            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[10.5px] font-bold text-brand-700 tnum">
                              {i + 1}
                            </span>
                            <p className="text-[12.5px] leading-relaxed text-ink-700">
                              <span className="font-semibold text-ink-900">{head}:</span> {rest.join(": ")}
                            </p>
                          </li>
                        );
                      })}
                    </ol>
                  </Card>
                )}
              </div>

              {/* Posting schedule */}
              <Card className="p-5">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-400">
                  <CalendarClock className="size-3.5" /> Suggested posting schedule
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Best day: Thursday",
                    "Prime slot: 7:30 PM IST",
                    "Alt slot: Saturday 11:00 AM",
                    "Boost window: first 45 min",
                    "Cross-post to Facebook +1 day",
                  ].map((chip) => (
                    <span key={chip} className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-ink-700 ring-hairline">
                      {chip}
                    </span>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
