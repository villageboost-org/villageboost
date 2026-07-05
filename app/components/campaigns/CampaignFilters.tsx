"use client";

import { useRef, useEffect, useState } from "react";

const categories = [
  "All",
  "Visual Art",
  "Film",
  "Music",
  "Comics",
  "Theater",
  "Gaming",
  "Fashion",
];

function ChevronLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-5 w-5">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-5 w-5">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

type CampaignFiltersProps = {
  selected: string;
  onSelect: (category: string) => void;
};

export default function CampaignFilters({
  selected,
  onSelect,
}: CampaignFiltersProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth -1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();

    // the effect itself
    el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    // the cleanup function
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    const amount = 200;
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full flex items-center gap-2 xl:px-16 md:px-8 px-4">
      {/* Left arrow — small screens only */}
      <button
        type="button"
        aria-label="Scroll categories left"
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        className="shrink-0 rounded-full border border-grey/20 p-1 text-grey md:hidden disabled:opacity-30">
        <ChevronLeftIcon />
      </button>

      {/* Scrollable pill row */}
      <div
        ref={scrollRef}
        className="flex flex-1 min-w-0 gap-2 overflow-x-auto scroll-smooth justify-between md:overflow-visible scrollbar-none [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            className={`shrink-0 rounded-md px-4 py-2 text-base font-medium transition ${
              selected === category
                ? "bg-rust-red text-white"
                : "bg-grey/10 text-grey hover:bg-grey/20"
            }`}>
            {category}
          </button>
        ))}
      </div>

      {/* Right arrow — small screens only */}
      <button
        type="button"
        aria-label="Scroll categories right"
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        className="shrink-0 rounded-full border border-grey/20 p-1 text-grey md:hidden disabled:opacity-30">
        <ChevronRightIcon />
      </button>
    </div>
  );
}
