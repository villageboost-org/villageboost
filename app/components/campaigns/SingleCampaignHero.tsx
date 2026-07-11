import Image from "next/image";
import PlaceholderImage from "@/app/components/PlaceholderImage";
import type { Campaign } from "@/app/data/campaigns";

function formatDeadline(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  const weekday = date.toLocaleDateString("en-GB", { weekday: "long" });
  const month = date.toLocaleDateString("en-GB", { month: "long" });
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

  return `${weekday}, ${day}${suffix} ${month} ${date.getFullYear()}`;
}

export default function SingleCampaignHero({ campaign }: { campaign: Campaign }) {
  const {
    title,
    creator,
    initials,
    avatarColor,
    pledged,
    daysLeft,
    goalAmount,
    contributors,
    deadlineDate,
    tagline,
    imageUrl,
    category,
  } = campaign;

  return (
    <section className="xl:px-16 md:px-8 px-4 pt-8">
      <div className="grid lg:grid-cols-2 bg-light-mustard">
        <div className="overflow-hidden rounded-2xl">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              width={1280}
              height={960}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-full w-full object-cover"
              priority
            />
          ) : (
            <PlaceholderImage label={category} className="h-full min-h-80 w-full" />
          )}
        </div>

        <div className="flex flex-col rounded-tr-2xl rounded-br-2xl p-8 pl-12">
          <h1 className="text-maroon">{title}</h1>

          {tagline && <p className="mt-4 text-grey">{tagline}</p>}

          <div className="flex items-center gap-2 pt-6">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ backgroundColor: avatarColor }}>
              {initials}
            </span>
            <span className="text-base text-gray-800">{creator}</span>
          </div>

          <div className="mt-6 flex items-stretch gap-6 border-t border-grey/20 pt-6">
            <div>
              <p className="text-3xl! font-bold text-rust-red">sh {pledged}</p>
              <p className="mt-1 text-sm text-grey">
                of sh{goalAmount?.toLocaleString()} pledged
              </p>
            </div>
            <div className="border-l border-grey/20 pl-6">
              <p className="text-3xl! font-bold text-rust-red">{contributors}</p>
              <p className="mt-1 text-sm text-grey">contributors</p>
            </div>
            <div className="border-l border-grey/20 pl-6">
              <p className="text-3xl! font-bold text-rust-red">{daysLeft}</p>
              <p className="mt-1 text-sm text-grey">days left</p>
            </div>
          </div>

          <a href="#contribute" className="btn-primary mt-6 text-center">
            Contribute
          </a>

          {deadlineDate && (
            <p className="mt-4 text-sm text-grey">
              This project should reach its funding goal by{" "}
              {formatDeadline(deadlineDate)}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
