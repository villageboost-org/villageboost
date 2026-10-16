import { campaigns } from "@/app/data/campaigns";

const categories = [
  "All",
  "Visual Art",
  "Film",
  "Music",
  "Comics",
  "Theater",
  "Gaming",
  "Fashion",
];

type CampaignFiltersProps = {
  selected: string;
  onSelect: (category: string) => void;
  showCounts?: boolean;
};

export default function CampaignFilters({
  selected,
  onSelect,
  showCounts = false,
}: CampaignFiltersProps) {
  return (
    <div className="flex gap-2 md:gap-4 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden pb-1">
      {categories.map((category) => {
        const isActive = selected === category;
        const count =
          category === "All"
            ? campaigns.length
            : campaigns.filter((c) => c.category === category).length;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            className={`shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
              isActive
                ? "bg-ink text-white border-ink"
                : "border-body-gray/30 text-body-gray hover:border-ink"
            }`}>
            {category}
            {showCounts && (
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  isActive ? "bg-white/20" : "bg-body-gray/10"
                }`}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
