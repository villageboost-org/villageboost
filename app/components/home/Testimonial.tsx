import Image from "next/image";

export default function Testimonial() {
  return (
    <section className="section mx-auto max-w-2xl text-center z-10">
      <Image
        src="quotes-icon.svg"
        alt=""
        width={100}
        height={100}
        className="-z-10 absolute top-0 left-1/2 -translate-x-1/2"
      />
      <blockquote
        className="text-2xl font-bold leading-snug -mt-6"
        style={{ fontFamily: "var(--font-epilogue)", color: "#1B1C1A" }}>
        Village Boost shows that they know the art of community empowerment.
      </blockquote>
      <div className="mt-8 flex items-center justify-center gap-3">
        <Image src="/star-icon.svg" alt="" width={30} height={30} />
        <p className="font-bold text-sm text-body-gray">
          Nairobi Sketch Tour
        </p>
      </div>
    </section>
  );
}
