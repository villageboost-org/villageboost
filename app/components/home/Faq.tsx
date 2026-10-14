"use client";

import { useState } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";

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
      "Nothing upfront. We take a flat 5% only when a creator withdraws their funds. Backers pay no fees to us — however, Pesapal, our payment processor, charges 2.9% per card transaction and 1.5% per M-Pesa transaction. These are deducted automatically at the point of payment and go directly to Pesapal, not to us.",
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
      className="section grid gap-10 md:grid-cols-[1fr_2fr]">
      <h2>Frequently Asked Questions</h2>

      <div className="divide-y divide-body-gray/15">
        {faqs.map((faq, index) => (
          <div
            key={faq.question}
            className="py-5 cursor-pointer transition"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}>
            <div className="flex items-center justify-between gap-4">
              <h5>{faq.question}</h5>
              {openIndex === index ? <ChevronDown className="h-6 w-6" /> : <ChevronUp className="h-6 w-6" />}
            </div>
            <div
              className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${
                openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}>
              <p className="overflow-hidden pt-3">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
