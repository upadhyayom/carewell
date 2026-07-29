"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Loader2, MessageCircle, PhoneCall, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { clinic } from "@/lib/data/clinic";

interface ApplyValues {
  name: string;
  phone: string;
  email: string;
  city: string;
  motivation: string;
}

/** Deterministic application ID from phone + course slug (no randomness). */
function applicationId(phone: string, courseSlug: string): string {
  const input = `${phone}|${courseSlug}`;
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h = ((h ^ input.charCodeAt(i)) * 16777619) >>> 0;
  }
  const alphabet = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
  let code = "";
  let v = h;
  for (let i = 0; i < 5; i++) {
    code += alphabet[v % alphabet.length];
    v = Math.floor(v / alphabet.length) + ((h >> (i * 4)) & 15);
  }
  return `CW-ACD-${code}`;
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

export function CourseApplyForm({
  courseSlug,
  courseName,
  nextBatch,
}: {
  courseSlug: string;
  courseName: string;
  nextBatch: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplyValues>({
    defaultValues: { name: "", phone: "", email: "", city: "", motivation: "" },
  });

  const [done, setDone] = React.useState<ApplyValues | null>(null);

  const onSubmit = async (values: ApplyValues) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    setDone(values);
  };

  if (done) {
    const appId = applicationId(done.phone, courseSlug);
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="p-6 text-center sm:p-8"
      >
        <motion.svg
          viewBox="0 0 64 64"
          className="mx-auto size-14 text-violet-600"
          initial="hidden"
          animate="visible"
          aria-hidden
        >
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: { pathLength: 1, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
            }}
          />
          <motion.path
            d="M20 33.5 28.5 42 45 25"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: { pathLength: 1, opacity: 1, transition: { duration: 0.45, delay: 0.45, ease: "easeOut" } },
            }}
          />
        </motion.svg>

        <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink-900">
          Application received
        </h3>
        <p className="mt-1 text-sm text-ink-500">Your application ID</p>
        <p className="tnum mx-auto mt-1.5 inline-block rounded-lg bg-violet-50 px-3 py-1 font-mono text-lg font-semibold tracking-wider text-violet-700">
          {appId}
        </p>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ink-500">
          Thanks, {done.name.split(" ")[0]} — you have applied for{" "}
          <span className="font-medium text-ink-900">{courseName}</span> ({nextBatch} batch). Our
          admissions counsellor will call +91 {done.phone} within one working day to discuss
          eligibility, fees and next steps.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="whatsapp" asChild>
            <a href={clinic.whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle /> WhatsApp admissions
            </a>
          </Button>
          <Button variant="ghost" asChild>
            <a href={`tel:${clinic.phone}`}>
              <PhoneCall /> {clinic.phone}
            </a>
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="ap-name" error={errors.name?.message}>
          <Input
            id="ap-name"
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name", {
              required: "Please enter your name",
              minLength: { value: 2, message: "Name looks too short" },
            })}
          />
        </Field>

        <Field label="Phone" htmlFor="ap-phone" error={errors.phone?.message}>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-sm text-ink-400">
              +91
            </span>
            <Input
              id="ap-phone"
              type="tel"
              inputMode="numeric"
              placeholder="98XXXXXXXX"
              className="pl-12"
              aria-invalid={!!errors.phone}
              {...register("phone", {
                required: "Phone is required",
                pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit mobile number" },
              })}
            />
          </div>
        </Field>

        <Field label="Email" htmlFor="ap-email" error={errors.email?.message}>
          <Input
            id="ap-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: "That email doesn't look right" },
            })}
          />
        </Field>

        <Field label="City" htmlFor="ap-city" error={errors.city?.message}>
          <Input
            id="ap-city"
            placeholder="e.g. Dwarka"
            autoComplete="address-level2"
            aria-invalid={!!errors.city}
            {...register("city", { required: "Which city are you from?" })}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field
            label="Why this course?"
            htmlFor="ap-motivation"
            error={errors.motivation?.message}
          >
            <Textarea
              id="ap-motivation"
              placeholder="A line or two about your background and what you want from the course…"
              aria-invalid={!!errors.motivation}
              {...register("motivation", {
                required: "Tell us a little about your motivation",
                minLength: { value: 20, message: "Give us at least a sentence (20+ characters)" },
              })}
            />
          </Field>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="mt-7 w-full bg-violet-600 hover:bg-violet-700"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" /> Submitting application…
          </>
        ) : (
          <>
            <Send /> Submit application
          </>
        )}
      </Button>
      <p className="mt-4 text-center text-xs leading-relaxed text-ink-400">
        Applying is free and non-binding. Seats are confirmed only after counselling and fee
        payment.
      </p>
    </form>
  );
}
