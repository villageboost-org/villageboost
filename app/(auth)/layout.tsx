import { Toaster } from "sonner";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-0 flex-1 flex-col bg-paper">
      {children}
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          style: { fontFamily: "var(--font-manrope)" },
        }}
      />
    </main>
  );
}
