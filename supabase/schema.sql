create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text,
  description text not null,
  stack text[] not null default '{}',
  github text,
  demo text,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text,
  date text,
  link text,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.designs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  description text not null,
  label text,
  link text,
  image_url text,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;
alter table public.certificates enable row level security;
alter table public.designs enable row level security;

drop policy if exists "Public can read projects" on public.projects;
create policy "Public can read projects"
on public.projects for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated users can manage projects" on public.projects;
create policy "Admin can manage projects"
on public.projects for all
to authenticated
using (auth.uid() = '2caf5a3d-e119-4f82-a5cb-24f7111b0066'::uuid)
with check (auth.uid() = '2caf5a3d-e119-4f82-a5cb-24f7111b0066'::uuid);

drop policy if exists "Public can read certificates" on public.certificates;
create policy "Public can read certificates"
on public.certificates for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated users can manage certificates" on public.certificates;
create policy "Admin can manage certificates"
on public.certificates for all
to authenticated
using (auth.uid() = '2caf5a3d-e119-4f82-a5cb-24f7111b0066'::uuid)
with check (auth.uid() = '2caf5a3d-e119-4f82-a5cb-24f7111b0066'::uuid);

drop policy if exists "Public can read designs" on public.designs;
create policy "Public can read designs"
on public.designs for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated users can manage designs" on public.designs;
create policy "Admin can manage designs"
on public.designs for all
to authenticated
using (auth.uid() = '2caf5a3d-e119-4f82-a5cb-24f7111b0066'::uuid)
with check (auth.uid() = '2caf5a3d-e119-4f82-a5cb-24f7111b0066'::uuid);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'portfolio-media',
  'portfolio-media',
  true,
  5242880,
  array['image/png','image/jpeg','image/webp','image/gif']
)
on conflict (id) do nothing;

drop policy if exists "Public can view portfolio media" on storage.objects;
create policy "Public can view portfolio media"
on storage.objects for select
using (bucket_id = 'portfolio-media');

drop policy if exists "Authenticated users can upload portfolio media" on storage.objects;
create policy "Admin can upload portfolio media"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'portfolio-media'
  and auth.uid() = '2caf5a3d-e119-4f82-a5cb-24f7111b0066'::uuid
);

drop policy if exists "Authenticated users can update portfolio media" on storage.objects;
create policy "Admin can update portfolio media"
on storage.objects for update
to authenticated
using (
  bucket_id = 'portfolio-media'
  and auth.uid() = '2caf5a3d-e119-4f82-a5cb-24f7111b0066'::uuid
)
with check (
  bucket_id = 'portfolio-media'
  and auth.uid() = '2caf5a3d-e119-4f82-a5cb-24f7111b0066'::uuid
);

drop policy if exists "Authenticated users can delete portfolio media" on storage.objects;
create policy "Admin can delete portfolio media"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'portfolio-media'
  and auth.uid() = '2caf5a3d-e119-4f82-a5cb-24f7111b0066'::uuid
);

