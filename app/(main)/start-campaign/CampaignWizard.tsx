"use client";

import { useState } from "react";
import StepBasics from "./StepBasics";
import type { CampaignData } from "./types";

const STEPS = ["Basics", "Story", "Funding", "Rewards", "Review"];

export default function CampaignWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<CampaignData>({
    title: "",
    category: "",
    coverImage: null,
  });
  const updateData = (updates: Partial<CampaignData>) =>
    setData((prev) => ({ ...prev, ...updates }));
  const nextStep = () => setStep((s) => Math.min(s + 1, STEPS.length));

  return (
    <div className="mt-12 lg:mt-16">
      {/* Stepper */}
      <ol className="grid grid-cols-5 gap-3 md:gap-6 lg:gap-10">
        {STEPS.map((label, i) => {
          const number = i + 1;
          const isActive = number === step;
          const isComplete = number < step;
          return (
            <li key={label} aria-current={isActive ? "step" : undefined}>
              <span
                className={`block truncate text-sm font-semibold md:text-base ${
                  isActive ? "text-signal" : "text-body-gray"
                }`}
              >
                {number}.<span className="hidden sm:inline"> {label}</span>
              </span>
              <div
                className={`mt-2 h-1.5 rounded-full transition-colors duration-500 ${
                  isActive || isComplete ? "bg-signal" : "bg-body-gray/15"
                }`}
              />
            </li>
          );
        })}
      </ol>

      {/* Step body */}
      <div className="mt-10 rounded-3xl border border-body-gray/30 bg-white px-5 py-8 md:px-14 md:py-12 lg:mt-16">
        {step === 1 && (
          <StepBasics data={data} onUpdate={updateData} onNext={nextStep} />
        )}
      </div>
    </div>
  );
}
