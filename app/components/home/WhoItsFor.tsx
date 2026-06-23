const audiences = [
  {
    title: "Creators",
    description:
      "Whether you're a filmmaker, musician, visual artist, writer, or designer — Village Boost gives you the tools to fund your next project on your own terms.",
    cta: { label: "Start a campaign", href: "/start-campaign" },
  },
  {
    title: "Contributors",
    description:
      "Discover East African creative projects worth believing in. Back the ones that move you, and be part of bringing them to life.",
    cta: { label: "Browse campaigns", href: "/campaigns" },
  },
];

export default function WhoItsFor() {
  return (
    <section className="bg-light-mustard px-6 py-16 text-center md:px-12">
      <span className="eyebrow-headline">Who it&apos;s for</span>

      <h2 className="mx-auto max-w-xl text-rust-red">
        Built for creators. Backed by community
      </h2>

      <div className="mt-10 grid gap-8 md:grid-cols-2 justify-items-center">
        {audiences.map((audience) => (
          <div
            key={audience.title}
            className="flex max-w-md flex-col rounded-xl p-8 text-left border-rust-red/30 border-[3px]"
            style={{
              background:
                "linear-gradient(to top left, var(--color-mustard) 50%, var(--color-cream) 50%)",
            }}>
            <h3 className="text-maroon">{audience.title}</h3>
            <h5 className="my-3 text-gray-900">{audience.description}</h5>
            <a
              href={audience.cta.href}
              className="mt-auto self-start btn-primary">
              {audience.cta.label}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
