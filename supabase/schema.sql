create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user' check (role in ('admin','user')),
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user_profile()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, role) values (new.id, 'user') on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user_profile();

create table if not exists public.sale_cars (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  make text not null,
  model text not null,
  year int not null,
  engine_cc int not null,
  fuel text not null,
  transmission text not null,
  mileage_km int not null,
  price_kes bigint not null,
  negotiable boolean not null default false,
  location text not null check (location in ('Nairobi','Nakuru','Kisii','Kisumu')),
  description text not null,
  features text[] not null default '{}',
  photos text[] not null default '{}',
  status text not null check (status in ('Available','Sold','Reserved')),
  slug text unique not null,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.hire_cars (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  make text not null,
  model text not null,
  year int not null,
  daily_price_kes bigint not null,
  weekly_price_kes bigint,
  deposit_policy_text text not null,
  drive_mode text not null check (drive_mode in ('Self-Drive','Chauffeured','Both')),
  location text not null check (location in ('Nairobi','Nakuru','Kisii','Kisumu')),
  status text not null check (status in ('Available','Rented')),
  features text[] not null default '{}',
  photos text[] not null default '{}',
  slug text unique not null,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.sell_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  car_details text not null,
  location text not null,
  preferred_price_kes bigint,
  photo_urls text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.lease_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  category text not null,
  expected_monthly_range text not null,
  car_details text not null,
  location text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.sale_cars enable row level security;
alter table public.hire_cars enable row level security;
alter table public.sell_requests enable row level security;
alter table public.lease_requests enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable as $$
  select exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$;

create policy "Public read available sale cars" on public.sale_cars for select using (status = 'Available');
create policy "Public read available hire cars" on public.hire_cars for select using (status = 'Available');

create policy "Admin full access sale cars" on public.sale_cars for all using (public.is_admin()) with check (public.is_admin());
create policy "Admin full access hire cars" on public.hire_cars for all using (public.is_admin()) with check (public.is_admin());

create policy "Public create sell requests" on public.sell_requests for insert with check (true);
create policy "Public create lease requests" on public.lease_requests for insert with check (true);
create policy "Admin read sell requests" on public.sell_requests for select using (public.is_admin());
create policy "Admin read lease requests" on public.lease_requests for select using (public.is_admin());

create policy "Profile owner read" on public.profiles for select using (auth.uid() = id);
create policy "Admin manage profiles" on public.profiles for all using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('vehicle-photos', 'vehicle-photos', true)
on conflict (id) do nothing;

create policy "Public read vehicle photos" on storage.objects
for select using (bucket_id = 'vehicle-photos');

create policy "Admin upload vehicle photos" on storage.objects
for insert with check (bucket_id = 'vehicle-photos' and public.is_admin());

create policy "Admin update vehicle photos" on storage.objects
for update using (bucket_id = 'vehicle-photos' and public.is_admin());

create policy "Admin delete vehicle photos" on storage.objects
for delete using (bucket_id = 'vehicle-photos' and public.is_admin());
