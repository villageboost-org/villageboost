export default function CtaBanner() {
  return (
    <section className="bg-light-mustard px-6 py-16 md:px-12">
      <div
        className="mx-auto max-w-4xl bg-linear-to-r from-maroon to-rust-red px-8 py-16 text-center text-white"
        style={{
          clipPath: "polygon(36px 0, 100% 0, 100% 100%, 0 100%, 0 36px)",
        }}
      >
        <h2 className="text-white">Your next project deserves a village</h2>
        <p className="mt-3 text-light-mustard">
          Join the first wave of creators on Village Boost
        </p>
        <a
          href="/start-campaign"
          className="mt-6 inline-block rounded-md bg-white px-6 py-3 text-sm font-medium text-maroon"
        >
          Start a campaign
        </a>
      </div>
    </section>
  );
}
