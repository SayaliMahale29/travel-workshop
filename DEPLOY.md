# Deploy this site (Vercel) — click-by-click

Git was not installed on this PC. After Git is installed (or if you install it from https://git-scm.com), follow this.

Do **not** upload `.env.local` to GitHub. Secrets stay on Vercel only.

---

## A. Install Git (if needed)

1. Download: https://git-scm.com/download/win
2. Install with default options.
3. **Close and reopen** PowerShell / Cursor.

---

## B. GitHub account + new repo

1. Open https://github.com → **Sign up** (or log in).
2. Top right **+** → **New repository**.
3. Name: `travel-workshop`
4. **Private** (recommended).
5. Do **not** add README.
6. Click **Create repository**.
7. Leave that page open (you will copy the repo URL).

---

## C. Put the code on GitHub

Open **PowerShell**:

```powershell
cd C:\Users\sayamaha\Documents\travel-workshop
git init
git add .
git commit -m "Workshop website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/travel-workshop.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.  
Log in when GitHub asks (browser or token).

---

## D. Deploy on Vercel (this makes the live link)

1. Open https://vercel.com → **Sign up** with **GitHub**.
2. **Add New…** → **Project**.
3. Import **travel-workshop**.
4. **Framework:** Next.js (auto).
5. **Environment Variables** — add these (same names as `.env.local`):

| Name | Value for now |
|------|----------------|
| `ADMIN_PASSWORD` | a strong password you choose |
| `NEXT_PUBLIC_SITE_URL` | leave empty until you have the Vercel URL, then set `https://your-project.vercel.app` |
| `RAZORPAY_KEY_ID` | Siddhi’s key, or leave test placeholder until she sends keys |
| `RAZORPAY_KEY_SECRET` | Siddhi’s secret |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | same as `RAZORPAY_KEY_ID` |
| `ORGANIZER_EMAIL` | `Dalvisiddhi51@gmail.com` |
| `RAZORPAY_WEBHOOK_SECRET` | add later from Razorpay |

If Razorpay keys are not ready, you can still Deploy. The site will open; **Buy now** will fail until keys are real.

6. Click **Deploy**. Wait 1–2 minutes.
7. Click the URL (looks like `https://travel-workshop-xxxx.vercel.app`).

That URL is your **live website**. Share it.

---

## E. After Siddhi sends Razorpay keys

Vercel → your project → **Settings** → **Environment Variables** → edit the three Razorpay lines → **Deployments** → **Redeploy**.

---

## F. Custom domain (optional)

Vercel → **Settings** → **Domains** → add your domain → copy the DNS records they show into Namecheap/GoDaddy.
