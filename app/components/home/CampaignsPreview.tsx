"use client";
import Link from "next/link";
import { campaigns } from "@/app/data/campaigns";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import CampaignCard from "@/app/components/campaigns/CampaignCard";
import StartCampaignCard from "@/app/components/campaigns/StartCampaignCard";
import CampaignFilters from "@/app/components/campaigns/CampaignFilters";

export default function CampaignsPreview() {
  const [activeFilter, setActiveFilter] = useState("All");
  const shown =
    activeFilter === "All"
      ? campaigns.slice(0, 6)
      : campaigns.filter((c) => c.category === activeFilter).slice(0, 6);

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

      {/* Filter pills */}
      <div className="mb-8">
        <CampaignFilters selected={activeFilter} onSelect={setActiveFilter} />
      </div>

      <div className="grid xl:gap-6 gap-6 xl:grid-cols-4 md:grid-cols-2 grid-cols-1">
        {shown.map((campaign) => (
          <Link
            key={campaign.slug}
            href={`/campaigns/${campaign.slug}`}
            className="h-full">
            <CampaignCard {...campaign} />
          </Link>
        ))}

        {/* CTA card — shown only when the selected category has no campaigns */}
        {shown.length === 0 && <StartCampaignCard />}
      </div>

      <div className="mt-10 flex justify-between items-center gap-4 flex-wrap">
        <p className="text-sm! font-bold flex items-center gap-2">
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-progress opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-progress"></span>
          </span>
          42 creative campaigns across East Africa
        </p>

        <Link
          href="/campaigns"
          className="btn-primary inline-flex items-center gap-2">
          Explore all campaigns <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
