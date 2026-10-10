import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DrainGuard — Smart Drainage Intelligence Platform",
    template: "%s · DrainGuard",
  },
  description:
    "AI-integrated intelligent storm-drain protection and monitoring system. Smarter drains, earlier warnings, better monitoring.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
