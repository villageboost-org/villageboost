import Image from "next/image";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden px-8 py-46 text-center text-white">
      <Image
        src="/banner-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />

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
