"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, ShieldCheck, Stethoscope, ConciergeBell, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/lib/auth";
import type { Role } from "@/lib/data/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const roles: { role: Role; label: string; name: string; icon: React.ElementType; desc: string }[] = [
  { role: "admin", label: "Admin", name: "Priya Sharma", icon: ShieldCheck, desc: "Full access — dashboards, marketing, settings" },
  { role: "doctor", label: "Doctor", name: "Dr. Smriti Sharma", icon: Stethoscope, desc: "Clinical view — schedule, patients, consents" },
  { role: "receptionist", label: "Reception", name: "Amit Verma", icon: ConciergeBell, desc: "Front desk — queue, billing, leads" },
];

export default function LoginPage() {
  const { login, user, ready } = useAuth();
  const router = useRouter();
  const [role, setRole] = React.useState<Role>("admin");
  const [password, setPassword] = React.useState("carewell");
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (ready && user) router.replace(user.role === "doctor" ? "/admin/doctor" : "/admin/reception");
  }, [ready, user, router]);

  const selected = roles.find((r) => r.role === role)!;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(role);
      router.push(role === "doctor" ? "/admin/doctor" : "/admin/reception");
    }, 650);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left — brand panel */}
      <div className="relative hidden overflow-hidden bg-ink-900 lg:block">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(800px 500px at 10% 10%, rgba(13,148,136,0.4), transparent 55%), radial-gradient(700px 500px at 90% 90%, rgba(42,120,214,0.28), transparent 55%)",
          }}
        />
        <div className="bg-grid absolute inset-0 opacity-20" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur">
              <svg viewBox="0 0 24 24" fill="none" className="size-5">
                <path d="M12 3c-2.2 0-2.9 1.2-4.6 1.2C5.2 4.2 3.5 6 3.5 8.6c0 4.6 2.3 9.3 4 11.2.5.6 1.5.4 1.8-.4l1.3-4.1c.4-1.2 2.4-1.2 2.8 0l1.3 4.1c.3.8 1.3 1 1.8.4 1.7-1.9 4-6.6 4-11.2 0-2.6-1.7-4.4-3.9-4.4-1.7 0-2.4-1.2-4.6-1.2Z" fill="currentColor" />
              </svg>
            </span>
            <span className="text-white">
              <span className="block text-[15px] font-semibold leading-tight">CareWell</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-300">Dental Clinic</span>
            </span>
          </div>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-md text-balance text-3xl font-semibold leading-tight tracking-tight text-white"
            >
              Every patient, every rupee, every lead — one dashboard.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 grid max-w-md grid-cols-3 gap-3"
            >
              {[
                { v: "₹8.9L", l: "Revenue this month" },
                { v: "342", l: "Leads in 30 days" },
                { v: "4.4×", l: "Marketing ROI" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-white/[0.07] p-4 ring-1 ring-inset ring-white/10 backdrop-blur">
                  <div className="text-xl font-semibold text-white tnum">{s.v}</div>
                  <div className="mt-1 text-[11px] leading-snug text-white/50">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <p className="text-xs text-white/40">© 2026 CareWell Dental Clinic · Secure staff access only</p>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center bg-[#f4f7f6] px-5 py-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-600/10">
              <Lock className="size-3" /> Secure Staff Login
            </span>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink-900">Welcome back</h2>
            <p className="mt-1 text-sm text-ink-500">Choose your role to enter the workspace. This demo uses role-based access.</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {roles.map((r) => (
              <button
                key={r.role}
                type="button"
                onClick={() => setRole(r.role)}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-2xl border p-3.5 text-center transition-all",
                  role === r.role
                    ? "border-brand-600 bg-white shadow-soft ring-1 ring-brand-600"
                    : "border-ink-200 bg-white/60 hover:border-ink-300 hover:bg-white"
                )}
              >
                <r.icon className={cn("size-5", role === r.role ? "text-brand-600" : "text-ink-400")} />
                <span className={cn("text-[13px] font-semibold", role === r.role ? "text-ink-900" : "text-ink-500")}>{r.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4 rounded-2xl bg-white p-6 shadow-soft ring-hairline">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" readOnly value={`${selected.name.toLowerCase().replace(/[^a-z]+/g, ".").replace(/^\.|\.$/g, "")}@carewell.clinic`} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              <p className="text-[11.5px] text-ink-400">{selected.desc}</p>
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={loading || !password}>
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Signing in…
                </span>
              ) : (
                <>
                  Sign in as {selected.label} <ArrowRight />
                </>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-ink-400">
            Demo credentials are pre-filled — just press sign in.{" "}
            <Link href="/" className="font-medium text-brand-700 hover:underline">
              ← Back to website
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
