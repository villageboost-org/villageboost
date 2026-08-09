-- 12_make_full_name_nullable.sql
-- Makes full_name nullable so future OAuth sign-ups (Google, etc.)
-- don't crash the handle_new_user trigger when no name is provided.
alter table public.users
  alter column full_name drop not null;
