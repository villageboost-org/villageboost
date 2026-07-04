import Image from "next/image";

export default function CampaignsHero() {
  return (
    <section className="grid items-center xl:gap-10 gap-4 px-6 py-12 md:grid-cols-2 xl:pl-16 md:pl-8 pl-4 md:pr-0">
      <div>
        <h1 className="text-rust-red">Campaigns</h1>
        <h4 className="mt-4 max-w-md text-maroon">
          Discover East African creatives bringing their visions to life and be
          part of making it happen.
        </h4>
      </div>

      <div className="flex items-end justify-end">
        <Image
          className="h-auto w-full max-w-xl"
          src="/staircase.svg"
          alt="staircase graphic"
          width={700}
          height={500}
        />
      </div>
    </section>
  );
}
