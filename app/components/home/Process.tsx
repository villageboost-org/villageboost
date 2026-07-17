import Image from "next/image";

const steps = [
  {
    title: "Build your campaign",
    description:
      "Set your goal, tell your story, and create reward tiers for your backers. It takes less than 30 minutes.",
    src: "/process-1.jpg",
  },
  {
    title: "Share with your village",
    description:
      "Your campaign goes live and your community can back you via M-Pesa or bank card",
    src: "/process-2.jpg",
  },
  {
    title: "Bring your vision to life",
    description:
      "Your backers' contributions are held securely in your campaign balance. Withdraw whenever you're ready — we only take a flat 3% when you do.",
    src: "/process-3.jpg",
  },
];

export default function Process() {
  return (
    <section id="process" className="pb-16 text-center xl:px-16 md:px-8 px-4">
      <span className="eyebrow-headline">
        The process
      </span>

      <h2 className="mx-auto text-rust-red">
        From idea to funded, in three steps
      </h2>

      <div className="mt-10 grid xl:gap-20 gap-8 xl:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {steps.map((step) => (
          <div
            key={step.title}
            className="max-w-md overflow-hidden rounded-xl border-[3px] border-maroon text-left">
            <div className="p-4">
              <Image
                src={step.src}
                alt={step.title}
                width={400}
                height={300}
                className="h-54 w-full object-cover rounded-xl"
              />
            </div>
            <div className="p-5 pt-0">
              <h4 className="text-maroon">{step.title}</h4>
              <p className="mt-2 text-grey font-medium">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
