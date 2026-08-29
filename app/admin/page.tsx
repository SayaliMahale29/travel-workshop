"use client";

import { useEffect, useState } from "react";
import type { Registration, SiteContent } from "@/lib/types";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<"content" | "registrations">("content");

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setLoginError("Wrong password");
      return;
    }
    setLoggedIn(true);
    loadData();
  }

  async function loadData() {
    const res = await fetch("/api/admin/content");
    if (!res.ok) return;
    const data = await res.json();
    setContent(data.content);
    setRegistrations(data.registrations);
  }

  async function saveContent() {
    if (!content) return;
    setSaving(true);
    setSaved(false);
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    if (res.ok) setSaved(true);
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setLoggedIn(false);
    setContent(null);
  }

  useEffect(() => {
    loadData().then(() => {
      fetch("/api/admin/content").then((r) => {
        if (r.ok) setLoggedIn(true);
      });
    });
  }, []);

  if (!loggedIn) {
    return (
      <section className="section-padding min-h-[70vh]">
        <div className="container-text">
          <form onSubmit={login} className="mx-auto max-w-sm rounded-2xl bg-white p-8 shadow-lg">
            <h1 className="font-display text-2xl font-bold">Admin login</h1>
            <p className="mt-2 text-sm text-ink-600">For Akasheyess — edit workshop content</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="mt-6 w-full rounded-lg border border-brand-200 px-4 py-3"
              required
            />
            {loginError && <p className="mt-2 text-sm text-red-600">{loginError}</p>}
            <button
              type="submit"
              className="mt-4 w-full rounded-full bg-brand-600 py-3 font-semibold text-white"
            >
              Login
            </button>
          </form>
        </div>
      </section>
    );
  }

  if (!content) return <p className="p-8 text-center">Loading…</p>;

  return (
    <section className="section-padding bg-brand-50/30 min-h-screen">
      <div className="container-narrow">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-2xl font-bold">Workshop admin</h1>
          <button onClick={logout} className="text-sm text-ink-500 hover:text-brand-600">
            Logout
          </button>
        </div>

        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setTab("content")}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              tab === "content" ? "bg-brand-600 text-white" : "bg-white text-ink-700"
            }`}
          >
            Edit content
          </button>
          <button
            onClick={() => setTab("registrations")}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              tab === "registrations" ? "bg-brand-600 text-white" : "bg-white text-ink-700"
            }`}
          >
            Paid registrations ({registrations.length})
          </button>
        </div>

        {tab === "content" && (
          <div className="space-y-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <div>
              <label className="block text-sm font-medium">Workshop dates</label>
              <input
                value={content.workshop.dates}
                onChange={(e) =>
                  setContent({
                    ...content,
                    workshop: { ...content.workshop, dates: e.target.value },
                  })
                }
                className="mt-1 w-full rounded-lg border px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Time</label>
              <input
                value={content.workshop.time}
                onChange={(e) =>
                  setContent({
                    ...content,
                    workshop: { ...content.workshop, time: e.target.value },
                  })
                }
                className="mt-1 w-full rounded-lg border px-4 py-2"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium">Price (₹)</label>
                <input
                  type="number"
                  value={content.workshop.price}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      workshop: { ...content.workshop, price: Number(e.target.value) },
                    })
                  }
                  className="mt-1 w-full rounded-lg border px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Original price (₹)</label>
                <input
                  type="number"
                  value={content.workshop.originalPrice}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      workshop: {
                        ...content.workshop,
                        originalPrice: Number(e.target.value),
                      },
                    })
                  }
                  className="mt-1 w-full rounded-lg border px-4 py-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Join details (sent after payment)</label>
              <textarea
                value={content.workshop.joinDetails}
                onChange={(e) =>
                  setContent({
                    ...content,
                    workshop: { ...content.workshop, joinDetails: e.target.value },
                  })
                }
                rows={3}
                className="mt-1 w-full rounded-lg border px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Creator intro</label>
              <textarea
                value={content.creator.intro}
                onChange={(e) =>
                  setContent({
                    ...content,
                    creator: { ...content.creator, intro: e.target.value },
                  })
                }
                rows={4}
                className="mt-1 w-full rounded-lg border px-4 py-2"
              />
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={content.workshop.registrationOpen}
                onChange={(e) =>
                  setContent({
                    ...content,
                    workshop: { ...content.workshop, registrationOpen: e.target.checked },
                  })
                }
              />
              <span className="text-sm">Registration open</span>
            </label>
            <button
              onClick={saveContent}
              disabled={saving}
              className="rounded-full bg-brand-600 px-6 py-3 font-semibold text-white disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
            {saved && <p className="text-sm text-green-600">Saved!</p>}
          </div>
        )}

        {tab === "registrations" && (
          <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-brand-50">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Paid at</th>
                </tr>
              </thead>
              <tbody>
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-ink-500">
                      No paid registrations yet
                    </td>
                  </tr>
                ) : (
                  registrations.map((r) => (
                    <tr key={r.id} className="border-b">
                      <td className="p-4">{r.name}</td>
                      <td className="p-4">{r.email}</td>
                      <td className="p-4">{r.phone}</td>
                      <td className="p-4">₹{r.amount}</td>
                      <td className="p-4">{r.paidAt ? new Date(r.paidAt).toLocaleString() : "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
