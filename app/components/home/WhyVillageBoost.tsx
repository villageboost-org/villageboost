const reasons = [
  {
    title: "M-Pesa & card payments",
    description:
      "Back a campaign with M-Pesa or your debit card — whichever works for you. Get paid out the same way. No workarounds, no friction.",
  },
  {
    title: "Withdraw on your terms",
    description:
      "Your contributors' contributions are held securely and you can withdraw whenever you're ready. No waiting for a funding deadline.",
  },
  {
    title: "Simple, honest fees",
    description:
      "We take a flat 3% only when you withdraw your funds. Nothing upfront, nothing hidden — we only earn when you do.",
  },
];

export default function WhyVillageBoost() {
  return (
    <section className="px-6 py-30 text-center md:px-16">
      <h2 className="text-rust-red">Why Village Boost</h2>

      <div className="mt-10 grid gap-20 md:grid-cols-3">
        {reasons.map((reason) => (
          <div
            key={reason.title}
            className="flex max-w-sm flex-col rounded-xl p-8 text-left border-[#ffad90] border-[3px]"
            style={{
              background:
                "linear-gradient(to top left, var(--color-maroon) 50%, var(--color-rust-red) 50%)",
            }}
          >
            <h3 className="text-white">{reason.title}</h3>
            <h5 className="mt-3 text-sm text-light-mustard">
              {reason.description}
            </h5>
          </div>
        ))}
      </div>
    </section>
  );
}
