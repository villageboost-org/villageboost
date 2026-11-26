"use client";

import {
  FieldError,
  Label,
  NumberField,
  TextArea,
  TextField,
  Input,
} from "@heroui/react";
import { ArrowLeft, ArrowRight, Plus, Trash2 } from "lucide-react";
import { MAX_TIERS, REWARD_TITLE_MIN } from "@/lib/validation/campaignRewards";
import type { CampaignData, RewardTier } from "./types";
import { useState } from "react";
import {
  validateRewards,
  type RewardsErrors,
  createEmptyTier,
} from "@/lib/validation/campaignRewards";

type Props = {
  data: CampaignData;
  onUpdate: (updates: Partial<CampaignData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepRewards({ data, onUpdate, onNext, onBack }: Props) {
  const { rewards } = data;
  const [errors, setErrors] = useState<RewardsErrors>({});

  const handleNext = () => {
    const result = validateRewards(rewards, data.goal);
    setErrors(result);
    if (Object.keys(result).length === 0) onNext();
  };

  const addTier = () => onUpdate({ rewards: [...rewards, createEmptyTier()] });

  const removeTier = (id: string) =>
    onUpdate({ rewards: rewards.filter((t) => t.id !== id) });

  const updateTier = (id: string, changes: Partial<RewardTier>) => {
    onUpdate({
      rewards: rewards.map((t) => (t.id === id ? { ...t, ...changes } : t)),
    });
    setErrors((prev) => ({ ...prev, [id]: {} }));
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h4 className="text-body-gray">Rewards For Your Contributors</h4>
        <p className="mt-1 max-w-2xl text-sm! text-body-gray">
          Rewards are optional, but they give people a reason to contribute
          and to give a little more. Something small, like a shout-out,
          early access or a behind-the-scenes update, can make a difference.
        </p>
        <p className="mt-3 text-xs font-semibold text-body-gray">
          {rewards.length} of {MAX_TIERS} tiers used
        </p>

        {/* Tier list */}
        <div className="mt-6 rounded-2xl border border-dashed border-body-gray/60 bg-body-gray/5 px-5 py-6 md:px-10 md:py-8">
          <ol className="flex flex-col divide-y divide-dashed divide-body-gray/30">
            {rewards.map((tier, i) => (
              <li key={tier.id} className="py-8 first:pt-0">
                <div className="flex items-center justify-between">
                  <span className="eyebrow-headline mb-0!">Reward {i + 1}</span>
                  <button
                    type="button"
                    aria-label={`Remove reward ${i + 1}`}
                    className="rounded-full p-1.5 text-signal transition-colors hover:bg-signal/10"
                  >
                    <Trash2 onClick={() => removeTier(tier.id)} size={22} />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr] md:gap-x-16">
                  {/* Title */}
                  <TextField
                    fullWidth
                    name={`rewards.${i}.title`}
                    value={tier.title}
                    onChange={(v) => updateTier(tier.id, { title: v })}
                    isInvalid={!!errors[tier.id]?.title}
                  >
                    <Label>Reward Title</Label>
                    <Input
                      minLength={REWARD_TITLE_MIN}
                      placeholder="e.g. Signed poster"
                    />
                    <FieldError>{errors[tier.id]?.title}</FieldError>
                  </TextField>

                  {/* Amount */}
                  <NumberField
                    fullWidth
                    name={`rewards.${i}.amount`}
                    step={1}
                    formatOptions={{ maximumFractionDigits: 0 }}
                    value={tier.amount ?? NaN}
                    onChange={(v) =>
                      updateTier(tier.id, {
                        amount: Number.isNaN(v) ? null : v,
                      })
                    }
                    isInvalid={!!errors[tier.id]?.amount}
                  >
                    <Label>Reward Amount (KES)</Label>
                    <NumberField.Group>
                      <NumberField.Input placeholder="1,000" />
                    </NumberField.Group>
                    <FieldError>{errors[tier.id]?.amount}</FieldError>
                  </NumberField>

                  {/* Description: spans both columns */}
                  <TextField
                    fullWidth
                    name={`rewards.${i}.description`}
                    value={tier.description}
                    onChange={(v) => updateTier(tier.id, { description: v })}
                    isInvalid={!!errors[tier.id]?.description}
                    className="md:col-span-2"
                  >
                    <Label>Reward Description</Label>
                    <TextArea
                      rows={5}
                      className="rounded-2xl"
                      placeholder="What do contributors at this level get, and when?"
                    />
                    <FieldError>{errors[tier.id]?.description}</FieldError>
                  </TextField>
                </div>
              </li>
            ))}
          </ol>

          {/* Hidden once all tiers are used */}
          {rewards.length < MAX_TIERS && (
            <div className="mt-2 flex justify-center">
              <button
                onClick={addTier}
                type="button"
                className="flex items-center gap-2 rounded-full bg-action px-6 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                Add tier
                <Plus size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          type="button"
          className="btn-secondary flex items-center gap-2"
        >
          <ArrowLeft size={22} />
          Back
        </button>
        <button
          onClick={handleNext}
          type="button"
          className="btn-primary flex items-center gap-2"
        >
          Next
          <ArrowRight size={22} />
        </button>
      </div>
    </div>
  );
}
