"use client";

import {
  FieldError,
  Input,
  Label,
  ListBox,
  Select,
  TextField,
} from "@heroui/react";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import type { CampaignData } from "./types";
import { slugify } from "@/lib/slugify";
import { useState } from "react";
import {
  validateBasics,
  type BasicsErrors,
} from "@/lib/validation/campaignBasics";
import Image from "next/image";
import { readImageSize } from "@/lib/readImageSize";
import {
  validateCoverRatio,
  validateCoverImage,
} from "@/lib/validation/campaignBasics";

type Props = {
  data: CampaignData;
  onUpdate: (updates: Partial<CampaignData>) => void;
  onNext: () => void;
};

export default function StepBasics({ data, onUpdate, onNext }: Props) {
  const [errors, setErrors] = useState<BasicsErrors>({});
  const [preview, setPreview] = useState<string | null>(() =>
    data.coverImage ? URL.createObjectURL(data.coverImage) : null,
  );

  const handleNext = () => {
    const result = validateBasics(data);
    setErrors(result);
    if (Object.keys(result).length === 0) onNext();
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr] lg:gap-x-24 lg:gap-y-10">
        {/* Title */}
        <TextField
          fullWidth
          name="title"
          value={data.title}
          isInvalid={!!errors.title}
          onChange={(value) => {
            onUpdate({ title: value });
            setErrors((prev) => ({ ...prev, title: undefined }));
          }}
        >
          <Label>What&apos;s your campaign called?</Label>
          <Input />
          <span className="mt-1 truncate text-xs text-body-gray">
            villageboost.com/campaigns/
            {slugify(data.title) || "your-title-here"}
          </span>
          <FieldError>{errors.title}</FieldError>
        </TextField>

        {/* Category */}
        <Select
          fullWidth
          name="category"
          placeholder="Select your category"
          value={data.category || null}
          onChange={(key) => {
            onUpdate({ category: key ? String(key) : "" });
            setErrors((prev) => ({ ...prev, category: undefined }));
          }}
          isInvalid={!!errors.category}
        >
          <Label>Category</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {CATEGORIES.map((c) => (
                <ListBox.Item key={c.value} id={c.value} textValue={c.label}>
                  {c.label}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
          <FieldError>{errors.category}</FieldError>
        </Select>

        {/* Cover image */}
        <div className="lg:col-start-1">
          <span className="font-medium text-sm inline-block mb-1">
            Cover image
          </span>
          <label
            className={`relative overflow-hidden flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-2xl border ${errors.coverImage ? "border-danger" : "border-body-gray/60"} bg-paper text-center text-sm text-body-gray transition-colors hover:border-ink focus-within:ring-2 focus-within:ring-ink`}
          >
            <span>Click to upload a featured image</span>
            <span>16:9 · 1920×1080 recommended · PNG, JPG or WebP</span>
            {preview && (
              <>
                <Image
                  src={preview}
                  alt="Cover preview"
                  fill
                  unoptimized
                  className="object-cover"
                />
                <span className="absolute bottom-3 right-3 rounded-full bg-ink/70 px-3 py-1 text-xs text-white">
                  Change image
                </span>
              </>
            )}
            <input
              type="file"
              name="coverImage"
              accept="image/png,image/jpeg,image/webp"
              className="sr-only"
              onChange={async (e) => {
                const input = e.currentTarget;
                const file = input.files?.[0];
                if (!file) return;

                // Check the type and size first: no point loading a 20 MB PDF
                const fileError = validateCoverImage(file);
                if (fileError) {
                  setErrors((prev) => ({ ...prev, coverImage: fileError }));
                  input.value = "";
                  return;
                }

                // Then load it and check the shape
                let ratioError: string | undefined;
                try {
                  const { width, height } = await readImageSize(file);
                  ratioError = validateCoverRatio(width, height);
                } catch {
                  ratioError = "We couldn't read this image. Try another file";
                }
                if (ratioError) {
                  setErrors((prev) => ({ ...prev, coverImage: ratioError }));
                  input.value = "";
                  return;
                }

                // All good: same as before
                if (preview) URL.revokeObjectURL(preview);
                setPreview(URL.createObjectURL(file));
                onUpdate({ coverImage: file });
                setErrors((prev) => ({ ...prev, coverImage: undefined }));
              }}
            />
          </label>
          {errors.coverImage && (
            <span className="inline-block mt-1 text-xs text-danger">
              {errors.coverImage}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-end">
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
