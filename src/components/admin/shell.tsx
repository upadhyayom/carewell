"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Users, HeartPulse, Stethoscope, ConciergeBell, Megaphone,
  FileSignature, BarChart3, Settings,
  Search, Bell, LogOut, Menu, X, ExternalLink, type LucideIcon,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import type { Role } from "@/lib/data/types";
import { cn, initials, formatDateTime } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { notifications } from "@/lib/data/ops";
import { patients, doctors } from "@/lib/data/people";
import { todayAppointments } from "@/lib/data/appointments";
import { consentForms } from "@/lib/data/consents";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  roles: Role[];
  group: string;
}

const navItems: NavItem[] = [
  { label: "Reception", href: "/admin/reception", icon: ConciergeBell, roles: ["admin", "receptionist"], group: "Daily Work" },
  { label: "My Day", href: "/admin/doctor", icon: Stethoscope, roles: ["admin", "doctor"], group: "Daily Work" },
  { label: "Enquiries & Leads", href: "/admin/leads", icon: Users, roles: ["admin", "receptionist"], group: "Daily Work" },
  { label: "Marketing", href: "/admin/marketing", icon: Megaphone, roles: ["admin"], group: "Growth" },
  { label: "Patients", href: "/admin/patients", icon: HeartPulse, roles: ["admin", "doctor", "receptionist"], group: "Records" },
  { label: "Consent Forms", href: "/admin/consent-forms", icon: FileSignature, roles: ["admin", "doctor", "receptionist"], group: "Records" },
  { label: "Reports", href: "/admin/reports", icon: BarChart3, roles: ["admin", "doctor"], group: "System" },
  { label: "Settings", href: "/admin/settings", icon: Settings, roles: ["admin"], group: "System" },
];

/* ---------------- Global search (Cmd+K) ---------------- */

interface SearchHit {
  type: string;
  title: string;
  sub: string;
  href: string;
}

function useSearchIndex(): SearchHit[] {
  return React.useMemo(() => {
    const hits: SearchHit[] = [];
    patients.forEach((p) =>
      hits.push({ type: "Patient", title: p.name, sub: `${p.id} · ${p.phone}`, href: `/admin/patients/${p.id}` })
    );
    doctors.forEach((d) =>
      hits.push({ type: "Doctor", title: d.name, sub: d.role, href: "/admin/doctor" })
    );
    todayAppointments.forEach((a) =>
      hits.push({ type: "Appointment", title: `${a.patientName} — ${a.treatment}`, sub: `${a.id} · Today ${a.time}`, href: "/admin/reception" })
    );
    consentForms.slice(0, 40).forEach((c) =>
      hits.push({ type: "Consent", title: `${c.treatment} — ${c.patientName}`, sub: c.id, href: "/admin/consent-forms" })
    );
    patients.flatMap((p) => p.invoices.map((inv) => ({ p, inv }))).forEach(({ p, inv }) =>
      hits.push({ type: "Invoice", title: `${inv.id} — ${p.name}`, sub: `₹${inv.amount.toLocaleString("en-IN")} · ${inv.status}`, href: `/admin/patients/${p.id}` })
    );
    return hits;
  }, []);
}

