import Image from "next/image";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Log In | Village Boost",
  description:
    "Log in to your Village Boost account to manage and support campaigns.",
};

export default function LoginPage() {
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
          <h2 className="mb-2 text-center text-grey">
            Welcome Back
          </h2>
          <h5 className="mb-10 text-center text-grey">
            Please enter your details to log in
          </h5>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
