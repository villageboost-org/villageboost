export default function PolicySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32">
      <h2 className="mb-4 text-[1.375rem]! font-semibold!">{title}</h2>
      <div className="space-y-4 text-body-gray">{children}</div>
    </section>
  );
}
