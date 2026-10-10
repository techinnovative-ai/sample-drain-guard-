"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/PublicNav";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@drainguard.demo");
  const [password, setPassword] = useState("demo-1234");
  const [busy, setBusy] = useState(false);

  function signIn(role: "Administrator" | "Read-only viewer") {
    setBusy(true);
    localStorage.setItem(
      "dg-session",
      JSON.stringify({ email: role === "Administrator" ? email || "admin@drainguard.demo" : "viewer@drainguard.demo", role, demo: true, at: Date.now() })
    );
    router.push("/app/dashboard");
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-mist px-4 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-neutral-grey bg-white p-8 shadow-sm">
          <div className="flex justify-center"><Logo /></div>
          <h1 className="mt-6 text-center text-2xl font-extrabold text-forest">Sign in to DrainGuard Monitor</h1>
          <p className="mt-2 text-center text-sm text-offline">
            Secure entry to the monitoring application
          </p>

          <div className="mt-6 rounded-lg border border-attn/40 bg-attn-bg p-3 text-xs text-attn">
            <strong className="font-bold uppercase">Demo mode</strong> — this Stage-1 prototype uses a
            simulated sign-in. Production uses Supabase Auth with role-based accounts. Any
            credentials work below.
          </div>

          <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); signIn("Administrator"); }}>
            <label className="block text-sm font-semibold text-forest">
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-neutral-grey px-3 py-2 text-sm font-normal outline-none focus:border-tech" />
            </label>
            <label className="block text-sm font-semibold text-forest">
              Password
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-neutral-grey px-3 py-2 text-sm font-normal outline-none focus:border-tech" />
            </label>
            <button disabled={busy}
              className="w-full rounded-lg bg-forest px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-forest-700 disabled:opacity-60">
              {busy ? "Signing in…" : "Sign in as Administrator"}
            </button>
          </form>

          <button onClick={() => signIn("Read-only viewer")} disabled={busy}
            className="mt-3 w-full rounded-lg border border-neutral-grey px-4 py-2.5 text-sm font-semibold text-forest transition-colors hover:bg-mist">
            Continue as read-only demonstration viewer
          </button>
        </div>
        <p className="mt-4 text-center text-xs text-offline">
          Roles: Administrator · Drainage operator · Maintenance worker · Read-only viewer
        </p>
      </div>
    </div>
  );
}
