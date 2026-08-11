import Image from "next/image";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Log In | Village Boost",
  description:
    "Log in to your Village Boost account to manage and support campaigns.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-3rem)]">
      {/* ── Left decorative panel ── */}
      <div className="relative hidden w-[44%] shrink-0 lg:block">
        <Image
          src="/login-pattern.jpg"
          alt="Village Boost decorative art"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ── Right: form area ── */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          {/* Heading */}
          <h1 className="mb-2 text-center text-4xl font-bold text-grey">
            Welcome Back
          </h1>
          <p className="mb-10 text-center text-base text-grey/70">
            Please enter your details to log in
          </p>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
