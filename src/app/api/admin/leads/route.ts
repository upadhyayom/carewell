import { NextResponse } from "next/server";

/** Central leads for the admin — reads website_leads from Supabase when
 *  SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are configured. */

export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return NextResponse.json({ connected: false, rows: [] });

  try {
    const r = await fetch(
      `${url}/rest/v1/website_leads?select=*&order=created_at.desc&limit=300`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: "no-store" }
    );
    if (!r.ok) return NextResponse.json({ connected: true, rows: [], error: "query failed" });
    const rows = await r.json();
    return NextResponse.json({ connected: true, rows });
  } catch {
    return NextResponse.json({ connected: true, rows: [], error: "unreachable" });
  }
}
