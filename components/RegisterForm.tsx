"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

type WorkshopInfo = {
  title: string;
  price: number;
  dates: string;
  registrationOpen: boolean;
};

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

export default function RegisterForm({
  workshop,
  razorpayKeyId,
}: {
  workshop: WorkshopInfo;
  razorpayKeyId: string;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Could not start payment");
      }

      if (!window.Razorpay) {
        throw new Error("Payment system failed to load. Please refresh and try again.");
      }

      const options = {
        key: razorpayKeyId,
        amount: data.amount,
        currency: data.currency,
        name: "Storytelling Workshop with Akash",
        description: workshop.title,
        order_id: data.orderId,
        prefill: { name, email, contact: phone },
        theme: { color: "#1558a8" },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          const verify = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              registrationId: data.registrationId,
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verify.json();
          if (!verify.ok) {
            setError(verifyData.error ?? "Payment verification failed");
            setLoading(false);
            return;
          }

          router.push(`/thank-you?reg=${data.registrationId}`);
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
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
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white p-6 shadow-lg sm:p-8"
      >
        <h2 className="font-display text-2xl font-bold text-ink-950">Register & Pay</h2>
        <p className="mt-2 text-sm text-ink-600">
          {workshop.dates} · ₹{workshop.price} · You&apos;ll get email & WhatsApp confirmation
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-ink-700">
              Full name *
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-brand-200 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink-700">
              Email *
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-brand-200 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              placeholder="you@email.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-ink-700">
              WhatsApp number *
            </label>
            <input
              id="phone"
              type="tel"
              required
              pattern="[0-9+\s-]{10,15}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-lg border border-brand-200 px-4 py-3 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              placeholder="10-digit mobile number"
            />
            <p className="mt-1 text-xs text-ink-500">Workshop details will be sent here</p>
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-brand-600 py-4 text-lg font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
        >
          {loading ? "Opening payment…" : `Pay ₹${workshop.price} & Register`}
        </button>

        <p className="mt-4 text-center text-xs text-ink-500">
          Secure payment by Razorpay · UPI, cards, netbanking
        </p>
      </form>
    </>
  );
}
