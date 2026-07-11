import { notFound } from "next/navigation";
import SingleCampaignHero from "@/app/components/campaigns/SingleCampaignHero";
import SingleCampaignDetails from "@/app/components/campaigns/SingleCampaignDetails";
import { campaigns } from "@/app/data/campaigns";

export function generateStaticParams() {
  return campaigns.map((campaign) => ({ slug: campaign.slug }));
}

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const campaign = campaigns.find((c) => c.slug === slug);

  if (!campaign) {
    notFound();
  }

  return (
    <main className="pb-20">
      <SingleCampaignHero campaign={campaign} />
      <SingleCampaignDetails campaign={campaign} />
    </main>
  );
}
