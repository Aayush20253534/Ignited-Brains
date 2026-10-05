import type { ApplicantType } from "@/components/layout/application-choices";
import type { PortalIconName } from "@/components/ui/portal-icon";

export const organizationSolutions = [
  ["SCIENCE_KITS", "Science Kits"],
  ["SCIENCE_PARK", "Science Park"],
  ["SPACE_LAB", "Space Lab"],
  ["STEM_LAB", "STEM Lab"],
  ["WORKSHOP_TRAINING", "Workshops & Training"],
  ["TEACHER_TRAINING", "Teacher Training"],
  ["CUSTOM", "Custom Requirement"],
] as const;

export type ApplicationField = {
  name: string;
  label: string;
  icon: PortalIconName;
  required?: boolean;
  placeholder?: string;
  kind?: "email" | "tel" | "number" | "textarea" | "select" | "solutions";
  options?: readonly (readonly [string, string])[];
  autoComplete?: string;
  maxLength?: number;
  full?: boolean;
  hint?: string;
};

export type ApplicationStep = {
  title: string;
  subtitle: string;
  description: string;
  fields: ApplicationField[];
};
export type ApplicationValues = Record<string, string | string[]>;

const name: ApplicationField = {
  name: "name",
  label: "Full Name",
  icon: "person",
  required: true,
  placeholder: "Enter your full name",
  autoComplete: "name",
  maxLength: 120,
};
const email: ApplicationField = {
  name: "email",
  label: "Email Address",
  icon: "email",
  kind: "email",
  required: true,
  placeholder: "yourname@example.com",
  autoComplete: "email",
  maxLength: 320,
};
const phone: ApplicationField = {
  name: "phone",
  label: "Phone Number",
  icon: "phone",
  kind: "tel",
  required: true,
  placeholder: "+91 98765 43210",
  autoComplete: "tel",
  maxLength: 32,
};
const city: ApplicationField = {
  name: "city",
  label: "City",
  icon: "location",
  placeholder: "Enter your city",
  autoComplete: "address-level2",
  maxLength: 120,
};
const state: ApplicationField = {
  name: "state",
  label: "State",
  icon: "location",
  placeholder: "Enter your state",
  autoComplete: "address-level1",
  maxLength: 120,
};
const additionalMessage: ApplicationField = {
  name: "additionalMessage",
  label: "Additional Message",
  icon: "document",
  kind: "textarea",
  full: true,
  placeholder: "Anything else you would like our team to know?",
  maxLength: 3000,
};
const review: ApplicationStep = {
  title: "Review & Submit",
  subtitle: "Confirm and submit application",
  description:
    "Take a moment to check your details before sending your application.",
  fields: [],
};

