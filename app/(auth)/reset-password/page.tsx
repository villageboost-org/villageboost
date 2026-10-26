import Image from "next/image";
import ResetPasswordForm from "./ResetPasswordForm";

export const metadata = {
  title: "Reset Password | Village Boost",
  description: "Set a new password for your Village Boost account.",
};

export default function ResetPasswordPage() {
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
      <div className="flex flex-1 flex-col items-center overflow-y-auto px-6 py-24">
        <div className="my-auto w-full max-w-md">
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
