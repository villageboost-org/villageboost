import { notFound } from "next/navigation";
import CampaignHero from "@/app/components/campaigns/CampaignHero";
import CampaignDetailTabs from "@/app/components/campaigns/CampaignDetailTabs";
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
      <CampaignHero campaign={campaign} />
      <CampaignDetailTabs campaign={campaign} />
    </main>
  );
}
