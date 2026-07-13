"use client";

import { useState } from "react";
import PlaceholderImage from "@/app/components/PlaceholderImage";
import { campaigns, type Campaign } from "@/app/data/campaigns";

type TabId = "campaign" | "rewards" | "creator" | "updates";

function formatRelativeDate(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  const days = Math.round(
    (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;

  const months = Math.round(days / 30);
  if (months === 1) return "1 month ago";
  if (months < 12) return `${months} months ago`;

  const years = Math.round(months / 12);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}

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
    { id: "updates", label: "Updates", badge: campaign.updates?.length },
  ];

  const galleryImages = campaign.gallery ?? [];
  const creatorInfo = campaign.creator;
  const creatorProjectCount = creatorInfo
    ? campaigns.filter((c) => c.creator?.name === creatorInfo.name).length
    : 0;

  return (
    <section id="contribute" className="mt-14 xl:px-16 md:px-8 px-4">
      <div className="grid xl:gap-20 gap-8 lg:grid-cols-[200px_1fr_300px]">
        <nav className="flex gap-2 overflow-x-auto lg:sticky lg:top-16 lg:flex-col lg:self-start lg:overflow-visible">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex shrink-0 items-center gap-2 rounded-r-md px-2 py-3 text-left text-base ${
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

              <div className="mt-8 flex flex-row flex-wrap gap-2">
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
            <div>
              {campaign.rewards && campaign.rewards.length > 0 ? (
                campaign.rewards.map((reward, index) => (
                  <div
                    key={reward.name}
                    className={`grid xl:grid-cols-[200px_1fr] grid-cols-1 gap-4 py-6 first:pt-0 ${
                      index < campaign.rewards!.length - 1
                        ? "border-b border-grey/20"
                        : ""
                    }`}>
                    <div>
                      <p className="text-sm font-bold tracking-wide text-gray-800 uppercase">
                        {reward.name}
                      </p>
                      <p className="text-2xl! font-bold text-rust-red">
                        Sh {reward.amount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <ul className="space-y-1">
                        {reward.perks.map((perk) => (
                          <li key={perk} className="text-grey">
                            {perk}
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        className="mt-4 rounded-lg bg-rust-red px-5 py-2 font-medium text-white">
                        Pledge
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-grey">
                  Rewards for this campaign will appear here.
                </p>
              )}
            </div>
          )}

          {activeTab === "creator" &&
            (creatorInfo ? (
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full text-xl font-bold text-white"
                    style={{ backgroundColor: creatorInfo.avatarColor }}>
                    {creatorInfo.initials}
                  </span>
                  <p className="font-bold text-xl! text-maroon">
                    {creatorInfo.name}
                  </p>
                </div>
                <div className="mb-4 border-b border-grey/20 pb-4">
                  <p className="text-grey">
                    {creatorProjectCount} created project
                    {creatorProjectCount === 1 ? "" : "s"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-grey">
                    {creatorInfo.description ?? "No description available."}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-grey">Creator information is not available.</p>
            ))}

          {activeTab === "updates" && (
            <div className="space-y-6">
              {campaign.updates && campaign.updates.length > 0 ? (
                campaign.updates.map((update, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-grey/15 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                      {creatorInfo && (
                        <span
                          className="flex h-9 w-9 items-center justify-center rounded-full text-xl font-bold text-white"
                          style={{ backgroundColor: creatorInfo.avatarColor }}>
                          {creatorInfo.initials}
                        </span>
                      )}
                      <div>
                        <p className="font-mediumtext-base text-gray-800">
                          {creatorInfo?.name ?? "Creator"}
                        </p>
                        <p className="text-sm! text-grey">
                          {formatRelativeDate(update.date)}
                        </p>
                      </div>
                    </div>

                    {update.title && (
                      <p className="text-lg! mt-4 font-bold text-maroon">
                        {update.title}
                      </p>
                    )}
                    <p className="mt-2 text-grey">{update.body}</p>
                  </div>
                ))
              ) : (
                <p className="text-grey">No updates from the creator yet.</p>
              )}
            </div>
          )}
        </div>

        <div>
          <button
            type="button"
            className="lg:sticky lg:top-16 w-full rounded-lg bg-rust-red px-5 py-3 font-medium text-white">
            Contribute
          </button>
        </div>
      </div>
    </section>
  );
}
