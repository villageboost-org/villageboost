"use client";

import Image from "next/image";
import {
  ArrowRight,
  ArrowLeft,
  CircleCheck,
  Clock,
  Coins,
  Pencil,
} from "lucide-react";
import campaignPlaceholder from "@/public/campaign-placeholder.webp";
import { CATEGORIES } from "@/lib/categories";
import { formatCampaignDate } from "@/lib/campaignDates";
import { formatKES } from "@/lib/formatCurrency";
import type { CampaignData } from "./types";
import { useState } from "react";
import { validateBasics } from "@/lib/validation/campaignBasics";
import { validateStoryStep } from "@/lib/validation/campaignStory";
import { validateFunding } from "@/lib/validation/campaignFunding";
import { validateRewards } from "@/lib/validation/campaignRewards";

type Props = {
  data: CampaignData;
  onEdit: (step: number) => void;
  onBack: () => void;
};

// Shared look for the four "previous step" summary cards.
const sectionCard = "rounded-2xl border border-action/40 bg-action/5 px-6 py-5";
const sectionHeading =
  "flex items-center gap-3 text-base! font-semibold uppercase tracking-[.15em] text-action";
const editButton =
  "flex items-center gap-1.5 rounded-full bg-action px-3 py-1 text-xs font-medium text-white transition-opacity hover:opacity-90";

export default function StepReview({ data, onEdit, onBack }: Props) {
  const [coverUrl] = useState(() =>
    data.coverImage ? URL.createObjectURL(data.coverImage) : null,
  );

  const categoryLabel =
    CATEGORIES.find((c) => c.value === data.category)?.label ?? "No category";
  const rewardCount = data.rewards.length;
  // Tiers are always shown cheapest first (see 06_create_reward.sql)
  const sortedRewards = [...data.rewards].sort(
    (a, b) => (a.amount ?? 0) - (b.amount ?? 0),
  );
  const goalText = data.goal !== null ? formatKES(data.goal) : "Not set";
  const endText = data.endDate ? formatCampaignDate(data.endDate) : null;

  const handleSubmit = () => {
    const checks = [
      validateBasics(data),
      validateStoryStep(data),
      validateFunding(data),
      validateRewards(data.rewards, data.goal),
    ];
    const firstBad = checks.findIndex((e) => Object.keys(e).length > 0);
    if (firstBad !== -1) return onEdit(firstBad + 1); // send them to the step to fix
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
        {/* ── Left: how the campaign card will look ── */}
        <div>
          <h4 className="text-body-gray">Review Your Campaign</h4>

          <article className="mt-6 max-w-sm overflow-hidden rounded-3xl bg-white p-3 shadow-[0_20px_50px_-12px_rgba(27,28,26,0.25)]">
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              {coverUrl ? (
                <Image
                  src={coverUrl}
                  alt={data.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <Image
                  src={campaignPlaceholder}
                  alt="No cover image yet"
                  fill
                  sizes="384px"
                  className="object-cover"
                />
              )}
            </div>

            <div className="px-1 pt-4 pb-1">
              <h5 className="line-clamp-2 font-bold! text-ink">
                {data.title || "Untitled campaign"}
              </h5>
              <p className="mt-1 line-clamp-2 text-sm! text-body-gray">
                {data.story}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-body-gray/10 px-3 py-1 text-xs font-semibold text-ink">
                  {categoryLabel}
                </span>
                <span className="rounded-full bg-body-gray/10 px-3 py-1 text-xs font-semibold text-ink">
                  {rewardCount === 0
                    ? "No rewards"
                    : `${rewardCount} Reward${rewardCount === 1 ? "" : "s"}`}
                </span>
              </div>
            </div>

            <div className="-mx-3 mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-body-gray/15 px-4 pt-4 pb-2">
              <span className="flex items-center gap-2 text-xs font-semibold text-action">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-action/10">
                  <Coins size={14} />
                </span>
                Goal: {goalText}
              </span>
              <span className="flex items-center gap-2 text-xs font-semibold text-signal">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-signal/10">
                  <Clock size={14} />
                </span>
                {endText ? `Ends ${endText}` : "No end date"}
              </span>
            </div>
          </article>
        </div>

        {/* ── Right: summary of each step, with Edit buttons ── */}
        <div>
          <span className="eyebrow-headline lg:mt-3">Previous steps</span>

          <div className="mt-2 flex flex-col gap-6">
            {/* Basics */}
            <section className={sectionCard} aria-labelledby="review-basics">
              <div className="flex items-center justify-between">
                <h3 id="review-basics" className={sectionHeading}>
                  <CircleCheck size={22} />
                  Basics
                </h3>
                <button
                  onClick={() => onEdit(1)}
                  type="button"
                  className={editButton}
                >
                  Edit
                  <Pencil size={12} />
                </button>
              </div>
              <p className="mt-4 font-medium text-ink">{data.title}</p>
              <div className="mt-1 flex flex-wrap gap-x-10 gap-y-1 text-sm text-body-gray">
                <span>Category: {categoryLabel}</span>
                <span className="truncate">
                  Cover Image: {data.coverImage?.name ?? "None"}
                </span>
              </div>
            </section>

            {/* Story */}
            <section className={sectionCard} aria-labelledby="review-story">
              <div className="flex items-center justify-between">
                <h3 id="review-story" className={sectionHeading}>
                  <CircleCheck size={22} />
                  Story
                </h3>
                <button
                  onClick={() => onEdit(2)}
                  type="button"
                  className={editButton}
                >
                  Edit
                  <Pencil size={12} />
                </button>
              </div>
              <p className="mt-4 line-clamp-3 text-sm! text-body-gray">
                {data.story}
              </p>
            </section>

            {/* Funding */}
            <section className={sectionCard} aria-labelledby="review-funding">
              <div className="flex items-center justify-between">
                <h3 id="review-funding" className={sectionHeading}>
                  <CircleCheck size={22} />
                  Funding
                </h3>
                <button
                  onClick={() => onEdit(3)}
                  type="button"
                  className={editButton}
                >
                  Edit
                  <Pencil size={12} />
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-10 gap-y-1 text-sm text-body-gray">
                <span>Total: {goalText}</span>
                <span>Deadline: {endText ?? "Not set"}</span>
              </div>
            </section>

            {/* Rewards */}
            <section className={sectionCard} aria-labelledby="review-rewards">
              <div className="flex items-center justify-between">
                <h3 id="review-rewards" className={sectionHeading}>
                  <CircleCheck size={22} />
                  Rewards
                </h3>
                <button
                  onClick={() => onEdit(4)}
                  type="button"
                  className={editButton}
                >
                  Edit
                  <Pencil size={12} />
                </button>
              </div>
              {rewardCount === 0 ? (
                <p className="mt-4 text-sm! text-body-gray">
                  No rewards added.
                </p>
              ) : (
                <ul className="mt-4 flex flex-col gap-2 text-sm text-body-gray">
                  {sortedRewards.map((tier) => (
                    <li
                      key={tier.id}
                      className="flex flex-wrap items-center gap-x-4"
                    >
                      <span>{tier.title}</span>
                      <span aria-hidden="true">•</span>
                      <span>
                        {tier.amount !== null ? formatKES(tier.amount) : "—"}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-4">
        <button
          onClick={onBack}
          type="button"
          className="btn-secondary flex items-center gap-2"
        >
          <ArrowLeft size={22} />
          Back
        </button>
        <button
          onClick={handleSubmit}
          type="button"
          className="btn-primary flex items-center gap-2"
        >
          Submit for Review
          <ArrowRight size={22} />
        </button>
      </div>
    </div>
  );
}
