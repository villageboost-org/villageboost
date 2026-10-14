import Image from "next/image";

type Step = {
  number: string;
  title: string;
  description: string;
  icon: string;
  badge?: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Build your campaign",
    description:
      "Set your goal, tell your story, and create reward tiers for your backers. It takes less than 30 minutes.",
    icon: "/build-campaign-icon.svg",
  },
  {
    number: "02",
    title: "Share with your village",
    description:
      "Your campaign goes live and your community can back you via M-Pesa or bank card with zero friction.",
    icon: "/share-village-icon.svg",
    badge: "M-PESA READY",
  },
  {
    number: "03",
    title: "Bring your vision to life",
    description:
      "Your backers' contributions are held securely in your campaign balance. Withdraw whenever you're ready — we only take a flat 5% when you do.",
    icon: "/bring-vision-icon.svg",
  },
];

export default function Process() {
  return (
    <section id="process" className="section">
      <Image
        src="/motif-5.svg"
        alt=""
        width={100}
        height={100}
        className="absolute left-16 top-0"
      />
      <Image
        src="/motif-6.svg"
        alt=""
        width={150}
        height={150}
        className="absolute right-40 top-20"
      />
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h2>From idea to funded, in three steps</h2>
        <p className="mt-3">
          Crowdfunding as you know it, but with the East African community
          behind you.
        </p>
      </div>

      <div className="grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-12 text-center">
        {steps.map((step) => (
          <div
            key={step.number}
            className="relative flex flex-col rounded-3xl shadow-md/20 bg-white p-8 shadow-sm"
            style={{ border: "1px solid rgba(68,71,72,0.08)" }}>
            {step.badge && (
              <span className="absolute rotate-23 top-2 -right-2 inline-flex items-center rounded-full bg-yellow px-3 py-1 text-xs font-bold text-ink tracking-wide">
                {step.badge}
              </span>
            )}
            <div className="flex h-16 w-16  mb-6 mx-auto">
              <Image src={step.icon} alt="" width={80} height={80} />
            </div>
            <p
              className="text-sm! font-bold tracking-widest mb-2"
              style={{ color: "#3463ff" }}>
              STEP {step.number}
            </p>
            <h4 className="font-bold mb-3">{step.title}</h4>
            <p className="text-sm leading-relaxed" style={{ color: "#444748" }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
