import Link from "next/link";

export default function CtaBanner() {
  return (
    <section
      className="mb-20 relative overflow-hidden py-20 px-6 text-center max-w-4xl mx-auto rounded-3xl"
      style={{ backgroundColor: "#1B1C1A" }}>
      {/* Decorative circles */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full opacity-15"
        style={{ backgroundColor: "#3463FF" }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full opacity-15"
        style={{ backgroundColor: "#16D09A" }}
      />
      <div
        className="pointer-events-none absolute top-1/3 right-1/4 h-10 w-10 rounded-full opacity-25"
        style={{ backgroundColor: "#FFD028" }}
      />
      <div
        className="pointer-events-none absolute bottom-1/3 left-1/4 h-6 w-6 rounded-full opacity-20"
        style={{ backgroundColor: "#FF4D8F" }}
      />

      <div className="">
        <span className="inline-block font-[Epilogue] font-bold text-sm text-white bg-body-gray/30 rounded-2xl py-1 px-4 mb-8">IT TAKES A VILLAGE</span>
        <h2 className="text-white">
          Include your village in your next project
        </h2>
        <p className="mt-4 text-white/70 text-lg">
          Join the first wave of creators on Village Boost. No upfront costs,
          instant mobile payouts, direct community connections.
        </p>
        <div className="mt-10 flex items-center gap-4 justify-center flex-wrap">
          <Link
            href="/start-campaign"
            className="rounded-full bg-white px-8 py-3 text-sm font-bold text-ink hover:bg-white/90 transition-opacity">
            Start a campaign
          </Link>
          <Link
            href="/campaigns"
            className="rounded-full border-2 border-white px-8 py-3 text-sm font-bold text-white hover:bg-white/10 transition-colors">
            Browse campaigns
          </Link>
        </div>
      </div>
    </section>
  );
}
