# Bushra Groups Website: GitHub to Vercel Deployment

## What is ready

- `GET /api/results` serves the demo result records.
- `POST /api/admissions` validates and stores admission enquiries.
- `POST /api/careers` validates and stores career applications.
- Supabase service credentials stay server-side in Vercel environment variables.
- The selected CV file name is stored for now; the file itself is not uploaded. Add Supabase Storage before using CVs operationally.

## 1. Create the database

1. Open [supabase.com](https://supabase.com), create an account, and create a new project.
2. In Supabase, open **SQL Editor**.
3. Copy all SQL from `supabase/schema.sql`, paste it into SQL Editor, and click **Run**.
4. Open **Project Settings > API** and keep these two values ready:
   - **Project URL**
   - **service_role secret key**

Never put the `service_role` key in `Demo.js`, HTML, GitHub, or a public README.

## 2. Test the site locally

Install the Vercel CLI once:

```powershell
npm install -g vercel
```

From the project folder:

```powershell
cd "D:\Web Demo"
vercel login
vercel dev
```

For local form submissions, create a `.env` file in the project folder (do not commit it):

```env
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

Then open the local URL shown by Vercel, submit one admission enquiry and one career application, and verify both rows in Supabase **Table Editor**.

## 3. Push this folder to GitHub

Create a new empty GitHub repository. Then run these commands from `D:\Web Demo`:

```powershell
git init
git add Demo.html Demo.css Demo.js api supabase package.json vercel.json DEPLOYMENT.md
git commit -m "Add school website backend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Do not run `git add .` if your `.env` file is present. If a `.env` was accidentally committed, rotate the Supabase service key immediately.

## 4. Deploy on Vercel

1. Open [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New... > Project**.
3. Import the GitHub repository.
4. Keep the default framework setting. This is a Vercel serverless/static project.
5. Open **Environment Variables** and add:
   - `SUPABASE_URL` = your Supabase Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` = your Supabase service role key
6. Add them for **Production**, **Preview**, and **Development** as needed.
7. Click **Deploy**.

Vercel will host the homepage at `/` and automatically expose the API routes under `/api/...`.

## 5. Verify production

Use a real deployed URL:

```text
https://YOUR-DOMAIN.vercel.app/api/results?class=10th&roll=1045231&year=2026
```

It should return JSON containing `Mohammad Aryan Khan`. Then test:

- a valid and invalid result roll number;
- one admission enquiry and one career application;
- empty required fields and an invalid phone number;
- mobile navigation and the existing result rendering;
- saved rows in Supabase.

## 6. Connect a custom domain

In Vercel open the project **Settings > Domains**, add your domain, and follow the displayed DNS instructions. Usually this means adding the Vercel A record for the root domain and a CNAME for `www`. HTTPS is issued automatically after DNS propagates.

## Production follow-ups

- Replace the demo result object in `api/results.js` with a database-backed result table or an admin import workflow.
- Add Supabase Storage for actual CV uploads; never store uploaded files in the Vercel filesystem.
- Add email notifications through Resend, SMTP, or WhatsApp after database insertion.
- Add CAPTCHA/rate limiting before publishing publicly because these forms accept personal data.
- Add an admin-authenticated dashboard for reviewing enquiries and applications.