export const studentSteps: ApplicationStep[] = [
  {
    title: "Personal Information",
    subtitle: "Tell us about yourself",
    description: "Let’s start with some basic details about you.",
    fields: [name, email, phone, city, state],
  },
  {
    title: "Academic Details",
    subtitle: "Your education information",
    description: "Tell us where you learn and your current education level.",
    fields: [
      {
        name: "institutionName",
        label: "School / Institution Name",
        icon: "institution",
        required: true,
        placeholder: "Enter your school or institution name",
        autoComplete: "organization",
        maxLength: 180,
        full: true,
      },
      {
        name: "educationLevel",
        label: "Current Class / Education Level",
        icon: "graduation",
        required: true,
        placeholder: "e.g. Class 11, undergraduate",
        maxLength: 100,
      },
      {
        name: "institutionCity",
        label: "Institution City",
        icon: "location",
        placeholder: "City of your school or college",
        maxLength: 120,
      },
    ],
  },
  {
    title: "Interest Areas",
    subtitle: "Areas you are interested in",
    description:
      "What sparks your curiosity? Tell us what you would like to explore.",
    fields: [
      {
        name: "interestArea",
        label: "Area of Interest",
        icon: "idea",
        required: true,
        full: true,
        placeholder: "e.g. Astronomy, STEM, AI or robotics",
        maxLength: 180,
        hint: "You can include more than one interest.",
      },
    ],
  },
  {
    title: "Project / Idea Details",
    subtitle: "Tell us about your idea",
    description: "Every opportunity starts with an idea. Share yours with us.",
    fields: [
      {
        name: "proposalDetails",
        label: "Your Project Idea / Proposal",
        icon: "idea",
        kind: "textarea",
        required: true,
        full: true,
        placeholder:
          "Describe your idea, what you hope to learn and how you would like to work with us.",
        maxLength: 5000,
      },
    ],
  },
  {
    title: "Additional Information",
    subtitle: "Questions and preferences",
    description:
      "Help us understand how we can support you and your institution.",
    fields: [
      {
        name: "wantsInstitutionSetup",
        label: "Interested in a setup at your institution?",
        icon: "institution",
        kind: "select",
        full: true,
        options: [
          ["no", "No / not at the moment"],
          ["yes", "Yes"],
        ],
      },
      {
        name: "setupInterest",
        label: "Setup / Programme Interest",
        icon: "settings",
        full: true,
        placeholder: "e.g. Space lab, robotics lab or workshops",
        maxLength: 500,
      },
      additionalMessage,
    ],
  },
  review,
];

export const organizationSteps: ApplicationStep[] = [
  {
    title: "Institution Details",
    subtitle: "Basic information about your organisation",
    description:
      "Tell us about your organisation to help us understand your context better.",
    fields: [
      {
        name: "organizationName",
        label: "Organisation / Institution Name",
        icon: "institution",
        required: true,
        placeholder: "Enter your organisation’s name",
        autoComplete: "organization",
        maxLength: 180,
      },
      {
        name: "organizationType",
        label: "Type of Institution",
        icon: "graduation",
        kind: "select",
        required: true,
        placeholder: "Select institution type",
        options: [
          ["SCHOOL", "School"],
          ["COLLEGE", "College"],
          ["UNIVERSITY", "University"],
          ["GOVERNMENT", "Government"],
          ["NGO", "NGO"],
          ["COMPANY", "Company"],
          ["OTHER", "Other"],
        ],
      },
      {
        name: "institutionAddress",
        label: "Address of Institution",
        icon: "location",
        kind: "textarea",
        full: true,
        required: true,
        placeholder: "Street / area and full institution address",
        autoComplete: "street-address",
        maxLength: 1000,
      },
      city,
      state,
    ],
  },
  {
    title: "Contact Person",
    subtitle: "Primary point of contact",
    description: "Who should our team contact about this application?",
    fields: [
      name,
      {
        name: "designation",
        label: "Designation",
        icon: "person",
        required: true,
        placeholder: "e.g. Principal, Director, Coordinator",
        autoComplete: "organization-title",
        maxLength: 120,
      },
      email,
      phone,
    ],
  },
  {
    title: "Institution Profile",
    subtitle: "Your learning community",
    description: "Help us plan a learning experience that fits your students.",
    fields: [
      {
        name: "estimatedStudents",
        label: "Estimated Number of Students",
        icon: "people",
        kind: "number",
        placeholder: "e.g. 500",
        hint: "Optional. An approximate number is fine.",
        maxLength: 7,
        full: true,
      },
    ],
  },
  {
    title: "Areas of Interest",
    subtitle: "Select solutions you’re interested in",
    description:
      "Choose the solutions you would like to explore with our team.",
    fields: [
      {
        name: "requestedSolutions",
        label: "Solutions Required",
        icon: "settings",
        kind: "solutions",
        required: true,
        full: true,
      },
    ],
  },
  {
    title: "Requirements",
    subtitle: "Tell us about your needs",
    description: "Share what you want to set up, improve or discuss with us.",
    fields: [
      {
        name: "requirementDetails",
        label: "Requirement Details",
        icon: "document",
        kind: "textarea",
        full: true,
        required: true,
        placeholder:
          "Tell us about your goals, available space, learning needs and any specific requirements.",
        maxLength: 5000,
      },
    ],
  },
  {
    title: "Budget & Timeline",
    subtitle: "Project planning details",
    description: "Share your plans so we can prepare a relevant response.",
    fields: [
      {
        name: "budgetRange",
        label: "Budget Range",
        icon: "budget",
        placeholder: "e.g. To be discussed",
        maxLength: 180,
      },
      {
        name: "timeline",
        label: "Expected Timeline",
        icon: "calendar",
        placeholder: "e.g. Within 3 months",
        maxLength: 180,
      },
    ],
  },
  {
    title: "Additional Information",
    subtitle: "Any specific questions or context",
    description: "Is there anything else you would like us to know?",
    fields: [additionalMessage],
  },
  review,
];

