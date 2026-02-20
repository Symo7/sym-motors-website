# SYM MOTORS Website

Next.js App Router + TypeScript platform for car sales/hire with Supabase Auth, Postgres, and Storage.

## Implemented modules
- Home page (hero, featured listings, testimonials, FAQ).
- Cars for Sale: `/cars-for-sale` + `/cars-for-sale/[slug]` with search/filter and WhatsApp/Call CTA.
- Car Hire: `/hire` + `/hire/[slug]` with location selector, status and drive mode badges.
- Lead forms: `/sell` and `/lease` with DB persistence and success pages.
- About/Contact page: `/about-contact`.
- Admin: Supabase email/password auth + admin-role checks in middleware/server/actions.

## SEO
- Metadata + OpenGraph in `app/layout.tsx`
- Dynamic sitemap in `app/sitemap.ts`
- Robots file in `app/robots.ts`
- Slug URLs for listings

## Supabase setup
1. Create Supabase project.
2. Run SQL in `supabase/schema.sql`.
3. Create `.env.local` from `.env.example` and fill keys.
4. Ensure bucket `vehicle-photos` exists (schema script creates it if missing).

## Create first admin user
1. In Supabase Auth, create user with email/password.
2. Run SQL:
   ```sql
   update public.profiles
   set role = 'admin'
   where id = '<auth-user-uuid>';
   ```
3. Login at `/admin/login`.

## Local development
```bash
npm install
npm run dev
```

## Deploy to Vercel
1. Push repository to GitHub.
2. Import into Vercel.
3. Add environment variables from `.env.example`.
4. Deploy.
