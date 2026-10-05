"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type WorkshopInfo = {
  title: string;
  price: number;
  workshopPrice: number;
  travelPrice: number;
  advanceAmount: number;
  balanceDueDate: string;
  dates: string;
  travelDates: string;
  registrationOpen: boolean;
  defaultPackage?: "workshop" | "travel";
};

export default function RegisterForm({ workshop }: { workshop: WorkshopInfo }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [packageType, setPackageType] = useState<"workshop" | "travel">(
    workshop.defaultPackage ?? "workshop"
  );
  const [paymentOption, setPaymentOption] = useState<"advance" | "full">("advance");

  const totalPackageFee =
    packageType === "travel" ? workshop.travelPrice : workshop.workshopPrice;
  const payableAmount =
    paymentOption === "advance" ? workshop.advanceAmount : totalPackageFee;
  const remainingAmount =
    paymentOption === "advance" ? totalPackageFee - workshop.advanceAmount : 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const form = e.currentTarget as HTMLFormElement;
      const res = await fetch("/api/register-manual", {
        method: "POST",
        body: new FormData(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Could not submit registration");
      }
      router.push(`/thank-you?manual=1&reg=${data.registrationId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  if (!workshop.registrationOpen) {
    return (
      <div className="rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-sm">
        <p className="text-lg text-stone-700">Registration is currently closed.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* Hidden input fields sent with form */}
      <input type="hidden" name="packageType" value={packageType} />
      <input type="hidden" name="paymentOption" value={paymentOption} />
      <input type="hidden" name="amount" value={payableAmount} />

      {/* Workshop Overview Card */}
      <div className="rounded-3xl border border-amber-300 bg-white p-6 shadow-xl sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-amber-400 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-stone-950">
            Strictly 10 Seats
          </span>
          <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">
            Hampi Practical Workshop
          </span>
        </div>
        <h1 className="font-hand mt-4 text-3xl font-bold leading-tight text-stone-950 sm:text-4xl">
          Content Creation &amp; Storytelling Workshop in Hampi
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-700 sm:text-base">
          Join Akash Mahale and special mentor Siddhi Dalvi for a 3-day practical, experiential
          workshop in Hampi. Select your package below and book your slot with a flexible ₹5,000
          advance payment.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-stone-200 pt-4 text-xs font-medium text-stone-800 sm:text-sm">
          <span>🗓️ Workshop: {workshop.dates}</span>
          <span>🚌 Travel Package: {workshop.travelDates}</span>
          <span>📍 Hampi, Karnataka</span>
        </div>
      </div>

      {/* STEP 1: SELECT PACKAGE */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xl sm:p-8">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
          Step 1
        </span>
        <h2 className="font-hand mt-1 text-2xl font-bold text-stone-950 sm:text-3xl">
          Select Your Package
        </h2>
        <p className="mt-1 text-xs text-stone-600 sm:text-sm">
          Choose whether you want workshop-only or the all-inclusive travel package from Mumbai &amp; Pune.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {/* Option A: Workshop Only */}
          <label
            className={`relative flex cursor-pointer flex-col justify-between rounded-2xl border-2 p-5 transition ${
              packageType === "workshop"
                ? "border-amber-500 bg-amber-50/70 shadow-md"
                : "border-stone-200 bg-stone-50/50 hover:border-amber-300"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="rounded bg-stone-200/80 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-stone-800">
                  Option 1 · Self Travel
                </span>
                <h3 className="font-hand mt-2 text-2xl font-bold text-stone-950">
                  Workshop Fee
                </h3>
                <p className="text-xs text-stone-600">31st Oct – 2nd Nov</p>
              </div>
              <input
                type="radio"
                name="_pkg_choice"
                value="workshop"
                checked={packageType === "workshop"}
                onChange={() => setPackageType("workshop")}
                className="mt-1 h-5 w-5 text-amber-500 focus:ring-amber-400"
              />
            </div>
            <div className="mt-4 border-t border-stone-200/80 pt-3">
              <p className="font-hand text-3xl font-bold text-stone-950">₹21,999</p>
              <p className="mt-1 text-xs text-stone-600">
                Includes all sessions, 2 stays, all meals. Reach Hampi on your own.
              </p>
            </div>
          </label>

          {/* Option B: Travel Included */}
          <label
            className={`relative flex cursor-pointer flex-col justify-between rounded-2xl border-2 p-5 transition ${
              packageType === "travel"
                ? "border-amber-500 bg-amber-50/70 shadow-md"
                : "border-stone-200 bg-stone-50/50 hover:border-amber-300"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="rounded bg-amber-200 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-amber-950">
                  Option 2 · With AC Bus
                </span>
                <h3 className="font-hand mt-2 text-2xl font-bold text-stone-950">
                  Travel Included
                </h3>
                <p className="text-xs text-stone-600">30th Oct – 3rd Nov</p>
              </div>
              <input
                type="radio"
                name="_pkg_choice"
                value="travel"
                checked={packageType === "travel"}
                onChange={() => setPackageType("travel")}
                className="mt-1 h-5 w-5 text-amber-500 focus:ring-amber-400"
              />
            </div>
            <div className="mt-4 border-t border-stone-200/80 pt-3">
              <p className="font-hand text-3xl font-bold text-amber-700">₹24,999</p>
              <p className="mt-1 text-xs text-stone-600">
                Workshop + AC Bus travel from Mumbai/Pune + direct local transfers.
              </p>
            </div>
          </label>
        </div>

        {/* STEP 2: PAYMENT PLAN CHOICE */}
        <div className="mt-6 border-t border-stone-200 pt-6">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Step 2 · Payment Option
          </span>
          <h3 className="font-hand mt-1 text-xl font-bold text-stone-950 sm:text-2xl">
            How would you like to pay?
          </h3>

          <div className="mt-3 space-y-3">
            <label
              className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition ${
                paymentOption === "advance"
                  ? "border-amber-500 bg-amber-50/70"
                  : "border-stone-200 hover:border-amber-300"
              }`}
            >
              <input
                type="radio"
                name="_pay_choice"
                value="advance"
                checked={paymentOption === "advance"}
                onChange={() => setPaymentOption("advance")}
                className="mt-1 h-5 w-5 text-amber-500 focus:ring-amber-400"
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-bold text-stone-900 sm:text-base">
                    Pay ₹5,000 Advance to lock your slot today
                  </p>
                  <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                    Recommended
                  </span>
                </div>
                <p className="mt-1 text-xs text-stone-600 sm:text-sm">
                  Remaining balance of <strong>₹{remainingAmount.toLocaleString("en-IN")}</strong> is
                  payable before <strong>{workshop.balanceDueDate}</strong>.
                </p>
              </div>
            </label>

            <label
              className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition ${
                paymentOption === "full"
                  ? "border-amber-500 bg-amber-50/70"
                  : "border-stone-200 hover:border-amber-300"
              }`}
            >
              <input
                type="radio"
                name="_pay_choice"
                value="full"
                checked={paymentOption === "full"}
                onChange={() => setPaymentOption("full")}
                className="mt-1 h-5 w-5 text-amber-500 focus:ring-amber-400"
              />
              <div className="flex-1">
                <p className="text-sm font-bold text-stone-900 sm:text-base">
                  Pay Full Amount — ₹{totalPackageFee.toLocaleString("en-IN")}
                </p>
                <p className="mt-1 text-xs text-stone-600">
                  Complete 100% payment now with zero pending dues.
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Participant Details */}
      <FormCard title="3. Your details">
        <TextField name="name" label="What's your full name?" autoComplete="name" />
        <TextField name="email" label="Email address" type="email" autoComplete="email" />
        <TextField name="phone" label="WhatsApp contact number" type="tel" autoComplete="tel" />
        <TextField name="age" label="What's your age?" type="number" />
        <TextField name="location" label="Which city/town are you currently based in?" />
        {packageType === "travel" ? (
          <RadioGroup
            name="busBoarding"
            label="Bus Pick-up Location:"
            options={[
              "Mumbai Pick-up (30th Oct evening)",
              "Pune Pick-up (30th Oct night)",
            ]}
          />
        ) : (
          <RadioGroup
            name="busBoarding"
            label="Travel Mode:"
            options={[
              "I will travel directly to Hampi on my own",
            ]}
          />
        )}
        <TextField name="socialLink" label="Your Instagram handle or YouTube channel link" />
      </FormCard>

      {/* Creative Background */}
      <FormCard title="4. Tell us about your creative journey">
        <RadioGroup
          name="experience"
          label="How would you describe your content creation experience?"
          options={[
            "I'm just starting / haven't posted yet",
            "Beginner — I've started posting occasionally",
            "Intermediate — I create & post regularly",
            "Experienced — I already have an active audience",
          ]}
        />
        <TextArea
          name="biggestChallenge"
          label="What is your biggest creative or technical challenge right now?"
        />
        <RadioGroup
          name="learningGoal"
          label="If you could leave this Hampi workshop having mastered ONE thing, what would it be?"
          options={[
            "Finding stories & overcoming creative block",
            "Scriptwriting & hooks that keep viewers hooked",
            "Visual framing, camera angles & cinematic B-rolls",
            "Voiceover modulation, confidence & narration",
            "Advanced editing timeline, sound design & pacing",
          ]}
        />
        <TextArea
          name="favoriteAkashContent"
          label="What is your favourite video or series by Akash, and what resonated with you?"
        />
      </FormCard>

      {/* Payment & QR Card */}
      <div className="rounded-3xl border-2 border-amber-400 bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full bg-amber-400 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-stone-950">
            Payment &amp; Confirmation
          </span>
          <span className="text-xs font-semibold text-stone-500">
            {packageType === "travel" ? "Travel Package" : "Workshop Package"}
          </span>
        </div>

        <h2 className="font-hand mt-3 text-3xl font-bold text-stone-950 sm:text-4xl">
          Amount to Transfer: ₹{payableAmount.toLocaleString("en-IN")}
        </h2>
        {paymentOption === "advance" && (
          <p className="mt-1 text-xs font-semibold text-amber-800 sm:text-sm">
            ★ ₹5,000 Advance to lock your slot today · Balance ₹{remainingAmount.toLocaleString("en-IN")}{" "}
            payable before {workshop.balanceDueDate}
          </p>
        )}

        <p className="mt-3 text-sm text-stone-700">
          Scan the QR code below using any UPI app (Google Pay, PhonePe, Paytm, BHIM, etc.) or pay
          to the UPI ID. Please write your name in the payment remark.
        </p>

        {/* QR Code Card */}
        <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-stone-200 bg-stone-50 p-6 text-center shadow-md">
          <div className="overflow-hidden rounded-xl border border-stone-300 bg-black">
            <Image
              src="/images/upi-qr-code.png"
              alt="UPI QR Code - Akash Mahale, Canara Bank 4038"
              width={600}
              height={800}
              className="mx-auto h-auto w-full"
            />
          </div>
          <div className="mt-4 border-t border-stone-200 pt-3">
            <p className="text-xs uppercase tracking-wider text-stone-500">Official UPI ID</p>
            <p className="select-all font-mono text-base font-bold text-stone-950 sm:text-lg">
              mahale11akash-1@okicici
            </p>
            <p className="mt-1 text-xs text-stone-600">Akash Mahale · Canara Bank 4038</p>
            <div className="mt-3 inline-block rounded-lg bg-amber-400 px-4 py-1.5 text-xs font-bold text-stone-950">
              Transfer Amount: ₹{payableAmount.toLocaleString("en-IN")}
            </div>
          </div>
        </div>

        {/* Screenshot Upload & Verification */}
        <div className="mt-8 space-y-5 rounded-2xl border border-amber-200 bg-amber-50/40 p-5 shadow-sm">
          <TextField
            name="transactionId"
            label="UPI Transaction ID / 12-digit UTR number *"
            required
          />
          <div>
            <label htmlFor="paymentScreenshot" className="block text-sm font-semibold text-stone-900">
              Upload payment screenshot showing the Transaction ID / UTR *
            </label>
            <input
              id="paymentScreenshot"
              name="paymentScreenshot"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              required
              className="mt-2 block w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-800 file:mr-4 file:rounded-lg file:border-0 file:bg-amber-400 file:px-4 file:py-2 file:text-xs file:font-bold file:text-stone-950 hover:file:bg-amber-300"
            />
            <p className="mt-1.5 text-xs text-stone-500">JPG, PNG, or WebP · Up to 10 MB</p>
          </div>
          <label className="flex items-start gap-3 pt-2 text-sm text-stone-800">
            <input
              type="checkbox"
              name="paymentConfirmed"
              value="yes"
              required
              className="mt-1 h-4 w-4 rounded border-stone-300 text-amber-500 focus:ring-amber-400"
            />
            <span>
              I have transferred <strong>₹{payableAmount.toLocaleString("en-IN")}</strong> to{" "}
              <strong>mahale11akash-1@okicici</strong> and uploaded the genuine payment screenshot.
            </span>
          </label>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          ⚠️ {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 py-4 text-lg font-bold text-stone-950 shadow-xl shadow-amber-500/25 transition hover:shadow-2xl hover:brightness-105 disabled:opacity-60"
      >
        {loading
          ? "Submitting Registration…"
          : `Complete & Submit Registration (₹${payableAmount.toLocaleString("en-IN")}) →`}
      </button>

      <p className="text-center text-xs text-stone-500">
        Your payment screenshot and details are stored securely. You will receive confirmation on
        WhatsApp and email after verification.
      </p>
    </form>
  );
}

function FormCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xl sm:p-8">
      <h2 className="font-hand text-2xl font-bold text-stone-950 sm:text-3xl">{title}</h2>
      <div className="mt-6 space-y-5">{children}</div>
    </div>
  );
}

function TextField({
  name,
  label,
  type = "text",
  autoComplete,
  required = true,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-stone-800">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 block w-full rounded-xl border border-stone-300 bg-stone-50/50 px-4 py-3 text-sm text-stone-900 transition focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/30"
      />
    </div>
  );
}

function TextArea({
  name,
  label,
  required = true,
}: {
  name: string;
  label: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-stone-800">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={3}
        className="mt-2 block w-full rounded-xl border border-stone-300 bg-stone-50/50 px-4 py-3 text-sm text-stone-900 transition focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400/30"
      />
    </div>
  );
}

function RadioGroup({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="block text-sm font-semibold text-stone-800">{label}</legend>
      <div className="mt-2 space-y-2">
        {options.map((opt, i) => (
          <label
            key={opt}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-stone-200 bg-stone-50/60 px-4 py-3 text-sm text-stone-800 transition hover:border-amber-300 hover:bg-amber-50/40"
          >
            <input
              type="radio"
              name={name}
              value={opt}
              defaultChecked={i === 0}
              className="h-4 w-4 border-stone-300 text-amber-500 focus:ring-amber-400"
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
