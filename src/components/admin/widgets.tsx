"use client";

import * as React from "react";
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

/** KPI stat tile — value is primary ink (never series color), delta uses status colors with arrow icon. */
export function StatCard({
  label,
  value,
  delta,
  deltaLabel = "vs last month",
  icon: Icon,
  deltaPositiveIsGood = true,
  className,
}: {
  label: string;
  value: string;
  delta?: number; // percentage
  deltaLabel?: string;
  icon?: LucideIcon;
  deltaPositiveIsGood?: boolean;
  className?: string;
}) {
  const good = delta !== undefined && (deltaPositiveIsGood ? delta >= 0 : delta < 0);
  return (
    <Card className={cn("p-5", className)}>
      <div className="flex items-start justify-between">
        <span className="text-[12.5px] font-medium text-ink-400">{label}</span>
        {Icon && (
          <span className="flex size-8 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
            <Icon className="size-4" />
          </span>
        )}
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-ink-900 tnum">{value}</div>
      {delta !== undefined && (
        <div className="mt-1.5 flex items-center gap-1.5 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-semibold",
              good ? "text-[#006300]" : "text-critical"
            )}
          >
            {delta >= 0 ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
            {Math.abs(delta).toFixed(1)}%
          </span>
          <span className="text-ink-400">{deltaLabel}</span>
        </div>
      )}
    </Card>
  );
}

export function PageHeader({
  title,
  description,
  actions,
  className,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 flex flex-wrap items-end justify-between gap-3", className)}>
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-ink-900 md:text-2xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-ink-500">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function ChartCard({
  title,
  subtitle,
  right,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("p-5", className)}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[14.5px] font-semibold text-ink-900">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-ink-400">{subtitle}</p>}
        </div>
        {right}
      </div>
      {children}
    </Card>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  text,
  action,
}: {
  icon: LucideIcon;
  title: string;
  text?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-200 px-6 py-14 text-center">
      <span className="flex size-11 items-center justify-center rounded-xl bg-ink-50 text-ink-400">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-4 text-[15px] font-semibold text-ink-900">{title}</h3>
      {text && <p className="mt-1 max-w-sm text-sm text-ink-400">{text}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
