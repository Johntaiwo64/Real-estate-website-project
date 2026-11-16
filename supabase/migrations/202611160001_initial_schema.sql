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

-- SECURITY DEFINER avoids recursive profile RLS checks when testing the caller's role.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

drop policy if exists "Admins can read all properties" on public.properties;
create policy "Admins can read all properties" on public.properties
  for select to authenticated using ((select public.is_admin()));
drop policy if exists "Admins can moderate properties" on public.properties;
create policy "Admins can moderate properties" on public.properties
  for update to authenticated using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- Public property images; uploads must be stored under a folder named with the owner's auth UUID.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('property-images', 'property-images', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can view property images" on storage.objects;
create policy "Public can view property images" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'property-images');

drop policy if exists "Owners can upload property images" on storage.objects;
create policy "Owners can upload property images" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'property-images'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

drop policy if exists "Owners and admins can update property images" on storage.objects;
create policy "Owners and admins can update property images" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'property-images'
    and ((storage.foldername(name))[1] = (select auth.uid())::text or (select public.is_admin()))
  )
  with check (
    bucket_id = 'property-images'
    and ((storage.foldername(name))[1] = (select auth.uid())::text or (select public.is_admin()))
  );

drop policy if exists "Owners and admins can delete property images" on storage.objects;
create policy "Owners and admins can delete property images" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'property-images'
    and ((storage.foldername(name))[1] = (select auth.uid())::text or (select public.is_admin()))
  );

-- After creating your own account, promote it manually from the SQL Editor:
-- update public.profiles set role = 'admin' where id = '<your-auth-user-uuid>';