export function initialValues(steps: ApplicationStep[]): ApplicationValues {
  return Object.fromEntries(
    steps.flatMap((step) =>
      step.fields.map((field) => [
        field.name,
        field.kind === "solutions"
          ? []
          : field.name === "wantsInstitutionSetup"
            ? "no"
            : "",
      ]),
    ),
  );
}

export function validateStep(step: ApplicationStep, values: ApplicationValues) {
  const errors: Record<string, string> = {};
  for (const field of step.fields) {
    const value = values[field.name];
    const text = typeof value === "string" ? value.trim() : "";
    if (field.kind === "solutions") {
      if (!Array.isArray(value) || value.length === 0)
        errors[field.name] = "Select at least one solution.";
    } else if (field.required && !text)
      errors[field.name] = `${field.label} is required.`;
    else if (
      field.kind === "email" &&
      text &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)
    )
      errors[field.name] = "Enter a valid email address.";
    else if (
      field.kind === "select" &&
      text &&
      !field.options?.some(([option]) => option === text)
    )
      errors[field.name] = "Choose an available option.";
    else if (
      field.kind === "number" &&
      text &&
      (!/^\d+$/.test(text) || Number(text) < 1 || Number(text) > 1_000_000)
    )
      errors[field.name] = "Enter a whole number between 1 and 1,000,000.";
    else if (field.maxLength && text.length > field.maxLength)
      errors[field.name] = `Use ${field.maxLength} characters or fewer.`;
  }
  return errors;
}

export function displayValue(
  field: ApplicationField,
  value: string | string[] | undefined,
) {
  if (Array.isArray(value))
    return value
      .map(
        (key) =>
          organizationSolutions.find(([code]) => code === key)?.[1] || key,
      )
      .join(", ");
  if (!value?.trim()) return "Not provided";
  return field.options?.find(([key]) => key === value)?.[1] || value;
}

export function buildApplicationPayload(
  applicantType: ApplicantType,
  values: ApplicationValues,
) {
  const details =
    applicantType === "STUDENT"
      ? {
          institutionName: values.institutionName,
          educationLevel: values.educationLevel,
          interestArea: values.interestArea,
          proposalDetails: values.proposalDetails,
          wantsInstitutionSetup: values.wantsInstitutionSetup === "yes",
          setupInterest: values.setupInterest,
          institutionCity: values.institutionCity,
        }
      : {
          organizationName: values.organizationName,
          organizationType: values.organizationType,
          designation: values.designation,
          institutionAddress: values.institutionAddress,
          requestedSolutions: values.requestedSolutions,
          requirementDetails: values.requirementDetails,
          estimatedStudents: values.estimatedStudents,
          timeline: values.timeline,
          budgetRange: values.budgetRange,
        };
  return {
    applicantType,
    name: values.name,
    email: values.email,
    phone: values.phone,
    city: values.city,
    state: values.state,
    message: values.additionalMessage,
    details,
  };
}
