"use client";

import Link from "next/link";
import CampaignsHero from "@/app/components/campaigns/CampaignsHero";
import CampaignFilters from "@/app/components/campaigns/CampaignFilters";
import CampaignCard from "@/app/components/campaigns/CampaignCard";
import { campaigns } from "@/app/data/campaigns";
import { useState } from "react";
import Image from "next/image";
import StartCampaignCard from "@/app/components/campaigns/StartCampaignCard";
import motif15 from "@/public/motif-15.svg";

const PAGE_SIZE = 12;

export default function CampaignsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredCampaigns =
    selectedCategory === "All"
      ? campaigns
      : campaigns.filter((campaign) => campaign.category === selectedCategory);

  const visibleCampaigns = filteredCampaigns.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCampaigns.length;

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <main className="relative overflow-x-clip bg-paper">
      <CampaignsHero />

      <section className="relative pb-20">
        <Image
          src={motif15}
          alt=""
          className="absolute -right-16 top-0 z-0 hidden xl:block"
        />

        <div className="relative z-10 xl:px-16 md:px-8 px-4">
          <CampaignFilters
            selected={selectedCategory}
            onSelect={handleSelectCategory}
            showCounts
          />
        </div>

        <div className="relative z-10 mt-10 xl:px-16 md:px-8 px-4">
          {filteredCampaigns.length === 0 ? (
            <div className="grid gap-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
              <StartCampaignCard />
            </div>
          ) : (
            <div className="grid gap-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
              {visibleCampaigns.map((campaign) => (
                <Link
                  key={campaign.slug}
                  href={`/campaigns/${campaign.slug}`}
                  className="h-full">
                  <CampaignCard {...campaign} />
                </Link>
              ))}
            </div>
          )}
        </div>

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              className="btn-primary"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
              Load More
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
