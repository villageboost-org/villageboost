-- 04_create_user_portfolio_links.sql
-- Portfolio links a creator displays on their profile.
-- One creator → many links across different platforms.

create table public.user_portfolio_links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  platform text not null check (platform in (
    'instagram', 'tiktok', 'youtube', 'spotify',
    'behance', 'twitter',
    'personal_website', 'other'
  )),
  url text not null,
  sort_order integer default 0 not null,
  created_at timestamptz default now() not null
);

alter table public.user_portfolio_links enable row level security;

create index user_portfolio_links_user_id_idx on public.user_portfolio_links(user_id);

comment on table public.user_portfolio_links is 'External links a creator displays on their profile (IG, Spotify, personal site, etc.).';
comment on column public.user_portfolio_links.platform is 'Controlled vocabulary. Frontend renders matching icon. "personal_website" for own sites, "other" as fallback.';
comment on column public.user_portfolio_links.url is 'Full URL including https://. Validated client-side.';
comment on column public.user_portfolio_links.sort_order is 'Lower numbers appear first on profile.';