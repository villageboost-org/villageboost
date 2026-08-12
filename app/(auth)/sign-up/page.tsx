import Image from "next/image";
import SignUpWizard from "./SignUpWizard";

export const metadata = {
  title: "Sign Up | Village Boost",
  description:
    "Create your Village Boost creator account and start turning your creative ideas into community-funded projects.",
};

export default function SignUpPage() {
  return (
    <div className="flex flex-1">
      {/* ── Left decorative panel ── */}
      <div className="relative hidden w-2/5 shrink-0 lg:block">
        <Image
          src="/signup-pattern.svg"
          alt="Village Boost decorative art"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ── Right: wizard area ── */}
      <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto py-12">
        <div className="w-full px-12 xl:px-30">
          <SignUpWizard />
        </div>
      </div>
    </div>
  );
}
