# Travel Workshop by Akasheyess — Setup Guide

This guide walks you through everything **after the website is built**: running it locally, connecting Razorpay, email, WhatsApp, buying a domain, and going live on Vercel.

You do **not** need to write code. Follow each step in order.

---

## Part 1 — Run the website on your computer (5 minutes)

### Step 1: Install Node.js

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** version and install it (keep all default options)
3. Restart your computer if asked

### Step 2: Open the project folder

1. Open **PowerShell** or **Command Prompt**
2. Run:

```powershell
cd C:\Users\sayamaha\Documents\travel-workshop
```

### Step 3: Install dependencies

```powershell
npm install
```

Wait until it finishes (1–3 minutes).

### Step 4: Create your secret settings file

```powershell
copy .env.example .env.local
```

Open `.env.local` in Notepad and set at minimum:

```
ADMIN_PASSWORD=Pick-a-strong-password-here
ORGANIZER_EMAIL=akasheyess@gmail.com
```

(Use Akasheyess’s real email — this receives “someone paid” alerts.)

### Step 5: Start the site

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Admin panel:** [http://localhost:3000/admin](http://localhost:3000/admin) — use the password you set in `ADMIN_PASSWORD`

---

## Part 2 — Razorpay (payments) — step by step

Razorpay lets people pay with UPI, cards, and netbanking. Money goes to Akasheyess’s bank account after KYC.

### Step 1: Create Razorpay account

1. Go to [https://razorpay.com](https://razorpay.com) → **Sign Up**
2. Choose **Business** (not personal)
3. Enter business details:
   - Business name: e.g. “Akasheyess Content” or creator’s legal name
   - Category: Education / Media / Individual creator (pick closest)
4. Complete **KYC** (PAN, bank account, Aadhaar) — required before live payments
5. Wait for approval (usually 1–3 business days; test mode works immediately)

### Step 2: Get API keys (Test mode first)

1. Log in to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Top-left: make sure mode is **Test Mode** (orange banner)
3. Go to **Settings** → **API Keys** → **Generate Key**
4. Copy **Key ID** (starts with `rzp_test_`) and **Key Secret** (shown once — save it!)

### Step 3: Add keys to your website

Edit `.env.local`:

```
RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
```

Restart `npm run dev`. Go to `/register` and test payment with Razorpay test card:

- Card: `4111 1111 1111 1111`
- Expiry: any future date
- CVV: any 3 digits

### Step 4: Webhook (reliable “payment received”)

Webhooks tell your site about payments even if the user closes the browser.

1. In Razorpay Dashboard → **Settings** → **Webhooks** → **Add New Webhook**
2. **Webhook URL** (after you deploy — see Part 4):
   ```
   https://YOUR-DOMAIN.com/api/webhook/razorpay
   ```
   For local testing, use [ngrok](https://ngrok.com) or skip until live.
3. Select event: **payment.captured**
4. Copy the **Webhook Secret** into `.env.local`:
   ```
   RAZORPAY_WEBHOOK_SECRET=whsec_xxxxxxxx
   ```

### Step 5: Go live (real money)

1. Complete KYC and switch dashboard to **Live Mode**
2. Generate **Live API Keys** (`rzp_live_...`)
3. Replace all three Razorpay values in `.env.local` (and later in Vercel)
4. Update webhook URL to your live domain

---

## Part 3 — Email (automatic confirmation to buyer + you)

We use **Resend** (free tier: 100 emails/day).

### Step 1: Create Resend account

1. Go to [https://resend.com](https://resend.com) → Sign up
2. **API Keys** → Create → copy key (`re_...`)

### Step 2: Add to `.env.local`

```
RESEND_API_KEY=re_xxxxxxxx
EMAIL_FROM=Workshop <onboarding@resend.dev>
ORGANIZER_EMAIL=akasheyess@gmail.com
```

For testing, `onboarding@resend.dev` works without domain verification.

### Step 3: Use your own domain for email (after go-live)

1. In Resend → **Domains** → Add your domain (e.g. `akasheyess.com`)
2. Add the DNS records Resend shows you (at your domain registrar)
3. Change `EMAIL_FROM` to:
   ```
   EMAIL_FROM=Workshop <hello@akasheyess.com>
   ```

After payment, the **buyer** gets workshop details; **ORGANIZER_EMAIL** gets “New paid registration.”

---

## Part 4 — WhatsApp (automatic message after payment)

Personal WhatsApp **cannot** auto-send messages. You need a **WhatsApp Business API** provider.

**Recommended for India: Interakt** ([https://www.interakt.ai](https://www.interakt.ai))

### Step 1: Sign up

1. Create account at Interakt
2. Connect a WhatsApp Business number (or get one through them)
3. Complete Meta business verification if asked

### Step 2: Get API key

1. In Interakt dashboard → **Developer** / **API**
2. Copy your API key

### Step 3: Add to `.env.local`

```
WHATSAPP_API_URL=https://api.interakt.ai/v1/public/message/
WHATSAPP_API_KEY=your_interakt_api_key
```

Until these are set, **email still works** — WhatsApp is skipped with a log message.

### Alternative providers

- **Gupshup** — [https://www.gupshup.io](https://www.gupshup.io)
- **WATI** — [https://www.wati.io](https://www.wati.io)

Same idea: sign up → get API key → paste into env vars.

---

## Part 5 — Buy a domain (your website address)

A domain is what people type in the browser, e.g. `workshop.akasheyess.com`.

### Step 1: Choose a registrar (pick one)

- [Namecheap](https://www.namecheap.com) — easy for beginners
- [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) — at-cost pricing
- [GoDaddy India](https://www.godaddy.com/en-in)

### Step 2: Search and buy

1. Search for a name, e.g. `akasheyess.com` or `akashworkshop.com`
2. Buy for 1 year (~₹800–1500/year)
3. You now **own** the domain; nothing is live until you connect it (Part 6)

### Tips

- Prefer `.com` if available
- Avoid hyphens if possible
- Enable **auto-renew** so you don’t lose the domain

---

## Part 6 — Go live on Vercel (free hosting)

Vercel hosts your site with HTTPS (padlock) automatically.

### Step 1: Push code to GitHub

1. Create account at [https://github.com](https://github.com)
2. Create a new **private** repository: `travel-workshop`
3. In PowerShell, from the project folder:

```powershell
git init
git add .
git commit -m "Akasheyess workshop website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/travel-workshop.git
git push -u origin main
```

(Install [Git for Windows](https://git-scm.com) if `git` is not found.)

### Step 2: Deploy on Vercel

1. Go to [https://vercel.com](https://vercel.com) → Sign up with GitHub
2. **Add New Project** → Import `travel-workshop` repo
3. **Environment Variables** — add everything from `.env.local`:
   - `ADMIN_PASSWORD`
   - `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID`
   - `RESEND_API_KEY`, `EMAIL_FROM`, `ORGANIZER_EMAIL`
   - `WHATSAPP_API_URL`, `WHATSAPP_API_KEY` (when ready)
   - `NEXT_PUBLIC_SITE_URL=https://your-domain.com`
4. Click **Deploy** — wait ~2 minutes
5. You get a free URL like `travel-workshop.vercel.app` — test it!

### Step 3: Connect your domain

1. In Vercel project → **Settings** → **Domains**
2. Add your domain: e.g. `workshop.akasheyess.com` or `akasheyess.com`
3. Vercel shows **DNS records** to add

### Step 4: Update DNS at your registrar

At Namecheap/GoDaddy/Cloudflare where you bought the domain:

| Type | Name | Value |
|------|------|--------|
| CNAME | `workshop` (or `@` for root) | `cname.vercel-dns.com` |

(Vercel shows the exact values — copy them exactly.)

Wait 5 minutes to 48 hours. HTTPS turns on automatically.

### Step 5: Update Razorpay webhook

Set webhook URL to:

```
https://your-domain.com/api/webhook/razorpay
```

---

## Part 7 — Handoff for Akasheyess (no coding)

| Task | How |
|------|-----|
| Change dates, price, bio | Go to `https://your-domain.com/admin` → login → Edit content → Save |
| See who paid | Admin → **Paid registrations** tab |
| See payments in bank | Razorpay Dashboard → **Transactions** |
| Close registration | Admin → uncheck **Registration open** → Save |

---

## Quick checklist before launch

- [ ] Website loads on phone and laptop
- [ ] Test payment in Razorpay **test mode**
- [ ] Buyer receives confirmation email
- [ ] Organizer receives “new registration” email
- [ ] WhatsApp sends (if Interakt configured)
- [ ] Switch Razorpay to **live** keys
- [ ] Domain connected with HTTPS padlock
- [ ] Webhook URL updated to live domain
- [ ] Admin password is strong and saved safely

---

## Need help?

If something fails, check:

1. **Payment not opening** → Razorpay keys in Vercel env vars? `NEXT_PUBLIC_RAZORPAY_KEY_ID` must match `RAZORPAY_KEY_ID`
2. **No email** → `RESEND_API_KEY` and `ORGANIZER_EMAIL` set?
3. **No WhatsApp** → Interakt keys set? Phone number must be 10 digits
4. **Domain not working** → DNS can take up to 48 hours; use Vercel URL meanwhile

You can ask Cursor to help debug any step — paste the error message.
