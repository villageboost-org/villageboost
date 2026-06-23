function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
      <path d="m6 15 6-6 6 6" />
    </svg>
  );
}

const faqs = [
  {
    question: "Who can create a campaign on Village Boost?",
    answer:
      "Any East African creative — musician, filmmaker, visual artist, designer, writer, or photographer. If you have a project worth funding, Village Boost is for you.",
    open: true,
  },
  { question: "How do I back a campaign?", open: false },
  { question: "When does a creator receive their money?", open: false },
  { question: "What fees does Village Boost charge?", open: false },
  { question: "What happens if a campaign doesn't reach its goal?", open: false },
];


export default function Faq() {
  return (
    <section id="faq" className="grid gap-10 px-6 py-16 md:grid-cols-[1fr_2fr] md:px-12">
      <h2 className="text-rust-red">Frequently Asked Questions</h2>

      <div className="divide-y divide-grey/20">
        {faqs.map((faq) => (
          <div key={faq.question} className="py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-maroon">{faq.question}</h3>
              {faq.open ? <ChevronDownIcon /> : <ChevronUpIcon />}
            </div>
            {faq.open && faq.answer && (
              <p className="mt-2 max-w-xl text-sm text-grey">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
