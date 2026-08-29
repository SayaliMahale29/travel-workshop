# Travel Workshop by Akasheyess

A responsive workshop registration website with Razorpay payments, automatic email + WhatsApp confirmations, and a no-code admin panel.

## Features

- Landing page with full workshop curriculum (your provided copy)
- Mobile-first responsive design
- Register & pay via Razorpay (UPI, cards, netbanking)
- Automatic email to buyer and organizer after payment
- WhatsApp confirmation (via Interakt API)
- Admin panel at `/admin` — edit dates, price, bio without coding

## Quick start

```powershell
cd C:\Users\sayamaha\Documents\travel-workshop
npm install
copy .env.example .env.local
# Edit .env.local with your keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Full setup (domain, Razorpay, WhatsApp, go-live)

**Read [SETUP-GUIDE.md](./SETUP-GUIDE.md)** — step-by-step instructions for non-developers.

## Project structure

```
app/           Pages and API routes
components/    UI components
data/          Default content + local registrations
lib/           Razorpay, email, WhatsApp, storage
SETUP-GUIDE.md Your go-live checklist
```

## Admin

- URL: `/admin`
- Password: set `ADMIN_PASSWORD` in `.env.local`

## Tech stack

- Next.js 15, React 19, Tailwind CSS
- Razorpay, Resend (email), Interakt (WhatsApp)
