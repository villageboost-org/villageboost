import Image from "next/image";
import ForgotPasswordForm from "./ForgotPasswordForm";

export const metadata = {
  title: "Forgot Password | Village Boost",
  description: "Reset the password for your Village Boost account.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-1 overflow-hidden">
      {/* ── Left decorative panel ── */}
      <div className="hidden w-1/3 shrink-0 lg:block">
        <Image
          src="/login-pattern.svg"
          alt="Village Boost decorative art"
          width={632}
          height={1438}
          className="h-full w-full object-cover"
          priority
        />
      </div>

      {/* ── Right: form area ── */}
      <div className="flex flex-1 flex-col items-center overflow-y-auto px-6 py-12">
        <div className="my-auto w-full max-w-md">
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
