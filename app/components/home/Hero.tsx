const stairColors = [
  "bg-mustard",
  "bg-sky-blue",
  "bg-rust-red",
  "bg-cream",
];

export default function Hero() {
  return (
    <section className="grid items-center gap-10 px-6 py-12 md:grid-cols-2 md:px-12">
      <div>
        <h1 className="max-w-md text-rust-red">
          Your village is ready to back you
        </h1>
        <p className="mt-4 max-w-md text-grey">
          Village Boost is the crowdfunding platform built for East African
          creatives. Launch your campaign, share your vision, and let your
          community fund it into reality.
        </p>
        <div className="mt-6 flex items-center gap-6">
          <a
            href="/start-campaign"
            className="rounded-full bg-maroon px-6 py-3 text-sm font-medium text-white"
          >
            Start a campaign
          </a>
          <a
            href="/campaigns"
            className="text-sm font-medium text-rust-red underline"
          >
            Browse campaigns
          </a>
        </div>
      </div>

      <div className="flex h-64 items-end justify-center gap-2 md:h-80">
        {stairColors.map((color, index) => (
          <div
            key={color}
            className={`${color} w-16 rounded-md`}
            style={{ height: `${40 + index * 18}%` }}
          />
        ))}
        {[...stairColors].reverse().map((color, index) => (
          <div
            key={`${color}-${index}`}
            className={`${color} w-16 rounded-md`}
            style={{ height: `${40 + (stairColors.length - 1 - index) * 18}%` }}
          />
        ))}
      </div>
    </section>
  );
}
