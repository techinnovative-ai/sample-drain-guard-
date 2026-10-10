import type { Metadata } from "next";
import AuthPortal from "@/components/AuthPortal";

export const metadata: Metadata = { title: "Government & Municipal Sign In" };

export default function GovernmentLoginPage() {
  return <AuthPortal portal="government" />;
}
