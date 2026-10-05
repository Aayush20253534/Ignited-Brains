import type { Metadata } from "next";
import { ApplicationWizard } from "@/components/applications/application-wizard";

export const metadata: Metadata = {
  title: "Organisation Application",
  description:
    "Partner with Ignited Brains to create hands-on learning environments for your institution.",
  robots: { index: false, follow: true },
};

export default function OrganisationApplicationPage() {
  return <ApplicationWizard applicantType="ORGANIZATION" />;
}
