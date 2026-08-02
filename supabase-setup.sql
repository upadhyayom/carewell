-- Carewell Dental Clinic — central lead & booking storage
-- Run this once in Supabase → SQL Editor → New query → paste → Run.

create table if not exists website_leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  phone       text not null,
  treatment   text,
  urgency     text,
  timeline    text,
  cghs        boolean default false,
  score       text,            -- Hot / Warm / Cold
  slot_date   date,            -- filled when the visitor booked a slot
  slot_time   text,
  source      text,            -- chatbot / booking-form
  status      text not null default 'New'  -- New / Called / Confirmed / Visited / Lost
);

-- Helpful view: today's requested bookings, newest first
create or replace view todays_bookings as
  select * from website_leads
  where slot_date = current_date
  order by created_at desc;

-- Lock the table down: only the service role (used by the website's server) can access.
alter table website_leads enable row level security;
