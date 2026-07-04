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

export default function CampaignFilters() {
  return (
    <div className="flex flex-wrap justify-between gap-2 xl:px-16 md:px-8 px-4">
      {categories.map((category, index) => (
        <button
          key={category}
          type="button"
          className={`rounded-md px-4 py-2 text-base font-medium transition ${
            index === 0
              ? "bg-rust-red text-white"
              : "bg-grey/10 text-grey hover:bg-grey/20"
          }`}>
          {category}
        </button>
      ))}
    </div>
  );
}
