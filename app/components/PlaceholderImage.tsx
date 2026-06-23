export default function PlaceholderImage({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center bg-sky-blue/30 text-sm text-gray-900 ${className}`}>
      {label}
    </div>
  );
}
