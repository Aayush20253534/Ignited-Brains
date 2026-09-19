import type { Metadata } from "next";
import { Header } from "@/components/home/header";
import {
  AboutHero,
  OurIdea,
  OurValues,
  OurStory,
  WhatMakesUsDifferent,
  MissionVision,
  IndiaCommitment,
  AboutCTA,
  AboutFooter,
} from "@/components/about";

export const metadata: Metadata = {
  title: "About Us | Ignited Brains",
  description:
    "Ignited Brains creates future-ready learning environments where curiosity becomes experimentation, creativity becomes creation, and innovation becomes action.",
};

export default function AboutPage() {
  return (
    <div className="home-page about-page">
      <Header />
      <main id="main-content">
        <AboutHero />
        <OurIdea />
        <OurValues />
        <OurStory />
        <WhatMakesUsDifferent />
        <MissionVision />
        <IndiaCommitment />
        <AboutCTA />
      </main>
      <AboutFooter />
    </div>
  );
}
