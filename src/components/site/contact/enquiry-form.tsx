"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface EnquiryValues {
  name: string;
  phone: string;
  message: string;
}

export function EnquiryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryValues>({ defaultValues: { name: "", phone: "", message: "" } });

  const [done, setDone] = React.useState<EnquiryValues | null>(null);

  const onSubmit = async (values: EnquiryValues) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    setDone(values);
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-3 py-6 text-center"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-600/15">
          <svg viewBox="0 0 20 20" className="size-6" fill="none" aria-hidden>
            <path d="M5 10.5 8.5 14 15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div>
          <p className="text-sm font-semibold text-ink-900">
            Message sent — thanks, {done.name.split(" ")[0]}!
          </p>
          <p className="mx-auto mt-1 max-w-xs text-[13px] leading-relaxed text-ink-500">
            Our front desk will call or WhatsApp you on +91 {done.phone} within clinic hours —
            usually inside the hour.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="eq-name">Name</Label>
          <Input
            id="eq-name"
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-xs font-medium text-red-500">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="eq-phone">Phone</Label>
          <Input
            id="eq-phone"
            type="tel"
            inputMode="numeric"
            placeholder="10-digit mobile"
            aria-invalid={!!errors.phone}
            {...register("phone", {
              required: "Phone is required",
              pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit number" },
            })}
          />
          {errors.phone && (
            <p className="text-xs font-medium text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="eq-message">Message</Label>
        <Textarea
          id="eq-message"
          placeholder="What would you like to ask us?"
          className="min-h-[80px]"
          aria-invalid={!!errors.message}
          {...register("message", {
            required: "Tell us what you'd like to ask",
            minLength: { value: 10, message: "A few more words will help us help you" },
          })}
        />
        {errors.message && (
          <p className="text-xs font-medium text-red-500">{errors.message.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send /> Send enquiry
          </>
        )}
      </Button>
    </form>
  );
}
