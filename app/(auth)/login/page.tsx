import Image from "next/image";
import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Log In | Village Boost",
  description:
    "Log in to your Village Boost account to manage and support campaigns.",
};

export default function LoginPage() {
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
          <h2 className="mb-2 text-center text-grey">
            Welcome Back
          </h2>
          <h5 className="mb-10 text-center text-grey">
            Please enter your details to log in
          </h5>

          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
