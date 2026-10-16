"use client";
import { useEffect, useState } from "react";

type PolicySection = { id: string; title: string };

export default function PolicySidebar({
  sections,
}: {
  sections: PolicySection[];
}) {
  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      // A section counts as "active" when it crosses a thin band near the top of the viewport
      { rootMargin: "-20% 0px -70% 0px" },
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className="lg:sticky lg:top-32 lg:self-start">
      <p className="mb-4 text-sm font-bold uppercase tracking-wide text-ink">
        On this page
      </p>
      <ul className="border-l border-body-gray/30">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors hover:text-action ${
                activeId === section.id
                  ? "border-action font-bold text-action"
                  : "border-transparent text-body-gray"
              }`}>
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
