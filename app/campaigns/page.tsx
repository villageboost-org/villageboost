import CampaignsHero from "@/app/components/campaigns/CampaignsHero";
import CampaignFilters from "@/app/components/campaigns/CampaignFilters";
import CampaignCard from "@/app/components/campaigns/CampaignCard";

const campaigns = [
  {
    title: "Hatukufi Bado Indie Stopmotion Film",
    creator: "Inkspace Bureau",
    initials: "IB",
    avatarColor: "var(--color-rust-red)",
    pledged: "100,000",
    daysLeft: 10,
    funded: 20,
    category: "Film",
  },
  {
    title: "Echoes of the Rift — Debut Album",
    creator: "Amani Sound",
    initials: "AS",
    avatarColor: "var(--color-maroon)",
    pledged: "200,000",
    daysLeft: 14,
    funded: 50,
    category: "Music",
  },
  {
    title: "Nairobi Noir — A Comic Series",
    creator: "Kelly Thompson",
    initials: "KT",
    avatarColor: "var(--color-mustard)",
    pledged: "100,000",
    daysLeft: 8,
    funded: 80,
    category: "Comics",
  },
  {
    title: "Threads of Home — Fashion Line",
    creator: "Zawadi Studio",
    initials: "ZS",
    avatarColor: "var(--color-sky-blue)",
    pledged: "150,000",
    daysLeft: 21,
    funded: 35,
    category: "Fashion",
  },
  {
    title: "The Last Griot — A Stage Play",
    creator: "Baraka Theatre",
    initials: "BT",
    avatarColor: "var(--color-rust-red)",
    pledged: "300,000",
    daysLeft: 5,
    funded: 65,
    category: "Theater",
  },
  {
    title: "Pixel Savannah — Indie Game",
    creator: "Sote Games",
    initials: "SG",
    avatarColor: "var(--color-maroon)",
    pledged: "250,000",
    daysLeft: 30,
    funded: 45,
    category: "Gaming",
  },
];

export default function CampaignsPage() {
  return (
    <main>
      <CampaignsHero />

      <section className="pb-20">
        <CampaignFilters />

        <div className="mt-10 grid xl:gap-10 gap-8 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:px-16 md:px-8 px-4">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.title} {...campaign} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button type="button" className="btn-primary">
            Load More
          </button>
        </div>
      </section>
    </main>
  );
}
