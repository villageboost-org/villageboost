-- 11_handle_new_user.sql
-- Auto-creates a public.users profile row the moment Supabase Auth
-- creates the underlying auth.users account (works regardless of
-- email-confirmation timing, since it doesn't rely on a client session).

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
