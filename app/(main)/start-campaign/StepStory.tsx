"use client";

import { Description, FieldError, TextArea, TextField } from "@heroui/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { CampaignData } from "./types";
import { useState } from "react";
import {
  validateStoryStep,
  type StoryErrors,
} from "@/lib/validation/campaignStory";
import Image from "next/image";
import lightbulb from "@/public/lightbulb-icon.svg";

type Props = {
  data: CampaignData;
  onUpdate: (updates: Partial<CampaignData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function StepStory({ data, onUpdate, onNext, onBack }: Props) {
  const [errors, setErrors] = useState<StoryErrors>({});

  const handleNext = () => {
    const result = validateStoryStep(data);
    setErrors(result);
    if (Object.keys(result).length === 0) onNext();
  };
 
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h4 id="story-heading" className="text-body-gray">
          Tell Your Story
        </h4>
        <p className="mt-1 text-sm! text-body-gray">
          What are you making, why does it matter, and how will the money be
          used?
        </p>

        <TextField
          fullWidth
          name="story"
          aria-labelledby="story-heading"
          className="mt-6"
          value={data.story}
          isInvalid={!!errors.story}
          onChange={(value) => {
            onUpdate({ story: value });
            setErrors((prev) => ({ ...prev, story: undefined }));
          }}
        >
          <TextArea rows={12} className="rounded-2xl" />
          <Description className="mt-1 flex items-center gap-1.5 text-xs text-body-gray">
            <Image src={lightbulb} alt="" className="h-4 w-4" />
            Tips: Introduce yourself · Show past work · Explain the budget
          </Description>
          <FieldError>{errors.story}</FieldError>
        </TextField>
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
