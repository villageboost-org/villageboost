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
      <span className="rounded-full border border-rust-red px-4 py-1 text-xs font-medium uppercase tracking-wide text-rust-red">
        Who it&apos;s for
      </span>

      <h2 className="mx-auto mt-4 max-w-xl text-rust-red">
        Built for creators. Backed by community
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {audiences.map((audience) => (
          <div
            key={audience.title}
            className="bg-mustard p-8 text-left"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%)",
            }}
          >
            <h3 className="text-maroon">{audience.title}</h3>
            <p className="mt-3 text-sm text-dark-grey">
              {audience.description}
            </p>
            <a
              href={audience.cta.href}
              className="mt-5 inline-block rounded-full bg-maroon px-5 py-2 text-sm font-medium text-white"
            >
              {audience.cta.label}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
