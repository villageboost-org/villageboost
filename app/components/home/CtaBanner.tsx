"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function CtaBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !imageRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Moves the image a fraction of how far the section's centre is
      // from the viewport's centre, so it drifts as you scroll past it.
      const offset =
        (rect.top + rect.height / 2 - window.innerHeight / 2) * 0.9;
      imageRef.current.style.transform = `translateY(${offset}px)`;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-8 py-44 text-center text-white"
    >
      <Image
        ref={imageRef}
        src="/banner-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="scale-110 object-cover will-change-transform"
      />

      <div className="relative">
        <h2 className="text-white">Include your village in your next project</h2>
        <h4 className="mt-3 font-medium! text-white">
          Join the first wave of creators on Village Boost
        </h4>
        <a
          href="/start-campaign"
          className="mt-6 btn-primary text-lg bg-white text-rust-red">
          Start a campaign
        </a>
      </div>
    </section>
  );
}
