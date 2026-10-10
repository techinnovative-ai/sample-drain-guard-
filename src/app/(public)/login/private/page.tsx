import type { Metadata } from "next";
import AuthPortal from "@/components/AuthPortal";

export const metadata: Metadata = { title: "Private Organisation Sign In" };

export default function PrivateLoginPage() {
  return <AuthPortal portal="private" />;
}
