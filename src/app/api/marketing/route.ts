import { NextResponse } from "next/server";
import { META_PIXEL_ID } from "@/lib/pixel";

/**
 * Marketing integrations status + live Meta Ads insights.
 *
 * Env vars (set in Vercel → Settings → Environment Variables):
 * - META_ACCESS_TOKEN   → System-user token from Meta Business Settings
 * - META_AD_ACCOUNT_ID  → e.g. "act_1234567890" (from Ads Manager URL)
 * - NEXT_PUBLIC_GA_ID   → GA4 measurement ID, e.g. "G-XXXXXXX"
 * - SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY → central lead storage
 */

export const dynamic = "force-dynamic";

interface MetaInsights {
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  cpc: number;
  leads: number;
  datePreset: string;
}

async function fetchMetaInsights(token: string, account: string): Promise<MetaInsights | { error: string }> {
  const acct = account.startsWith("act_") ? account : `act_${account}`;
  const url =
    `https://graph.facebook.com/v21.0/${acct}/insights` +
    `?fields=spend,impressions,clicks,ctr,cpc,actions` +
    `&date_preset=last_7d&access_token=${encodeURIComponent(token)}`;
  try {
    const r = await fetch(url, { next: { revalidate: 300 } });
    const j = await r.json();
    if (!r.ok) return { error: j?.error?.message ?? "Meta API error" };
    const row = j?.data?.[0];
    if (!row) {
      return { spend: 0, impressions: 0, clicks: 0, ctr: 0, cpc: 0, leads: 0, datePreset: "last_7d" };
    }
    const leads =
      (row.actions as { action_type: string; value: string }[] | undefined)
        ?.filter((a) => a.action_type === "lead" || a.action_type.includes("lead"))
        .reduce((s, a) => s + Number(a.value || 0), 0) ?? 0;
    return {
      spend: Number(row.spend ?? 0),
      impressions: Number(row.impressions ?? 0),
      clicks: Number(row.clicks ?? 0),
      ctr: Number(row.ctr ?? 0),
      cpc: Number(row.cpc ?? 0),
      leads,
      datePreset: "last_7d",
    };
  } catch {
    return { error: "Could not reach the Meta API" };
  }
}

export async function GET() {
  const metaToken = process.env.META_ACCESS_TOKEN;
  const metaAccount = process.env.META_AD_ACCOUNT_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const supabase = !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
  const web3forms = !!process.env.WEB3FORMS_ACCESS_KEY;

  let insights: MetaInsights | { error: string } | null = null;
  if (metaToken && metaAccount) {
    insights = await fetchMetaInsights(metaToken, metaAccount);
  }

  return NextResponse.json({
    pixel: { connected: true, id: META_PIXEL_ID },
    metaAds: { connected: !!(metaToken && metaAccount), insights },
    ga: { connected: !!gaId, id: gaId ?? null },
    supabase: { connected: supabase },
    emailAlerts: { connected: web3forms },
  });
}
