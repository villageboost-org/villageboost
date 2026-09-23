import Image from "next/image";
import ResetPasswordForm from "./ResetPasswordForm";

export const metadata = {
  title: "Reset Password | Village Boost",
  description: "Set a new password for your Village Boost account.",
};

export default function ResetPasswordPage() {
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
          <h2 className="mb-2 text-center text-grey">Reset Your Password</h2>
          <h5 className="mb-10 text-center text-grey">
            Enter a new password for your account
          </h5>

          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}
