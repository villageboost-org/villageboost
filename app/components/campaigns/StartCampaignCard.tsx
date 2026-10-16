import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";

export default function StartCampaignCard() {
  return (
    <article className="relative flex h-full min-h-96 flex-col overflow-hidden rounded-2xl bg-ink p-6 text-white">
      <Image
        src="/blurred-circle.svg"
        alt=""
        width={180}
        height={180}
        className="pointer-events-none absolute right-0 top-0"
      />

      <div className="relative z-10 flex flex-1 flex-col">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase text-progress">
          <Rocket size={14} /> Sovereign creator
        </span>

        <h3 className="mt-5 text-white">Have a bold creative vision?</h3>

        <p className="mt-4 text-sm! text-white/80">
          Launch in under 30 minutes. Direct backer funding via M-Pesa & cards
          with zero upfront fee.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">
            Instant M-Pesa
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">
            Zero launch fee
          </span>
        </div>

        <Link
          href="/start-campaign"
          className="mt-auto flex items-center justify-center gap-2 rounded-full bg-white py-3 font-bold text-ink transition-opacity hover:opacity-90">
          Start campaign <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
