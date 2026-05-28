-- 09_create_campaign_updates.sql
-- Progress posts creators write for their backers.
-- One campaign → many updates, shown newest first.

create table public.campaign_updates (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on delete cascade,

  title text not null,
  body text not null,

  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.campaign_updates enable row level security;

create trigger campaign_updates_set_updated_at
  before update on public.campaign_updates
  for each row execute function public.set_updated_at();

create index campaign_updates_campaign_id_idx on public.campaign_updates(campaign_id);

comment on table public.campaign_updates is 'Progress posts creators write for backers. Shown newest first on the campaign page.';
comment on column public.campaign_updates.title is 'Short headline for the update.';
comment on column public.campaign_updates.body is 'The update content. Plain text or markdown, rendered in frontend.';