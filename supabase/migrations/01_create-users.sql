-- 01_create_users.sql
-- Creator profiles. Links 1:1 to Supabase's auth.users.
create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  phone text,
  gender text,
  bio text,
  is_creator boolean default true not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable Row Level Security (we'll add policies later)
alter table public.users enable row level security;

-- Auto-update the updated_at column whenever a row changes
create or replace function public.set_updated_at () returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger users_set_updated_at before
update on public.users for each row
execute function public.set_updated_at ();

-- Helpful comments (visible in Supabase dashboard)
comment on table public.users is 'Creator profiles. Contributors are stored separately in the contributors table.';

comment on column public.users.is_creator is 'Default true in MVP since only creators sign up. Future-proof for when contributors can also have accounts.';