import Link from "next/link";

export default function Hero() {
  return (
    <section className="px-6 py-20 lg:py-34 text-center mx-auto max-w-xl lg:max-w-3xl">
      <div>
        <h1 className="text-rust-red">
          Your village is ready to back you
        </h1>
        <h4 className="mt-4 text-maroon">
          Village Boost is the crowdfunding platform built for East African
          creatives. Launch your campaign, share your vision, and let your
          community fund it into reality.
        </h4>
        <div className="mt-8 flex items-center gap-8 w-full justify-center flex-wrap">
          <Link href="/start-campaign" className="btn-primary">
            Start a campaign
          </Link>
          <Link
            href="/campaigns"
            className="font-medium text-rust-red underline underline-offset-4">
            Browse campaigns
          </Link>
        </div>
      </div>
    </section>
  );
}
