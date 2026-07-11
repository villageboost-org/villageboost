"use client";

import { useState } from "react";
import Image from "next/image";
import PlaceholderImage from "@/app/components/PlaceholderImage";
import type { Campaign } from "@/app/data/campaigns";

type TabId = "campaign" | "rewards" | "creator" | "updates";

export default function SingleCampaignDetails({
  campaign,
}: {
  campaign: Campaign;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("campaign");

  const tabs: { id: TabId; label: string; badge?: number }[] = [
    { id: "campaign", label: "Campaign" },
    { id: "rewards", label: "Rewards" },
    { id: "creator", label: "Creator" },
    { id: "updates", label: "Updates", badge: campaign.updatesCount },
  ];

  const galleryImages = campaign.gallery ?? [];

  return (
    <section id="contribute" className="mt-14 xl:px-16 md:px-8 px-4">
      <div className="grid gap-20 lg:grid-cols-[200px_1fr_300px]">
        <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex shrink-0 items-center gap-2 rounded-r-md px-4 py-3 text-left text-base ${
                activeTab === tab.id
                  ? "border-l-4 border-rust-red bg-cream font-bold text-maroon"
                  : "border-l-4 border-transparent text-grey hover:bg-cream/50"
              }`}>
              {tab.label}
              {typeof tab.badge === "number" && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rust-red text-xs font-bold text-white">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div>
          {activeTab === "campaign" && (
            <div>
              {(campaign.description ?? []).map((paragraph, index) => (
                <p key={index} className="mt-4 first:mt-0 text-grey">
                  {paragraph}
                </p>
              ))}

              <div className="mt-8 flex flex-row gap-2">
                {galleryImages.length > 0
                  ? galleryImages.map((src) => (
                      <img
                        key={src}
                        src={src}
                        alt=""
                        loading="lazy"
                        className="object-none"
                      />
                    ))
                  : [0, 1].map((i) => (
                      <PlaceholderImage
                        key={i}
                        label="Behind the scenes"
                        className="aspect-3/4 w-1/2 rounded-lg"
                      />
                    ))}
              </div>
            </div>
          )}

          {activeTab === "rewards" && (
            <p className="text-grey">
              Rewards for this campaign will appear here.
            </p>
          )}

          {activeTab === "creator" && (
            <div className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: campaign.avatarColor }}>
                {campaign.initials}
              </span>
              <div>
                <p className="font-bold text-maroon">{campaign.creator}</p>
                <p className="text-sm text-grey">
                  More about this creator coming soon.
                </p>
              </div>
            </div>
          )}

          {activeTab === "updates" && (
            <p className="text-grey">
              {campaign.updatesCount ?? 0} Update
              {campaign.updatesCount === 1 ? "" : "s"} from the creator will
              appear here.
            </p>
          )}
        </div>

        <div>
          <button
            type="button"
            className="w-full rounded-lg bg-rust-red px-5 py-3 font-medium text-white">
            Contribute
          </button>
        </div>
      </div>
    </section>
  );
}
