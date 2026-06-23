import PlaceholderImage from "@/app/components/PlaceholderImage";

const steps = [
  {
    title: "Build your campaign",
    description:
      "Set your goal, tell your story, and create reward tiers for your backers. It takes less than 30 minutes.",
  },
  {
    title: "Share with your village",
    description:
      "Your campaign goes live and your community can back you via M-Pesa or bank card",
  },
  {
    title: "Bring your vision to life",
    description:
      "Your backers' contributions are held securely in your campaign balance. Withdraw whenever you're ready — we only take a flat 3% when you do.",
  },
];

export default function Process() {
  return (
    <section id="process" className="px-6 py-16 text-center md:px-12">
      <span className="rounded-full border border-rust-red px-4 py-1 text-xs font-medium uppercase tracking-wide text-rust-red">
        The process
      </span>

      <h2 className="mx-auto mt-4 max-w-xl text-rust-red">
        From idea to funded, in three steps
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.title}
            className="overflow-hidden rounded-xl border border-maroon text-left"
          >
            <PlaceholderImage label="Image placeholder" className="h-40 w-full" />
            <div className="p-5">
              <h3 className="text-maroon">{step.title}</h3>
              <p className="mt-2 text-sm text-grey">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}