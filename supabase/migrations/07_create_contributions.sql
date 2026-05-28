-- 07_create_contributions.sql
-- Each act of backing a campaign. Links campaign + contributor + (optional) reward.
-- The central junction of the platform.

create table public.contributions (
  id uuid primary key default gen_random_uuid(),

  campaign_id uuid not null references public.campaigns(id) on delete restrict,
  contributor_id uuid not null references public.contributors(id) on delete restrict,
  reward_id uuid references public.rewards(id) on delete set null,

  amount numeric(12, 2) not null check (amount > 0),
  currency text default 'KES' not null check (currency in ('KES')),

  status text default 'pending' not null check (status in (
    'pending', 'completed', 'refunded', 'failed'
  )),

  created_at timestamptz default now() not null,
  completed_at timestamptz
);

alter table public.contributions enable row level security;

create index contributions_campaign_id_idx on public.contributions(campaign_id);
create index contributions_contributor_id_idx on public.contributions(contributor_id);
create index contributions_reward_id_idx on public.contributions(reward_id);
create index contributions_status_idx on public.contributions(status);

comment on table public.contributions is 'Each act of backing a campaign. Links campaign, contributor, and optional reward tier.';
comment on column public.contributions.campaign_id is 'Which campaign is being backed. Restrict delete to preserve financial records.';
comment on column public.contributions.contributor_id is 'Who is backing. Restrict delete to preserve financial records.';
comment on column public.contributions.reward_id is 'Optional reward tier chosen. NULL = contributed without picking a reward. Set null if reward is deleted.';
comment on column public.contributions.amount is 'Amount pledged in KES. Must be > 0. May exceed the reward tier minimum.';
comment on column public.contributions.status is 'pending (awaiting payment) → completed (paid) | failed (payment failed) | refunded (campaign failed).';
comment on column public.contributions.completed_at is 'When payment cleared. NULL while pending. Set by webhook on charge.success.';