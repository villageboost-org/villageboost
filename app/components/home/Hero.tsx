import Image from 'next/image';

export default function Hero() {
  return (
    <section className="grid items-center xl:gap-10 gap-4 px-6 py-12 md:grid-cols-2 xl:pl-16 md:pl-8 pl-4 md:pr-0">
      <div>
        <h1 className="max-w-lg text-rust-red">
          Your village is ready to back you
        </h1>
        <h4 className="mt-4 text-maroon">
          Village Boost is the crowdfunding platform built for East African
          creatives. Launch your campaign, share your vision, and let your
          community fund it into reality.
        </h4>
        <div className="mt-8 flex items-center gap-8">
          <a href="/start-campaign" className="btn-primary xl:text-lg text-base">
            Start a campaign
          </a>
          <a
            href="/campaigns"
            className="xl:text-lg text-base font-medium text-rust-red underline underline-offset-4">
            Browse campaigns
          </a>
        </div>
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
