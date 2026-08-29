"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type WorkshopInfo = {
  title: string;
  price: number;
  dates: string;
  registrationOpen: boolean;
};

export default function RegisterForm({
  workshop,
}: {
  workshop: WorkshopInfo;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="text-lg text-ink-700">Registration is currently closed.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <h1 className="font-display text-3xl font-bold text-ink-950">
          The Art of Storytelling Content Online Workshop with Akash Eyes!
        </h1>
        <p className="mt-4 text-ink-700">
          Join Akash for a beginner-friendly, 2-day online workshop where he will share the
          skills and motivation you need to create, experiment, and find your own style.
        </p>
        <p className="mt-5 font-semibold text-ink-900">{workshop.dates}</p>
        <p className="mt-1 text-sm text-ink-600">Limited seats available</p>
      </div>

      <FormCard title="Your details">
        <TextField name="name" label="What's your name?" autoComplete="name" />
        <TextField name="email" label="Email address" type="email" autoComplete="email" />
        <TextField name="phone" label="WhatsApp number" type="tel" autoComplete="tel" />
        <TextField name="age" label="What's your age?" type="number" />
        <TextField name="location" label="What is your location?" />
        <TextField name="socialLink" label="Your Instagram handle or YouTube link" />
      </FormCard>

      <FormCard title="Tell us about your content">
        <RadioGroup
          name="experience"
          label="How would you describe your content creation experience?"
          options={[
            "I'm just starting / haven't posted yet",
            "Beginner — I've started posting",
            "Intermediate — I post regularly",
            "Experienced — I already have an audience",
          ]}
        />
        <TextArea
          name="biggestChallenge"
          label="What is your biggest challenge when you create content?"
        />
        <RadioGroup
          name="learningGoal"
          label="If you could leave this workshop having mastered ONE thing, what would it be?"
          options={[
            "I don't know what to create or start",
            "I struggle with finding stories",
            "Script Writing",
            "Voiceover / Narration",
            "Editing",
          ]}
        />
        <TextArea
          name="favoriteAkashContent"
          label="What is your favourite thing about Akash's content and why?"
        />
      </FormCard>

      <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-6 shadow-lg sm:p-8">
        <h2 className="font-display text-2xl font-bold text-ink-950">Ready to join us?</h2>
        <p className="mt-3 text-ink-700">
          Confirm your spot by paying <strong>₹{workshop.price}</strong> with any UPI app.
          Mention your name while making the payment.
        </p>
        <div className="mx-auto mt-6 max-w-sm rounded-2xl bg-white p-5 text-center shadow-sm">
          <Image
            src="/images/payment-qr.png"
            alt="UPI QR code for payment to Akash Mahale"
            width={500}
            height={500}
            className="mx-auto w-full"
          />
          <p className="mt-4 text-sm text-ink-600">UPI ID</p>
          <p className="break-all font-semibold text-ink-950">mahale11akash-1@okicici</p>
          <p className="mt-3 text-sm text-ink-600">
            Regular price: <span className="line-through">₹1500</span> · Workshop price:{" "}
            <strong>₹{workshop.price}</strong>
          </p>
        </div>

        <div className="mt-6 space-y-5">
          <TextField name="transactionId" label="UPI transaction ID / reference number" />
          <div>
            <label htmlFor="paymentScreenshot" className="block text-sm font-medium text-ink-800">
              Upload payment screenshot showing the transaction ID *
            </label>
            <input
              id="paymentScreenshot"
              name="paymentScreenshot"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              required
              className="mt-2 block w-full rounded-lg border border-amber-300 bg-white px-4 py-3 text-sm"
            />
            <p className="mt-1 text-xs text-ink-600">JPG, PNG, or WebP · Maximum 10 MB</p>
          </div>
          <label className="flex items-start gap-3 text-sm text-ink-800">
            <input
              type="checkbox"
              name="paymentConfirmed"
              value="yes"
              required
              className="mt-1 h-4 w-4"
            />
            <span>I have completed the ₹{workshop.price} payment and uploaded its screenshot.</span>
          </label>
        </div>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-brand-600 py-4 text-lg font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
      >
        {loading ? "Submitting…" : "Done — Submit Registration"}
      </button>
      <p className="text-center text-xs text-ink-500">
        Your payment screenshot is stored securely and is visible only to the workshop admin.
      </p>
    </form>
  );
}

function FormCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
      <h2 className="font-display text-2xl font-bold text-ink-950">{title}</h2>
      <div className="mt-6 space-y-5">{children}</div>
    </div>
  );
}

function TextField({
  name,
  label,
  type = "text",
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-ink-700">
        {label} *
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        className="mt-1 w-full rounded-lg border border-brand-200 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
      />
    </div>
  );
}

function TextArea({ name, label }: { name: string; label: string }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-ink-700">
        {label} *
      </label>
      <textarea
        id={name}
        name={name}
        rows={4}
        required
        className="mt-1 w-full rounded-lg border border-brand-200 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
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
    <fieldset>
      <legend className="text-sm font-medium text-ink-700">{label} *</legend>
      <div className="mt-3 space-y-3">
        {options.map((option) => (
          <label key={option} className="flex items-start gap-3 text-sm text-ink-800">
            <input type="radio" name={name} value={option} required className="mt-0.5 h-4 w-4" />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
