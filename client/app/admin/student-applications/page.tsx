import type { Metadata } from "next";

import { AdminPortal } from "@/components/admin/admin-portal";

export const metadata: Metadata = {
  title: "Student Applications | Admin",
  description: "Secure Ignited Brains student application administration.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default function AdminSectionPage() {
  return <AdminPortal initialTab="student-applications" />;
}
