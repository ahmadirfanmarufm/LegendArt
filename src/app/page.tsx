"use client";

import { useState } from "react";
import OpeningAnimation from "./components/OpeningAnimation";
import AfterMoviePlayer from "./components/AfterMoviePlayer";
import LinkSection from "./components/LinkSection";

export default function Home() {
  const [step, setStep] = useState<"opening" | "video" | "links">("opening");

  return (
    <>
      {step === "opening" && <OpeningAnimation onFinish={() => setStep("video")} />}
      {step === "video" && <AfterMoviePlayer onEnd={() => setStep("links")} />}
      {step === "links" && <LinkSection />}
    </>
  );
}
