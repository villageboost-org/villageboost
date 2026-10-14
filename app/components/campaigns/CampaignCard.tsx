import Image from "next/image";
import PlaceholderImage from "@/app/components/PlaceholderImage";
import type { CreatorInfo } from "@/app/data/campaigns";

type CampaignCardProps = {
  title: string;
  tagline?: string;
  creator?: CreatorInfo;
  pledged: string;
  daysLeft: number;
  funded: number;
  category: string;
  contributors?: number;
  imageUrl?: string;
};

export default function CampaignCard({
  title,
  tagline,
  creator,
  daysLeft,
  funded,
  category,
  contributors,
  imageUrl,
}: CampaignCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-md"
      style={{ borderColor: "rgba(68,71,72,0.12)" }}>
      {/* Image with funded badge overlay */}
      <div className="relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={1280}
            height={720}
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="aspect-video w-full object-cover"
          />
        ) : (
          <PlaceholderImage label={category} className="aspect-video w-full" />
        )}
        <span
          className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white"
          style={{ backgroundColor: "rgba(27,28,26,0.78)", backdropFilter: "blur(4px)" }}>
          {funded}% funded
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3
          className="font-bold leading-snug line-clamp-2"
          style={{ fontSize: "1rem", color: "#1B1C1A" }}>
          {title}
        </h3>

        {tagline && (
          <p className="mt-1.5 text-sm! line-clamp-2" style={{ color: "#444748" }}>
            {tagline}
          </p>
        )}

        {/* Creator */}
        <div className="mt-3 flex items-center gap-2">
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: creator?.avatarColor ?? "#444748" }}>
            {creator?.initials ?? "?"}
          </span>
          <span className="text-sm truncate" style={{ color: "#444748" }}>
            {creator?.name ?? "Unknown creator"}
          </span>
        </div>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="tag-pill">{daysLeft} days left</span>
          {contributors !== undefined && (
            <span className="tag-pill">{contributors} contributors</span>
          )}
        </div>

        {/* Progress bar */}
        <div
          className="mt-4 h-1.5 w-full rounded-full"
          style={{ backgroundColor: "rgba(68,71,72,0.1)" }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${Math.min(funded, 100)}%`,
              backgroundColor: "#16D09A",
            }}
          />
        </div>

        {/* CTA */}
        <div
          className="mt-4 rounded-full py-2.5 text-center text-sm font-bold text-white"
          style={{ backgroundColor: "#1B1C1A" }}>
          Back campaign
        </div>
      </div>
    </article>
  );
}
