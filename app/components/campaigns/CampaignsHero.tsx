import Image from "next/image";
import motif13 from "@/public/motif-13.svg";
import motif14 from "@/public/motif-14.svg";

export default function CampaignsHero() {
  return (
    <section className="relative px-6 pt-32 pb-16 lg:pt-40 lg:pb-20">
      <Image
        src={motif13}
        alt=""
        className="absolute left-0 top-24 w-20 md:w-32 xl:w-auto"
      />

      <div className="relative z-10 mx-auto max-w-xl lg:max-w-3xl text-center">
        <Image
          src={motif14}
          alt=""
          className="mx-auto w-56 md:w-auto"
          priority
        />
        <h1 className="mt-6">Campaigns</h1>
        <h5 className="font-normal! mt-6 text-body-gray">
          Discover East African creatives bringing their visions to life and be
          part of making it happen.
        </h5>
      </div>
    </section>
  );
}
