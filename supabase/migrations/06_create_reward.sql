-- 06_create_rewards.sql
-- Reward tiers offered by a campaign. One campaign → many rewards.
-- A contributor optionally selects one when contributing.
-- Tiers are always displayed ascending by amount.
-- Reward badge images are assigned in the frontend (default Village Boost badges).

create table public.rewards (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on delete cascade,

  title text not null,
  description text not null,
  amount numeric(12, 2) not null check (amount > 0),

  -- Optional limited quantity ("only 50 of these")
  quantity_available integer check (quantity_available is null or quantity_available > 0),
  quantity_claimed integer default 0 not null check (quantity_claimed >= 0),

  estimated_delivery date,

  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.rewards enable row level security;

create trigger rewards_set_updated_at
  before update on public.rewards
  for each row execute function public.set_updated_at();

create index rewards_campaign_id_idx on public.rewards(campaign_id);

comment on table public.rewards is 'Reward tiers offered by a campaign. Displayed ascending by amount. Badge images assigned in frontend.';
comment on column public.rewards.amount is 'Minimum contribution to claim this reward. Must be > 0. Also the display sort order.';
comment on column public.rewards.quantity_available is 'NULL = unlimited. A number = limited edition cap.';
comment on column public.rewards.quantity_claimed is 'Running count of how many have been claimed. Compared against quantity_available.';
comment on column public.rewards.estimated_delivery is 'When the creator expects to deliver. Sets backer expectations.';