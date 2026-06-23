export default function CtaBanner() {
  return (
    <section className="bg-light-mustard px-6 py-16 md:px-12">
      <div
        className="mx-auto max-w-4xl rounded-2xl px-8 py-16 text-center text-white"
        style={{
          background:
            "linear-gradient(53deg, var(--color-rust-red) 50%, var(--color-maroon) 50%)",
        }}
      >
        <h2 className="text-white">Your next project deserves a village</h2>
        <h4 className="mt-3 font-medium! text-light-mustard">
          Join the first wave of creators on Village Boost
        </h4>
        <a
          href="/start-campaign"
          className="mt-6 btn-primary text-lg bg-white text-rust-red"
        >
          Start a campaign
        </a>
      </div>
    </section>
  );
}
