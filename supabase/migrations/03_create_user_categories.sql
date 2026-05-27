-- 03_create_user_categories.sql
-- Crafts a creator declares at signup. Many-to-many: one creator can pick multiple crafts.
-- Used for: profile display, platform analytics, recruitment targeting.

create table public.user_categories (
  user_id uuid not null references public.users(id) on delete cascade,
  category text not null check (category in (
    'film', 'music', 'illustration', 'design', 'photography',
    'writing', 'theatre', 'dance', 'fashion', 'crafts'
  )),
  created_at timestamptz default now() not null,

  primary key (user_id, category)
);

alter table public.user_categories enable row level security;

create index user_categories_user_id_idx on public.user_categories(user_id);
create index user_categories_category_idx on public.user_categories(category);

comment on table public.user_categories is 'Crafts each creator declares at signup. Drives profile display and platform analytics.';
comment on column public.user_categories.category is 'One of the 10 fixed Village Boost categories. Enforced by CHECK constraint.';