"use client";

import * as React from "react";
import {
  Megaphone, Activity, BarChart3, Database, Mail, CheckCircle2, Circle,
  ExternalLink, RefreshCw, IndianRupee, MousePointerClick, Eye, Users,
} from "lucide-react";
import { PageHeader, StatCard, EmptyState } from "@/components/admin/widgets";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { inr } from "@/lib/utils";

interface Status {
  pixel: { connected: boolean; id: string };
  metaAds: {
    connected: boolean;
    insights:
      | { spend: number; impressions: number; clicks: number; ctr: number; cpc: number; leads: number; datePreset: string }
      | { error: string }
      | null;
  };
  ga: { connected: boolean; id: string | null };
  supabase: { connected: boolean };
  emailAlerts: { connected: boolean };
}

function ConnectionCard({
  icon: Icon, title, connected, detail, help, href,
}: {
  icon: React.ElementType;
  title: string;
  connected: boolean;
  detail: string;
  help: string;
  href?: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <Icon className="size-4.5" />
        </span>
        {connected ? (
          <Badge variant="good"><CheckCircle2 /> Connected</Badge>
        ) : (
          <Badge variant="secondary"><Circle /> Not connected</Badge>
        )}
      </div>
      <h3 className="mt-3 text-[14.5px] font-semibold text-ink-900">{title}</h3>
      <p className="mt-1 text-[12.5px] leading-relaxed text-ink-500">{connected ? detail : help}</p>
      {href && !connected && (
        <a href={href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand-700 hover:underline">
          Open setup <ExternalLink className="size-3" />
        </a>
      )}
    </Card>
  );
}

export default function MarketingPage() {
  const [status, setStatus] = React.useState<Status | null>(null);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(() => {
    setLoading(true);
    fetch("/api/marketing")
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => setStatus(null))
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(load, [load]);

  const insights =
    status?.metaAds.insights && !("error" in status.metaAds.insights) ? status.metaAds.insights : null;
  const insightsError =
    status?.metaAds.insights && "error" in status.metaAds.insights ? status.metaAds.insights.error : null;

  return (
    <div>
      <PageHeader
        title="Marketing & Tracking"
        description="Ad performance, visitor tracking and lead alerts — connected to real accounts."
        actions={
          <Button variant="secondary" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={loading ? "animate-spin" : ""} /> Refresh
          </Button>
        }
      />

      {/* Connections */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <ConnectionCard
          icon={Activity}
          title="Meta Pixel"
          connected={!!status?.pixel.connected}
          detail={`Pixel ${status?.pixel.id ?? ""} fires PageView, Lead & Schedule on every visit and booking.`}
          help="Pixel is built into the website."
        />
        <ConnectionCard
          icon={Megaphone}
          title="Meta Ads Performance"
          connected={!!status?.metaAds.connected}
          detail="Pulling live spend & results from your ad account (last 7 days)."
          help="Add META_ACCESS_TOKEN and META_AD_ACCOUNT_ID in Vercel env vars to see live ad spend & leads here."
          href="https://business.facebook.com/settings/system-users"
        />
        <ConnectionCard
          icon={BarChart3}
          title="Visitor Tracking (GA4)"
          connected={!!status?.ga.connected}
          detail={`Google Analytics ${status?.ga.id ?? ""} is tracking every visitor.`}
          help="Create a free GA4 property at analytics.google.com and add NEXT_PUBLIC_GA_ID in Vercel."
          href="https://analytics.google.com"
        />
        <ConnectionCard
          icon={Database}
          title="Central Lead Database"
          connected={!!status?.supabase.connected}
          detail="Every website lead & booking is stored in Supabase — visible on the Leads and Reception screens."
          help="Follow AUTOMATION.md step 2 (Supabase) so bookings are stored centrally."
          href="https://supabase.com"
        />
        <ConnectionCard
          icon={Mail}
          title="Instant Email Alerts"
          connected={!!status?.emailAlerts.connected}
          detail="The clinic inbox gets an email within seconds of every lead/booking."
          help="Follow AUTOMATION.md step 1 (Web3Forms key) for instant booking emails."
          href="https://web3forms.com"
        />
      </div>

      {/* Live Meta insights */}
      <div className="mt-8">
        <h2 className="mb-3 text-[15px] font-semibold text-ink-900">Meta Ads — last 7 days</h2>
        {insights ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            <StatCard label="Spend" value={inr(Math.round(insights.spend))} icon={IndianRupee} />
            <StatCard label="Impressions" value={insights.impressions.toLocaleString("en-IN")} icon={Eye} />
            <StatCard label="Clicks" value={insights.clicks.toLocaleString("en-IN")} icon={MousePointerClick} />
            <StatCard label="CTR" value={`${insights.ctr.toFixed(2)}%`} icon={Activity} />
            <StatCard label="CPC" value={inr(Number(insights.cpc.toFixed(2)))} icon={IndianRupee} />
            <StatCard label="Leads" value={String(insights.leads)} icon={Users} />
          </div>
        ) : insightsError ? (
          <Card className="p-5 text-sm text-ink-500">
            Meta API error: <span className="font-medium text-critical">{insightsError}</span> — check the token
            and ad account ID in Vercel env vars.
          </Card>
        ) : (
          <EmptyState
            icon={Megaphone}
            title="Connect your ad account to see live results"
            text="In Meta Business Settings create a System User token with ads_read permission, then add META_ACCESS_TOKEN and META_AD_ACCOUNT_ID (looks like act_123456789) to Vercel and redeploy. Spend, clicks, CTR and leads will appear here automatically."
          />
        )}
      </div>

      {/* How the numbers connect */}
      <Card className="mt-8 p-6">
        <h3 className="text-[14.5px] font-semibold text-ink-900">How your tracking fits together</h3>
        <ol className="mt-3 grid gap-2 text-[13.5px] leading-relaxed text-ink-500">
          <li>1. Someone taps your ad → Meta Pixel logs the visit (and GA4 records the session).</li>
          <li>2. Asha or the booking form captures them → a <b className="text-ink-700">Lead</b> event goes back to Meta, an email alert reaches the clinic, and the lead lands in the central database.</li>
          <li>3. They pick a slot → a <b className="text-ink-700">Schedule</b> event fires and the booking appears on the Reception screen.</li>
          <li>4. Meta learns from these events and shows your ads to more people who actually book.</li>
        </ol>
      </Card>
    </div>
  );
}
