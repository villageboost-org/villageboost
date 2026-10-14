import Link from "next/link";
import Image from "next/image";

import { Check } from "lucide-react";

const audiences = [
  {
    label: "FOR SOVEREIGN MAKERS",
    title: "Creators",
    description:
      "Whether you're a filmmaker, musician, visual artist, writer, or designer — Village Boost gives you the tools to fund your next project on your own terms.",
    bullets: [
      "5% transaction fee only — zero upfront launch fees",
      "Withdraw campaign money straight to your phone",
      "M-Pesa & card payments for your backers",
    ],
    cta: { label: "Start a campaign", href: "/start-campaign" },
    ctaStyle: "bg-ink text-white",
    bg: "#FFFFFF",
    circleImage: "/creator-blurred-circle.svg",
    labelBg: "bg-ink",
  },
  {
    label: "FOR BACKERS & PATRONS",
    title: "Contributors",
    description:
      "Discover East African creative projects worth believing in. Back the ones that move you, and be part of bringing them to life.",
    bullets: [
      "Back a campaign with M-Pesa or your debit card",
      "Unlock exclusive perks from creators you love",
      "Discover and support East African creative projects",
    ],
    cta: { label: "Browse campaigns", href: "/campaigns" },
    ctaStyle: "bg-white text-ink",
    bg: "#F5F3F0",
    circleImage: "/contributor-blurred-circle.svg",
    labelBg: "bg-action",
  },
];

export default function WhoItsFor() {
  return (
    <section
      className="section"
      style={{ backgroundColor: "#FBF9F6" }}>
      <div className="text-center mb-12">
        <h2>Built for creators. Backed by community</h2>
      </div>

      <div className="grid gap-20 md:grid-cols-2">
        {audiences.map((audience) => (
          <div
            key={audience.title}
            className="relative flex flex-col rounded-3xl shadow-md/20 p-8"
            style={{ backgroundColor: audience.bg }}>
            <Image
              src={audience.circleImage}
              alt=""
              width={150}
              height={150}
              className="absolute top-0 right-0 rounded-3xl"
            />
            <span className={`text-xs font-bold uppercase ${audience.labelBg} text-white py-1 px-3 w-fit rounded-2xl mb-5`}>
              {audience.label}
            </span>
            <h3>{audience.title}</h3>
            <p className="mt-3">{audience.description}</p>
            <ul className="mt-6 space-y-3">
              {audience.bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-3">
                  <div className="bg-progress/20 rounded-full p-1.5">
                    <Check className="h-5 w-5 shrink-0" style={{ color: "#16D09A" }} />
                  </div>
                  <span className="text-sm">{bullet}</span>
                </li>
              ))}
            </ul>
            <Link
              href={audience.cta.href}
              className={`mt-8 btn-primary self-start ${audience.ctaStyle}`}>
              {audience.cta.label}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
