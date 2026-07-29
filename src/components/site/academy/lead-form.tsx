"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { GraduationCap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

interface LeadValues {
  name: string;
  phone: string;
  course: string;
}

export function AcademyLeadForm({ courseNames }: { courseNames: string[] }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadValues>({ defaultValues: { name: "", phone: "", course: "" } });

  const [done, setDone] = React.useState<LeadValues | null>(null);

  const onSubmit = async (values: LeadValues) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    setDone(values);
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-3 rounded-2xl bg-white/10 px-6 py-5 text-center ring-1 ring-inset ring-white/15 sm:flex-row sm:text-left"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
          <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden>
            <path d="M5 10.5 8.5 14 15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div>
          <p className="text-sm font-semibold text-white">
            Thanks, {done.name.split(" ")[0]} — brochure on its way!
          </p>
          <p className="mt-0.5 text-[13px] text-white/60">
            Our admissions team will WhatsApp you on +91 {done.phone} about{" "}
            <span className="text-white/85">{done.course}</span> within a few hours.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid gap-3 sm:grid-cols-[1fr_1fr_1.3fr_auto]"
    >
      <div>
        <Input
          placeholder="Your name"
          aria-label="Your name"
          aria-invalid={!!errors.name}
          className="h-11 border-transparent bg-white/95"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="mt-1 text-xs font-medium text-red-300">{errors.name.message}</p>}
      </div>
      <div>
        <Input
          type="tel"
          inputMode="numeric"
          placeholder="10-digit phone"
          aria-label="Phone number"
          aria-invalid={!!errors.phone}
          className="h-11 border-transparent bg-white/95"
          {...register("phone", {
            required: "Phone is required",
            pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit number" },
          })}
        />
        {errors.phone && <p className="mt-1 text-xs font-medium text-red-300">{errors.phone.message}</p>}
      </div>
      <div>
        <Select
          aria-label="Course of interest"
          aria-invalid={!!errors.course}
          className="h-11 border-transparent bg-white/95"
          {...register("course", { required: "Pick a course" })}
        >
          <option value="">Course of interest…</option>
          {courseNames.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet — guide me</option>
        </Select>
        {errors.course && <p className="mt-1 text-xs font-medium text-red-300">{errors.course.message}</p>}
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="h-11 bg-white text-violet-900 hover:bg-violet-50"
      >
        {isSubmitting ? <Loader2 className="animate-spin" /> : <GraduationCap />}
        {isSubmitting ? "Sending…" : "Get brochure"}
      </Button>
    </form>
  );
}
