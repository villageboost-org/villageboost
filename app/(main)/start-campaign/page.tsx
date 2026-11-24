import Image from "next/image";
import motif16 from "@/public/motif-16.svg";
import CampaignWizard from "./CampaignWizard";

export const metadata = {
  title: "Start a Campaign | Village Boost",
  description:
    "Set up your Village Boost campaign: the basics, your story, funding goal and rewards.",
};

export default function StartCampaignPage() {
  return (
    <main className="relative overflow-x-clip bg-paper pt-32 pb-20 lg:pt-40 lg:px-30 md:px-8 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <div className="relative">
          <Image
            src={motif16}
            alt=""
            className="w-20 md:w-40 lg:absolute lg:left-0 lg:-top-8"
            priority
          />
          <h1 className="mt-6 text-center text-body-gray lg:mt-0 lg:pt-14">
            Start Your Campaign
          </h1>
        </div>

        <CampaignWizard />
      </div>
    </main>
  );
}
