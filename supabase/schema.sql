-- Run this in your Supabase project's SQL editor (or via `supabase db push`)
-- to create the tables the site needs.

create table if not exists appointments (
    id              uuid primary key default gen_random_uuid(),
    name            varchar(150) not null,
    phone           varchar(30)  not null,
    email           varchar(150),
    preferred_date  date,
    preferred_time  varchar(20),
    concern         varchar(100),
    message         text,
    status          varchar(20)  not null default 'new', -- new | confirmed | completed | cancelled
    payment_status  varchar(20)  not null default 'pending', -- pending | paid | cash
    created_at      timestamptz  not null default now()
);

-- If this table already existed before payment_status was added, this
-- backfills it safely (no-op if the column is already there).
alter table appointments add column if not exists payment_status varchar(20) not null default 'pending';

create index if not exists idx_appointments_created_at on appointments (created_at desc);
create index if not exists idx_appointments_status on appointments (status);

create table if not exists newsletter_subscribers (
    id          uuid primary key default gen_random_uuid(),
    email       varchar(150) not null unique,
    created_at  timestamptz  not null default now()
);

create table if not exists symptom_checks (
    id          uuid primary key default gen_random_uuid(),
    answers     jsonb not null,
    result      jsonb not null,
    created_at  timestamptz not null default now()
);

-- Row Level Security: lock these tables down by default. The Next.js API
-- routes use the service-role key server-side, which bypasses RLS, so the
-- public anon key stays read/write-blocked unless you explicitly add
-- policies here.
alter table appointments enable row level security;
alter table newsletter_subscribers enable row level security;
alter table symptom_checks enable row level security;
