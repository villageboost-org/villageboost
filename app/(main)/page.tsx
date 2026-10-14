import Hero from "@/app/components/home/Hero";
import CampaignsPreview from "@/app/components/home/CampaignsPreview";
import Process from "@/app/components/home/Process";
import WhoItsFor from "@/app/components/home/WhoItsFor";
import WhyVillageBoost from "@/app/components/home/WhyVillageBoost";
import Testimonial from "@/app/components/home/Testimonial";
import Faq from "@/app/components/home/Faq";
import CtaBanner from "@/app/components/home/CtaBanner";

export default function Home() {
  return (
    <main className="bg-paper">
      <Hero />
      <CampaignsPreview />
      <Process />
      <WhoItsFor />
      <WhyVillageBoost />
      <Testimonial />
      <Faq />
      <CtaBanner />
    </main>
  );
}
