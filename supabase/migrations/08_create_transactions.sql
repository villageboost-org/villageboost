-- 08_create_transactions.sql
-- Paystack payment records. One per contribution (one-to-one in practice).
-- Stores the raw payment data from Paystack for auditing and debugging.

create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  contribution_id uuid not null unique references public.contributions(id) on delete restrict,

  paystack_reference text unique not null,
  paystack_status text not null,

  payment_method text check (payment_method in ('mpesa', 'card', 'bank')),
  mpesa_receipt_number text,

  amount_paid numeric(12, 2) not null check (amount_paid >= 0),
  currency text default 'KES' not null check (currency in ('KES')),

  paid_at timestamptz,
  raw_response jsonb,

  created_at timestamptz default now() not null
);

alter table public.transactions enable row level security;

create index transactions_contribution_id_idx on public.transactions(contribution_id);
create index transactions_paystack_reference_idx on public.transactions(paystack_reference);

comment on table public.transactions is 'Paystack payment records. One per contribution. Source of truth for money movement.';
comment on column public.transactions.contribution_id is 'The contribution this payment settles. UNIQUE enforces one transaction per contribution.';
comment on column public.transactions.paystack_reference is 'Paystack''s unique transaction reference. Used to verify and reconcile payments.';
comment on column public.transactions.paystack_status is 'Raw status string from Paystack (success, failed, abandoned, etc.).';
comment on column public.transactions.payment_method is 'How they paid. mpesa is the common case in Kenya.';
comment on column public.transactions.mpesa_receipt_number is 'M-Pesa confirmation code (e.g. QGR7XXXXX). NULL for card/bank payments.';
comment on column public.transactions.amount_paid is 'What actually cleared. May differ from contribution.amount in edge cases.';
comment on column public.transactions.raw_response is 'Full Paystack webhook payload as JSON. Invaluable for debugging disputes.';