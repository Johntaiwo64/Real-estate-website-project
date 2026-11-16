-- Salem Real Estate: initial Supabase schema
-- Apply this migration in the Supabase SQL Editor.
-- New accounts are ordinary users by default. Promote trusted admins manually.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 5 and 140),
  description text not null default '',
  purpose text not null check (purpose in ('Buy', 'Rent')),
  property_type text not null check (property_type in ('House', 'Apartment', 'Villa', 'Land', 'Commercial')),
  price numeric(14,2) not null check (price > 0),
  currency text not null default 'NGN' check (currency = 'NGN'),
  address text not null,
  bedrooms integer not null default 0 check (bedrooms >= 0),
  bathrooms integer not null default 0 check (bathrooms >= 0),
  parking_spaces integer not null default 0 check (parking_spaces >= 0),
  area_sqm numeric(10,2) check (area_sqm is null or area_sqm > 0),
  image_urls text[] not null default '{}',
  status text not null default 'pending' check (status in ('pending', 'active', 'rejected', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, property_id)
);

create index if not exists properties_public_search_idx
  on public.properties (status, purpose, property_type, price);
create index if not exists properties_owner_idx on public.properties (owner_id);
create index if not exists favorites_user_idx on public.favorites (user_id);

-- Create a profile automatically when an account is registered.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Keep updated_at current when rows are edited.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles
  for each row execute procedure public.set_updated_at();
drop trigger if exists properties_updated_at on public.properties;
create trigger properties_updated_at before update on public.properties
  for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.favorites enable row level security;

-- Profiles: each user can read/update their own profile, but cannot change role.
drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile" on public.profiles
  for select to authenticated using (id = (select auth.uid()));
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile" on public.profiles
  for update to authenticated using (id = (select auth.uid()))
  with check (id = (select auth.uid()) and role = 'user');

-- Public visitors can see active listings only.
drop policy if exists "Anyone can read active properties" on public.properties;
create policy "Anyone can read active properties" on public.properties
  for select to anon, authenticated using (status = 'active');

-- Owners can see their own submissions regardless of moderation status.
drop policy if exists "Owners can read own properties" on public.properties;
create policy "Owners can read own properties" on public.properties
  for select to authenticated using (owner_id = (select auth.uid()));

drop policy if exists "Authenticated users can submit properties" on public.properties;
create policy "Authenticated users can submit properties" on public.properties
  for insert to authenticated with check (
    owner_id = (select auth.uid()) and status = 'pending'
  );

drop policy if exists "Owners can update pending properties" on public.properties;
create policy "Owners can update pending properties" on public.properties
  for update to authenticated using (
    owner_id = (select auth.uid()) and status = 'pending'
  ) with check (
    owner_id = (select auth.uid()) and status = 'pending'
  );

-- Favourites are private to the signed-in user.
drop policy if exists "Users can read own favorites" on public.favorites;
create policy "Users can read own favorites" on public.favorites
  for select to authenticated using (user_id = (select auth.uid()));
drop policy if exists "Users can add own favorites" on public.favorites;
create policy "Users can add own favorites" on public.favorites
  for insert to authenticated with check (user_id = (select auth.uid()));
drop policy if exists "Users can remove own favorites" on public.favorites;
create policy "Users can remove own favorites" on public.favorites
  for delete to authenticated using (user_id = (select auth.uid()));

-- Admin access is intentionally granted out-of-band by a trusted project owner.
-- Example after creating your own account:
-- update public.profiles set role = 'admin' where id = '<your-auth-user-uuid>';
-- Add admin-specific policies only after verifying the role lookup strategy.
