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
      <h4 className="mb-4 font-semibold!">{title}</h4>
      <div className="space-y-4 text-body-gray">{children}</div>
    </section>
  );
}
