import Image from "next/image";

type Reason = {
  Icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
};

const reasons: Reason[] = [
  {
    Icon: "/community-icon.svg",
    iconBg: "#EEF2FF",
    iconColor: "#3463FF",
    title: "Your community, your campaign",
    description:
      "Share your campaign with your network and let them be part of bringing your vision to life.",
  },
  {
    Icon: "/money-icon.svg",
    iconBg: "#F0FDF8",
    iconColor: "#16D09A",
    title: "M-Pesa & card payments",
    description:
      "Back a campaign with M-Pesa or your debit card. Get paid out the same way. No workarounds, no friction.",
  },
  {
    Icon: "/reward-icon.svg",
    iconBg: "#FFF9E6",
    iconColor: "#C89B00",
    title: "Reward your supporters",
    description:
      "Give your backers more than a thank you. Offer exclusive perks — early access, signed copies, behind the scenes content.",
  },
];

export default function WhyVillageBoost() {
  return (
    <section id="why" className="section">
      <div className="text-center mb-12">
        <h2>Why Village Boost</h2>
      </div>

      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12">
        {reasons.map(({ Icon, title, description }) => (
          <div
            key={title}
            className="flex flex-col rounded-2xl border p-8 bg-white"
            style={{ borderColor: "#1B1C1A1A" }}>
            <Image src={Icon} alt="" width={50} height={50} />
            <h4 className="mt-5">{title}</h4>
            <p className="mt-2 text-sm">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
