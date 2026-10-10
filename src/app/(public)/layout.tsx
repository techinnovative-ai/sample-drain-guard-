import Link from "next/link";
import PublicNav, { Logo } from "@/components/PublicNav";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicNav />
      <main className="flex-1">{children}</main>
      <footer className="bg-forest text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
          <div>
            <Logo dark />
            <p className="mt-3 text-sm text-white/70">
              Smart Drainage Intelligence Platform. Physical protection, sensing and explainable
              AI for storm-drain monitoring.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white/60">Project</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link className="hover:text-tech" href="/how-it-works">How It Works</Link></li>
              <li><Link className="hover:text-tech" href="/technology">Technology</Link></li>
              <li><Link className="hover:text-tech" href="/features">Features</Link></li>
              <li><Link className="hover:text-tech" href="/impact">Impact</Link></li>
              <li><Link className="hover:text-tech" href="/prototype">Prototype</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white/60">Platform</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link className="hover:text-tech" href="/login">Sign In</Link></li>
              <li><Link className="hover:text-tech" href="/app/dashboard">Monitoring Dashboard</Link></li>
              <li><Link className="hover:text-tech" href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white/60">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link className="hover:text-tech" href="/privacy">Privacy</Link></li>
              <li><Link className="hover:text-tech" href="/terms">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/50">
          © {new Date().getFullYear()} DrainGuard student project. Demonstration platform —
          drainage safety must never depend on cloud connectivity.
        </div>
      </footer>
    </div>
  );
}
