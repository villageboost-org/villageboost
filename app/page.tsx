import Hero from "@/app/components/home/Hero";
import Process from "@/app/components/home/Process";
import WhoItsFor from "@/app/components/home/WhoItsFor";
import WhyVillageBoost from "@/app/components/home/WhyVillageBoost";
import CtaBanner from "@/app/components/home/CtaBanner";
import Faq from "@/app/components/home/Faq";

export default function Home() {
  return (
    <main>
      <Hero />
      <Process />
      <WhoItsFor />
      <WhyVillageBoost />
      <CtaBanner />
      <Faq />
    </main>
  );
}
