import type { Metadata } from "next";

import { AdminPortal } from "@/components/admin/admin-portal";

export const metadata: Metadata = {
  title: "Contact Enquiries | Admin",
  description: "Secure Ignited Brains contact enquiry administration.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default function AdminSectionPage() {
  return <AdminPortal initialTab="contacts" />;
}
