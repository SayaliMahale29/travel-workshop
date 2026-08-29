# Workshop website — steps for Siddhi

Share this note as-is. The website code is already built. Siddhi’s job is Razorpay (payments) and, with Sayali, putting the site on the internet.

**Live link later:** people will open the site and pay ₹799.  
**Money now:** goes to **Siddhi’s** Razorpay bank account.  
**Later:** keys can be changed to **Akash’s** Razorpay without rebuilding the site.

---

## What is already done

- Website pages, workshop content, Buy now button, admin panel
- Folder on the computer: `C:\Users\sayamaha\Documents\travel-workshop`
- Payment will **fail** until real Razorpay keys are pasted (not the `xxxxxxxx` placeholders)

---

## Who does what

| Person | Job |
|--------|-----|
| **Siddhi** | Razorpay account + KYC (her PAN, Aadhaar, bank). Later she can hand keys to Sayali. |
| **Sayali** | Paste keys in `.env.local`, restart site, help with domain + Vercel. |
| **Akash** | Optional later: his own Razorpay + KYC if money should go to him. |

---

## Part A — Siddhi: Razorpay account (now)

### A1. Sign up

1. Open https://razorpay.com → **Sign Up**
2. Use **Siddhi’s** mobile + email (OTP)
3. Set a password and save it

### A2. Business type

- Choose **Individual** (or Individual / Freelancer / Unregistered)
- Do **not** choose Private Limited / LLP unless you have a company
- **Brand name** (short, for the payment screen): `Akasheyess`

### A3. Where you accept payments

On **Accept Payments on**, tick **only**:

- **Website**
- Optional: WhatsApp / Email, or Instagram

**Untick:** Android App, iOS App

### A4. Website and app links

- You may **not** have a public `https://` site yet
- **Do not** enter `localhost`
- **Do not** invent Play Store / App Store links
- Tap **Add later** if they ask for a website URL now (live activation may take extra days until a real URL is added)
- Best later: paste the live site URL, e.g. `https://something.vercel.app` or your domain

### A5. CKYC mobile mismatch (if it appears)

If it says the mobile does not match Central KYC:

- **Do not** use an old number that belongs to someone else
- **Do not** tap Generate OTP on a wrong number
- Tap **Continue without CKYC**
- That means: skip auto-fill; upload documents yourself (normal)

### A6. Documents for **Siddhi** (real money)

Razorpay needs **Siddhi’s** papers (the person whose bank will receive ₹799):

- **PAN** — plastic card **or e-PAN PDF** from https://eportal.incometax.gov.in
- **Aadhaar** — plastic card **or** DigiLocker / mAadhaar / UIDAI download
- **Bank** — account in **Siddhi’s name**, same as PAN name; cancelled cheque or passbook

No PAN + no Aadhaar (not even digital) = **Video KYC cannot finish**. Get e-PAN / DigiLocker first.

Name on PAN, Aadhaar, and bank must **match**.

### A7. After KYC is submitted

- Status: Under review (often **1–3 business days**, sometimes more)
- Sunday is not a business day

### A8. API keys

**Test keys** (often available before KYC is fully live):

1. Laptop: https://dashboard.razorpay.com
2. Top: **Test Mode**
3. **Settings → API Keys → Generate**
4. Copy:
   - Key ID = `rzp_test_....`
   - Key Secret = shown once; save in Notes (do not put in WhatsApp group if possible)

**Live keys** (real money) — only after KYC **Approved**:

1. Switch to **Live Mode**
2. Generate keys starting with `rzp_live_....`

Send Key ID to Sayali. **Prefer not to send Key Secret on WhatsApp**; type it together on the laptop.

---

## Part B — Sayali: put keys in the website

File: `C:\Users\sayamaha\Documents\travel-workshop\.env.local`

```
RAZORPAY_KEY_ID=paste_key_id_here
RAZORPAY_KEY_SECRET=paste_secret_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=paste_same_key_id_here
ORGANIZER_EMAIL=Dalvisiddhi51@gmail.com
```

`RAZORPAY_KEY_ID` and `NEXT_PUBLIC_RAZORPAY_KEY_ID` must be **identical**.

Then:

```
cd C:\Users\sayamaha\Documents\travel-workshop
```

Stop the server (Ctrl+C) if it is running, then:

```
npm run dev
```

Test: http://localhost:3000/register → Buy now  

**Test card:** `4111 1111 1111 1111` (any future expiry, any CVV) — no real money.

---

## Part C — Website live (people open a real link)

This is separate from Razorpay KYC.

1. Create a **GitHub** account and a repo for this folder  
2. Sign up **https://vercel.com** with GitHub  
3. Import the project, add the same env variables as `.env.local`  
4. Deploy → get a URL like `https://xxxx.vercel.app`  
5. Optional: buy a domain (usually **same day**; DNS sometimes minutes–48 hours) and connect it in Vercel  

**Tomorrow morning:** a Vercel URL is realistic.  
**Real money:** only after Siddhi’s **live** keys + KYC approved + `https://` site URL in Razorpay if they ask again.

---

## Part D — Later: switch payments to Akash

1. Akash creates **his** Razorpay and finishes **his** KYC (his PAN, Aadhaar, his bank)  
2. Replace the three Razorpay lines with Akash’s keys (local + Vercel)  
3. Redeploy / restart  

New payments → Akash’s bank.  
Old payments stay in Siddhi’s Razorpay. Refunds for old payments stay with Siddhi’s account.

---

## Part E — Email and WhatsApp (after payment works)

- **Email:** Resend.com API key in `.env.local` (`RESEND_API_KEY`, `ORGANIZER_EMAIL`)  
- **WhatsApp auto-message:** needs Interakt (or similar), not personal WhatsApp  

Do this after Buy now works.

---

## Honest timeline

| Goal | When |
|------|------|
| Site on internet (Vercel) | Tonight / tomorrow morning |
| Test payment | Same day as test keys |
| Real ₹799 | After Siddhi KYC — usually 1–3+ **business** days |

---

## Siddhi’s checklist (print this)

- [ ] Razorpay signup (her phone + email)  
- [ ] Business type: Individual  
- [ ] Brand name: Akasheyess  
- [ ] Payments on: Website only (no apps)  
- [ ] Website URL: Add later or Vercel `https://`  
- [ ] If CKYC fails: Continue without CKYC  
- [ ] e-PAN + Aadhaar (digital OK) + her bank proof  
- [ ] Submit KYC  
- [ ] Test API keys → give to Sayali  
- [ ] After approval: Live keys → replace in `.env.local` and Vercel  

Questions: send Sayali a **screenshot** of the Razorpay screen (hide PAN/Aadhaar numbers if you can).