function GlobalSearch({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [q, setQ] = React.useState("");
  const index = useSearchIndex();
  const router = useRouter();

  const results = React.useMemo(() => {
    if (q.trim().length < 2) return [];
    const t = q.toLowerCase();
    return index.filter((h) => `${h.type} ${h.title} ${h.sub}`.toLowerCase().includes(t)).slice(0, 9);
  }, [q, index]);

  React.useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[20%] max-w-xl translate-y-0 gap-0 p-0">
        <DialogTitle className="sr-only">Global search</DialogTitle>
        <div className="flex items-center gap-2.5 border-b border-ink-100 px-4">
          <Search className="size-4 text-ink-400" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search patients, appointments, consents, invoices…"
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-ink-400"
          />
          <kbd className="hidden rounded-md bg-ink-50 px-1.5 py-0.5 text-[10px] font-medium text-ink-400 sm:block">ESC</kbd>
        </div>
        <div className="max-h-80 overflow-y-auto p-2 scroll-thin">
          {q.trim().length < 2 ? (
            <p className="px-3 py-8 text-center text-sm text-ink-400">
              Type at least 2 characters — try a patient name, invoice or consent ID.
            </p>
          ) : results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-ink-400">No results for “{q}”.</p>
          ) : (
            results.map((r, i) => (
              <button
                key={i}
                onClick={() => {
                  onOpenChange(false);
                  router.push(r.href);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-ink-50"
              >
                <Badge variant="secondary" className="w-24 justify-center shrink-0">{r.type}</Badge>
                <span className="min-w-0">
                  <span className="block truncate text-[13.5px] font-medium text-ink-900">{r.title}</span>
                  <span className="block truncate text-xs text-ink-400">{r.sub}</span>
                </span>
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- Notifications ---------------- */

const notifTint: Record<string, string> = {
  appointment: "bg-brand-50 text-brand-700",
  birthday: "bg-violet-50 text-violet-700",
  review: "bg-amber-50 text-amber-700",
  missed: "bg-red-50 text-red-700",
  payment: "bg-blue-50 text-blue-700",
  course: "bg-emerald-50 text-emerald-700",
};

function NotificationsMenu() {
  const unread = notifications.filter((n) => !n.read).length;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative flex size-9 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-50 hover:text-ink-900" aria-label="Notifications">
          <Bell className="size-4.5" />
          {unread > 0 && (
            <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-critical text-[9px] font-bold text-white">
              {unread}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm font-semibold text-ink-900">Notifications</span>
          <Badge variant="secondary">{unread} new</Badge>
        </div>
        <DropdownMenuSeparator className="mx-0 my-0" />
        <div className="max-h-96 overflow-y-auto scroll-thin">
          {notifications.map((n) => (
            <div key={n.id} className={cn("flex gap-3 px-4 py-3 transition-colors hover:bg-ink-50", !n.read && "bg-brand-50/40")}>
              <span className={cn("mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold", notifTint[n.type])}>
                {n.type === "appointment" ? "📅" : n.type === "birthday" ? "🎂" : n.type === "review" ? "⭐" : n.type === "missed" ? "⚠️" : n.type === "payment" ? "₹" : "🎓"}
              </span>
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-ink-900">{n.title}</p>
                <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-ink-500">{n.text}</p>
                <p className="mt-1 text-[11px] text-ink-300">{formatDateTime(n.at)}</p>
              </div>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ---------------- Shell ---------------- */

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, ready, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    if (ready && !user) router.replace("/admin/login");
  }, [ready, user, router]);

  React.useEffect(() => setMobileOpen(false), [pathname]);

  if (!ready || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-50">
        <div className="flex flex-col items-center gap-3">
          <span className="size-8 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
          <span className="text-sm text-ink-400">Loading workspace…</span>
        </div>
      </div>
    );
  }

  const visible = navItems.filter((n) => n.roles.includes(user.role));
  const groups = [...new Set(visible.map((n) => n.group))];

  const homeHref = user.role === "doctor" ? "/admin/doctor" : "/admin/reception";

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2.5 px-5">
        <Link href={homeHref} className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-brand-800 text-white">
            <svg viewBox="0 0 24 24" fill="none" className="size-4.5">
              <path d="M12 3c-2.2 0-2.9 1.2-4.6 1.2C5.2 4.2 3.5 6 3.5 8.6c0 4.6 2.3 9.3 4 11.2.5.6 1.5.4 1.8-.4l1.3-4.1c.4-1.2 2.4-1.2 2.8 0l1.3 4.1c.3.8 1.3 1 1.8.4 1.7-1.9 4-6.6 4-11.2 0-2.6-1.7-4.4-3.9-4.4-1.7 0-2.4-1.2-4.6-1.2Z" fill="currentColor" fillOpacity="0.95" />
            </svg>
          </span>
          <span className="leading-none">
            <span className="block text-[14.5px] font-semibold tracking-tight text-ink-900">CareWell</span>
            <span className="block text-[9.5px] font-semibold uppercase tracking-[0.16em] text-brand-600">Dental Clinic</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4 scroll-thin">
        {groups.map((g) => (
          <div key={g} className="mt-4 first:mt-1">
            <p className="px-2.5 pb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-300">{g}</p>
            <div className="space-y-0.5">
              {visible.filter((n) => n.group === g).map((item) => {
                const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13.5px] font-medium transition-all",
                      active
                        ? "bg-white text-brand-800 shadow-soft ring-hairline"
                        : "text-ink-500 hover:bg-white/60 hover:text-ink-900"
                    )}
                  >
                    <item.icon className={cn("size-4", active ? "text-brand-600" : "text-ink-400 group-hover:text-ink-600")} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-ink-100 p-3">
        <Link href="/" target="_blank" className="flex items-center gap-2 rounded-xl px-2.5 py-2 text-[12.5px] text-ink-400 transition-colors hover:bg-white/60 hover:text-ink-700">
          <ExternalLink className="size-3.5" /> View public website
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#f4f7f6]">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 border-r border-ink-100 bg-[#f4f7f6] lg:block">
        {sidebar}
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink-900/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-[#f4f7f6] shadow-lift">
            <button className="absolute right-3 top-4 rounded-lg p-1.5 text-ink-400 hover:bg-white" onClick={() => setMobileOpen(false)}>
              <X className="size-4" />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col lg:pl-60">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-ink-100 bg-[#f4f7f6]/85 px-4 backdrop-blur-md sm:px-6">
          <button className="rounded-lg p-2 text-ink-500 hover:bg-white lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="size-5" />
          </button>

          <button
            onClick={() => setSearchOpen(true)}
            className="flex h-9 w-full max-w-sm items-center gap-2.5 rounded-full bg-white px-3.5 text-sm text-ink-400 ring-hairline transition-shadow hover:shadow-soft"
          >
            <Search className="size-4" />
            <span className="hidden sm:inline">Search anything…</span>
            <span className="sm:hidden">Search</span>
            <kbd className="ml-auto hidden rounded-md bg-ink-50 px-1.5 py-0.5 text-[10px] font-medium text-ink-400 sm:block">⌘K</kbd>
          </button>

          <div className="ml-auto flex items-center gap-1.5">
            <NotificationsMenu />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2.5 transition-colors hover:bg-white">
                  <Avatar className="size-8">
                    <AvatarFallback>{initials(user.name)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden text-left md:block">
                    <span className="block text-[13px] font-semibold leading-tight text-ink-900">{user.name}</span>
                    <span className="block text-[11px] capitalize leading-tight text-ink-400">{user.role}</span>
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <span className="block text-[13px] font-semibold text-ink-900">{user.name}</span>
                  <span className="block text-[11px] font-normal text-ink-400">{user.title}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { logout(); router.push("/admin/login"); }}>
                  <LogOut /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>

      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}
