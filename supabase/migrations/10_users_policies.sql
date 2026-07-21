-- 10_users_policies.sql
-- Unlike contributors (guest checkout, no login), users are always
-- authenticated Supabase Auth accounts — safe to let each user manage
-- their own profile row directly.

create policy "Users can insert own profile"
  on public.users for insert
  to authenticated
  with check (auth.uid() = id);

create policy "Users can view own profile"
  on public.users for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.users for update
  to authenticated
  using (auth.uid() = id);