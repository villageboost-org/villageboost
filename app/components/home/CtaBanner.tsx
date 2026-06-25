export default function CtaBanner() {
  return (
    <section
      className="relative bg-cover bg-center bg-fixed bg-no-repeat px-8 py-44 text-center text-white"
      style={{ backgroundImage: "url('/banner-bg.webp')" }}
    >
      <div className="relative">
        <h2 className="text-white">Include your village in your next project</h2>
        <h4 className="mt-3 font-medium! text-white">
          Join the first wave of creators on Village Boost
        </h4>
        <a
          href="/start-campaign"
          className="mt-6 btn-primary text-lg bg-white text-rust-red">
          Start a campaign
        </a>
      </div>
    </section>
  );
}
