import type { Metadata } from "next";

import { AdminPortal } from "@/components/admin/admin-portal";

export const metadata: Metadata = {
  title: "Gallery Management | Admin",
  description: "Secure Ignited Brains gallery administration.",
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

export default function GalleryAdminPage() {
  return <AdminPortal initialTab="gallery" />;
}
