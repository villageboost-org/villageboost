import Link from "next/link";
import CampaignCard from "@/app/components/campaigns/CampaignCard";
import { campaigns } from "@/app/data/campaigns";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const CATEGORY_FILTERS = [
  "All Projects",
  "Music & Audio",
  "Film & Doc",
  "Craft & Creatives",
  "Visual Art & Comics",
  "Lit & Zines",
];

export default function CampaignsPreview() {
  const shown = campaigns.slice(0, 6);
  return (
    <section className="section relative">
      <Image
        src="/motif-4.svg"
        alt=""
        width={180}
        height={180}
        className="absolute right-0 top-0 z-0"
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-10">
        <div>
          <h2>Back East Africa&apos;s boldest creative visions</h2>
          <p className="mt-2">
            100% direct-to-creator funding via M-Pesa & cards. Zero middlemen,
            instant sovereign payouts.
          </p>
        </div>
      </div>

      {/* Static filter pills — add useState interactivity yourself */}
      <div className="flex flex-wrap gap-4 mb-8">
        {CATEGORY_FILTERS.map((cat, i) => (
          <span
            key={cat}
            className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
              i === 0
                ? "bg-ink text-white border-ink"
                : "border-body-gray/30 text-body-gray"
            }`}>
            {cat}
          </span>
        ))}
      </div>

      <div className="grid xl:gap-6 gap-6 xl:grid-cols-4 md:grid-cols-2 grid-cols-1">
        {shown.map((campaign) => (
          <Link key={campaign.slug} href={`/campaigns/${campaign.slug}`}>
            <CampaignCard {...campaign} />
          </Link>
        ))}

        {/* CTA card */}
        <div className="relative bg-ink text-white flex flex-col items-center justify-center rounded-2xl p-8 text-center min-h-64">
          <Image
            src="/blurred-circle.svg"
            alt="CTA Icon"
            width={140}
            height={140}
            className="absolute right-0 top-0 rounded-2xl"
          />
          <h4>Have a bold creative vision?</h4>
          <p className="my-2">Launch it in under 30mins</p>
          <Link
            href="/start-campaign"
            className="mt-4 bg-white text-ink btn-primary inline-flex items-center gap-2">
            Start a campaign <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="mt-10 flex justify-between items-center gap-4 flex-wrap">
        <p className="text-sm! font-bold flex items-center gap-2">
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-progress opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-progress"></span>
          </span>
          42 creative campaigns across East Africa
        </p>

        <Link href="/campaigns" className="btn-primary inline-flex items-center gap-2">
          Explore all campaigns <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
