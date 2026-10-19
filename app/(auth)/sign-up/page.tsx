import Image from "next/image";
import SignUpWizard from "./SignUpWizard";

export const metadata = {
  title: "Sign Up | Village Boost",
  description:
    "Create your Village Boost creator account and start turning your creative ideas into community-funded projects.",
};

export default function SignUpPage() {
  return (
    <div className="flex flex-1 overflow-hidden">
      {/* ── Left decorative panel ── */}
      <div className="relative hidden w-1/3 shrink-0 lg:block">
        <Image
          src="/signup-pattern.svg"
          alt="Village Boost decorative art"
           fill
          sizes="33vw"
          className="object-cover"
          priority
        />
      </div>

      {/* ── Right: wizard area ── */}
      <div className="flex flex-1 flex-col items-center overflow-y-auto py-12">
        <div className="w-full px-6 md:px-12 xl:px-30">
          <SignUpWizard />
        </div>
      </div>
    </div>
  );
}
