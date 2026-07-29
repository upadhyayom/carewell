import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth";

export const metadata: Metadata = {
  title: { default: "CareWell Dental Clinic", template: "%s · CareWell Dental Clinic" },
  description: "The all-in-one growth platform for CareWell Dental Clinic.",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
