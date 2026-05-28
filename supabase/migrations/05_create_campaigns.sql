-- 05_create_campaigns.sql
-- The fundraising projects creators launch on Village Boost.
-- Lifecycle: draft → pending_review → live → (funded | failed)

create table public.campaigns (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.users(id) on delete restrict,

  -- Identity
  title text not null,
  slug text unique not null,
  category text not null check (category in (
    'film', 'music', 'illustration', 'design', 'photography',
    'writing', 'theatre', 'dance', 'fashion', 'crafts'
  )),

  -- Pitch
  story text not null,
  cover_image_url text,

  -- Funding
  goal_amount numeric(12, 2) not null check (goal_amount > 0),
  current_amount numeric(12, 2) default 0 not null check (current_amount >= 0),
  currency text default 'KES' not null check (currency in ('KES')),

  -- Timing
  deadline timestamptz not null,

  -- Lifecycle
  status text default 'draft' not null check (status in (
    'draft', 'pending_review', 'live', 'funded', 'failed'
  )),

  -- Audit
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  published_at timestamptz,
  closed_at timestamptz
);

alter table public.campaigns enable row level security;

-- Auto-update the updated_at column on every edit
create trigger campaigns_set_updated_at
  before update on public.campaigns
  for each row execute function public.set_updated_at();

-- Indexes for the common query patterns
create index campaigns_creator_id_idx on public.campaigns(creator_id);
create index campaigns_status_idx on public.campaigns(status);
create index campaigns_category_idx on public.campaigns(category);
create index campaigns_deadline_idx on public.campaigns(deadline);

-- Comments
comment on table public.campaigns is 'Fundraising projects on Village Boost. Each campaign is owned by one creator.';
comment on column public.campaigns.creator_id is 'The owner of the campaign. Cannot be deleted while campaigns exist (on delete restrict).';
comment on column public.campaigns.slug is 'URL-friendly identifier. Used in /campaigns/{slug}. Must be unique platform-wide.';
comment on column public.campaigns.story is 'Long-form pitch. Stored as plain text or markdown; rendered in the frontend.';
comment on column public.campaigns.goal_amount is 'KES target. Must be > 0. Cannot be changed after status = live.';
comment on column public.campaigns.current_amount is 'Sum of completed contributions. Updated by webhook on payment confirmation.';
comment on column public.campaigns.deadline is 'When fundraising ends. After this, automatic resolution to funded or failed.';
comment on column public.campaigns.status is 'Lifecycle: draft (creator editing) → pending_review (submitted) → live (visible) → funded or failed (terminal).';
comment on column public.campaigns.published_at is 'When status first became live. NULL while in draft or pending_review.';
comment on column public.campaigns.closed_at is 'When status moved to funded or failed. NULL while still active.';