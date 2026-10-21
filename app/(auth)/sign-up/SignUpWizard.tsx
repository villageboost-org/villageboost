"use client";

import { useEffect, useState } from "react";
import { resendConfirmation, signUp } from "@/app/actions/auth";
import { toast } from "sonner";
import Confetti from "react-confetti";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

// This type describes all the data collected across all 3 steps.
export type WizardData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  gender: string;
  bio: string;
  crafts: string[];
  links: { platform: string; url: string }[];
};

const INITIAL_DATA: WizardData = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  gender: "",
  bio: "",
  crafts: [],
  links: [{ platform: "", url: "" }],
};

export default function SignUpWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(INITIAL_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  // updateData helps update specific fields without changing the rest
  const updateData = (updates: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  function nextStep() {
    setStep((s) => Math.min(s + 1, 3));
  }
  function prevStep() {
    setStep((s) => Math.max(s - 1, 1));
  }

  async function handleSubmit() {
    setSubmitting(true); // disables the button while submitting

    const formData = new FormData();
    formData.set("fullName", data.fullName);
    formData.set("email", data.email);
    formData.set("password", data.password);
    formData.set("confirmPassword", data.confirmPassword);
    formData.set("phone", data.phone);
    formData.set("gender", data.gender);
    formData.set("bio", data.bio);
    formData.set("crafts", JSON.stringify(data.crafts));
    formData.set(
      "links",
      JSON.stringify(data.links.filter((l) => l.platform && l.url)),
    );

    // Call the server action
    const result = await signUp(undefined, formData);
    setSubmitting(false); // unlock the button

    if (result?.success) {
      toast.success(result.message);
      setDone(true);
      return;
    }

    const stepOneFields = [
      "fullName",
      "email",
      "password",
      "confirmPassword",
      "phone",
    ];
    if (
      result?.errors &&
      Object.keys(result.errors).some((k) => stepOneFields.includes(k))
    ) {
      setStep(1);
      toast.error(Object.values(result.errors)[0]);
      return;
    }
    toast.error(result?.message ?? "Something went wrong");
  }

  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(60); // seconds until "Resend" can be clicked

  // Count the cooldown down once a second while the success screen is showing
  useEffect(() => {
    if (!done || cooldown === 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [done, cooldown]);

  async function handleResend() {
    setResending(true);
    const result = await resendConfirmation(data.email);
    setResending(false);

    if (result.success) {
      toast.success(result.message);
      setCooldown(60); // restart the countdown after each send
    } else {
      toast.error(
        result.message ?? "Couldn't resend the email. Please try again.",
      );
    }
  }

  // Success screen
  if (done) {
    return (
      <div className="py-10 text-center">
        {/* One burst of brand-coloured confetti over the whole screen */}
        <Confetti
          recycle={false}
          numberOfPieces={400}
          colors={[
            "#1b1c1a",
            "#f2421e",
            "#ffd028",
            "#16d09a",
            "#3463ff",
            "#ff4d8f",
          ]}
          style={{ position: "fixed", zIndex: 60 }}
        />
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-maroon/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-maroon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="mb-3 text-grey">You&apos;re almost in!</h2>
        <p className="text-grey/70">
          We&apos;ve sent a confirmation link to{" "}
          <span className="font-semibold text-grey">{data.email}</span>. Click
          it to activate your account.
        </p>
        <p className="mt-8 text-sm text-grey/70">
          Didn&apos;t get the email? Check your spam folder, or{" "}
          {cooldown > 0 ? (
            <span>resend in {cooldown}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="font-semibold text-maroon underline underline-offset-2 disabled:opacity-50">
              {resending ? "Sending..." : "Resend it"}
            </button>
          )}
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Step Progress bar */}
      <div className="mt-5 md:mb-10 mb-5 flex gap-3">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            title={
              process.env.NODE_ENV === "development"
                ? `Jump to step ${s}`
                : undefined
            }
            onClick={
              process.env.NODE_ENV === "development"
                ? () => setStep(s)
                : undefined
            }
            className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
              s <= step ? "bg-maroon" : "bg-grey/20"
            } ${process.env.NODE_ENV === "development" ? "cursor-pointer" : ""}`}
          />
        ))}
      </div>

      {step === 1 && (
        <StepOne data={data} onUpdate={updateData} onNext={nextStep} />
      )}
      {step === 2 && (
        <StepTwo
          data={data}
          onUpdate={updateData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {step === 3 && (
        <StepThree
          data={data}
          onUpdate={updateData}
          onBack={prevStep}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      )}
    </div>
  );
}
