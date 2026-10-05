import type { Metadata } from "next";
import { ApplicationWizard } from "@/components/applications/application-wizard";

export const metadata: Metadata = {
  title: "Student Application",
  description:
    "Share your project idea and explore learning opportunities with Ignited Brains.",
  robots: { index: false, follow: true },
};

export default function StudentApplicationPage() {
  return <ApplicationWizard applicantType="STUDENT" />;
}
