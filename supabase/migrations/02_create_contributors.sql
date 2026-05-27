-- 02_create_contributors.sql
-- Guest contributor records, deduplicated by phone number.
-- Contributors do NOT have accounts in the MVP — they're identified by their M-Pesa phone.

create table public.contributors (
  id uuid primary key default gen_random_uuid(),
  phone text unique not null,
  name text not null,
  email text,
  total_contributed numeric(12, 2) default 0 not null,
  contribution_count integer default 0 not null,
  created_at timestamptz default now() not null,
  last_contribution_at timestamptz default now() not null
);

alter table public.contributors enable row level security;

create or replace function public.set_last_contribution_at()
returns trigger
language plpgsql
as $$
begin
  new.last_contribution_at = now();
  return new;
end;
$$;

create trigger contributors_touch_last_contribution
  before update on public.contributors
  for each row execute function public.set_last_contribution_at();

comment on table public.contributors is 'Guest contributor records. One row per unique phone number across all campaigns.';
comment on column public.contributors.phone is 'Unique identifier. Format: +254XXXXXXXXX (E.164).';
comment on column public.contributors.name is 'Collected at checkout form. Echoed back by Paystack on transaction confirmation.';
comment on column public.contributors.email is 'Optional. Many contributors skip email at checkout.';
comment on column public.contributors.total_contributed is 'Sum of completed contributions across all campaigns. Updated by app logic on payment confirmation.';
comment on column public.contributors.contribution_count is 'Number of completed contributions. Updated by app logic on payment confirmation.';