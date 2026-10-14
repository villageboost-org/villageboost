import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden py-28 lg:pt-50 lg:pb-30 text-center">

      <Image
        src="/motif-1.svg"
        alt=""
        width={150}
        height={140}
        className="absolute left-0 top-10"
      />

       <Image
        src="/motif-2.svg"
        alt=""
        width={150}
        height={140}
        className="absolute left-1/4 -translate-x-1/4 top-20"
      />
      
      <Image
        src="/motif-3.svg"
        alt=""
        width={200}
        height={200}
        className="absolute right-0 top-20"
      />

      <div className="relative mx-auto max-w-3xl px-6">
        <h1>Your village is ready to back you</h1>
        <p className="mt-6 mx-auto max-w-xl text-lg">
          Village Boost is the crowdfunding platform built for East African
          creatives. Launch your campaign, share your vision, and let your
          community fund it into reality.
        </p>
        <div className="mt-10 flex items-center gap-4 w-full justify-center flex-wrap">
          <Link
            href="/start-campaign"
            className="btn-primary px-8 py-3 text-base">
            Start a campaign
          </Link>
          <Link href="/campaigns" className="btn-secondary px-8 py-3 text-base">
            Browse campaigns
          </Link>
        </div>
      </div>
    </section>
  );
}
