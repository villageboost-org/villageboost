"use client";

import { useState } from "react";

function ChevronDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-6 w-6">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-6 w-6">
      <path d="m6 15 6-6 6 6" />
    </svg>
  );
}

const faqs = [
  {
    question: "Who can create a campaign on Village Boost?",
    answer:
      "Any East African creative — musician, filmmaker, visual artist, designer, writer, or photographer. If you have a project worth funding, Village Boost is for you.",
  },
  {
    question: "How do I back a campaign?",
    answer:
      "Simply choose a campaign you believe in, pick a reward tier, and pay via M-Pesa or debit card. No account needed to back a campaign.",
  },
  {
    question: "When does a creator receive their money?",
    answer:
      "Creators can withdraw their campaign balance at any time. There's no deadline to wait for — funds are available as contributions come in.",
  },
  {
    question: "What fees does Village Boost charge?",
    answer:
      "Nothing upfront. We take a flat 3% only when a creator withdraws their funds. Backers pay no fees to us — however, Paystack, our payment processor, charges 2.9% per card transaction and 1.5% per M-Pesa transaction. These are deducted automatically at the point of payment and go directly to Paystack, not to us.",
  },
  {
    question: "What happens if a campaign doesn't reach its goal?",
    answer:
      "Campaigns on Village Boost are open-ended — there's no penalty for not hitting your target. Creators keep whatever they raise and withdraw on their own terms.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="grid gap-10 px-6 py-16 md:grid-cols-[1fr_2fr] md:px-16">
      <h2 className="text-rust-red">Frequently Asked Questions</h2>

      <div className="divide-y divide-grey/20">
        {faqs.map((faq, index) => (
          <div
            key={faq.question}
            className="py-4 cursor-pointer transition"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}>
            <div className="flex items-center justify-between">
              <h4 className="text-maroon">{faq.question}</h4>
              {openIndex === index ? <ChevronDownIcon /> : <ChevronUpIcon />}
            </div>
            <div
              className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${
                openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}>
              <p className="overflow-hidden pt-2 text-lg! text-gray-900">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
