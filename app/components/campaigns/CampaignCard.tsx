import PlaceholderImage from "@/app/components/PlaceholderImage";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-6 w-6">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

type CampaignCardProps = {
  title: string;
  creator: string;
  initials: string;
  avatarColor: string;
  pledged: string;
  daysLeft: number;
  funded: number;
  category: string;
};

export default function CampaignCard({
  title,
  creator,
  initials,
  avatarColor,
  pledged,
  daysLeft,
  funded,
  category,
}: CampaignCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-grey/15 bg-white shadow-sm">
      <PlaceholderImage label={category} className="h-56 w-full" />

      <div className="flex flex-1 flex-col p-5 pt-2">
        <div className="flex items-center gap-2 text-sm text-grey">
          <span>{daysLeft} days left</span>
          <span className="text-grey/50">&bull;</span>
          <span>{funded}% funded</span>
        </div>

        <h3 className="mt-2 leading-none text-lg! font-bold text-maroon">{title}</h3>

        <div className="mt-2 flex items-center gap-2">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: avatarColor }}>
            {initials}
          </span>
          <span className="text-sm text-gray-800">{creator}</span>
        </div>

        <div className="mt-2 flex items-end justify-between">
          <div>
            <p className="font-bold text-rust-red">Sh {pledged}</p>
            <p className="text-sm text-grey">pledged</p>
          </div>
          <span className="text-rust-red">
            <ArrowIcon />
          </span>
        </div>
      </div>

      <div className="h-2 w-full">
        <div
          className="h-full rounded-r-full bg-rust-red"
          style={{ width: `${funded}%` }}
        />
      </div>
    </article>
  );
}
