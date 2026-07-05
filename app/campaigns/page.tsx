"use client";

import CampaignsHero from "@/app/components/campaigns/CampaignsHero";
import CampaignFilters from "@/app/components/campaigns/CampaignFilters";
import CampaignCard from "@/app/components/campaigns/CampaignCard";
import { campaigns } from "@/app/data/campaigns";
import { useState } from "react";

export default function CampaignsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredCampaigns =
    selectedCategory === "All"
      ? campaigns
      : campaigns.filter((campaign) => campaign.category === selectedCategory);

  const visibleCampaigns = filteredCampaigns.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCampaigns.length;

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(8);
  };

  return (
    <main>
      <CampaignsHero />

      <section className="pb-20">
        <CampaignFilters
          selected={selectedCategory}
          onSelect={handleSelectCategory}
        />

        <div className="mt-10 xl:px-16 md:px-8 px-4">
          {filteredCampaigns.length === 0 ? (
            <p className="mt-20 text-center text-grey">
              No {selectedCategory} campaigns available at the moment.
            </p>
          ) : (
            <div className="grid xl:gap-10 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
              {visibleCampaigns.map((campaign) => (
                <CampaignCard key={campaign.title} {...campaign} />
              ))}
            </div>
          )}
        </div>

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              className="btn-primary"
              onClick={() => setVisibleCount((count) => count + 8)}>
              Load More
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
