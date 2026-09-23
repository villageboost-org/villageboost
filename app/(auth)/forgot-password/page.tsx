import Image from "next/image";
import ForgotPasswordForm from "./ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password | Village Boost",
  description: "Reset the password for your Village Boost account.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-1">
      {/* ── Left decorative panel ── */}
      <div className="relative hidden w-2/5 shrink-0 lg:block">
        <Image
          src="/login-pattern.svg"
          alt="Village Boost decorative art"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ── Right: form area ── */}
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Heading */}
          <h2 className="mb-2 text-center text-grey">Forgot Your Password?</h2>
          <h5 className="mb-10 text-center text-grey">
            Enter the email associated with your account and we&apos;ll email
            you instructions to reset your password
          </h5>

          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
