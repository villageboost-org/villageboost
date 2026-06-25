const reasons = [
  {
    title: "Your community, your campaign",
    description:
      "Share your campaign with your network and let them be part of bringing your vision to life.",
  },
  {
    title: "M-Pesa & card payments",
    description:
      "Back a campaign with M-Pesa or your debit card — whichever works for you. Get paid out the same way. No workarounds, no friction.",
  },
  {
    title: "Reward your supporters",
    description:
      "Give your backers more than a thank you. Offer exclusive perks — early access, signed copies, behind the scenes content, experiences. Make them feel like insiders.",
  },
];

export default function WhyVillageBoost() {
  return (
    <section className="py-30 text-center xl:px-16 md:px-8 px-4">
      <h2 className="text-rust-red">Why Village Boost</h2>

      <div className="mt-10 grid xl:gap-20 gap-8 md:grid-cols-3">
        {reasons.map((reason) => (
          <div
            key={reason.title}
            className="flex max-w-md flex-col rounded-xl p-8 text-left border-[#ffad90] border-[3px]"
            style={{
              background:
                "linear-gradient(to top left, var(--color-maroon) 50%, var(--color-rust-red) 50%)",
            }}>
            <h4 className="text-white">{reason.title}</h4>
            <h5 className="mt-3 text-light-mustard">
              {reason.description}
            </h5>
          </div>
        ))}
      </div>
    </section>
  );
}
