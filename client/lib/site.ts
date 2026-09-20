const fallbackSiteUrl = "https://ignitedbrains.com";

export const siteConfig = {
  name: "Ignited Brains",
  shortName: "Ignited Brains",
  description:
    "Ignited Brains creates future-ready, hands-on learning environments for schools and institutions.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || fallbackSiteUrl,
  locale: "en_IN",
  contact: {
    email: "info@ignitedbrains.com",
    phone: "+91 94544 88061",
    city: "Prayagraj",
    region: "Uttar Pradesh",
    country: "India",
  },
} as const;
