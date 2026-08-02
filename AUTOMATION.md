# Carewell — Switching On the Automations

The website already captures and books appointments by itself. These two free
keys make the results reach the clinic automatically. Total setup: ~15 minutes.

## 1. Instant email for every lead & booking  (2 minutes — do this first)

1. Go to https://web3forms.com
2. Enter the clinic email → it sends you a free **Access Key**
3. In Vercel → your project → Settings → Environment Variables, add:
   - `WEB3FORMS_ACCESS_KEY` = the key
4. Redeploy (Vercel → Deployments → ⋯ → Redeploy)

Result: the moment anyone completes Asha's chat or the booking form,
the clinic inbox gets an email like
"🦷 NEW BOOKING — Ramesh · Dental Implants · 2026-08-03 11:00 AM"
with the phone number ready to tap-call. Turn on email notifications on the
clinic phone and you have a real-time booking alert system.

## 2. Central booking database  (10 minutes)

1. Create a free account at https://supabase.com → New project
2. Open SQL Editor → paste the contents of `supabase-setup.sql` → Run
3. In Project Settings → API, copy:
   - Project URL  → add to Vercel as `SUPABASE_URL`
   - `service_role` key → add to Vercel as `SUPABASE_SERVICE_ROLE_KEY`
     (keep this secret — never put it in client code)
4. Redeploy

Result: every lead/booking is stored centrally. Open Supabase → Table Editor →
`website_leads` from any device to see all leads; the `todays_bookings` view
shows today's requested slots. Nothing is lost if a visitor clears their browser.

## 3. Later (when volume grows)

- **WhatsApp reminders**: connect AiSensy/Interakt to the same Supabase table —
  confirmation on booking, reminders 24h & 2h before the slot.
- **AI voice calling**: platforms like Vyora/HuskyVoice can poll `website_leads`
  for rows with status='New' and auto-call them.
- **Admin panel on Supabase**: point the Reception/Leads screens at this table
  so the clinic manages everything from the admin, not Supabase.

Nothing breaks while keys are missing — the site simply skips the integrations.
