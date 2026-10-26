import type { Metadata } from "next";
import { Epilogue, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import { createClient } from "@/lib/supabase/server";

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Village Boost",
  description: "East Africa's crowdfunding platform for creators.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Only what the header needs. full_name was saved at sign-up, so we don't need to fetch it again.
  const headerUser = user
    ? {
        id: user.id,
        fullName: (user.user_metadata.full_name as string) ?? "",
        email: user.email ?? "",
      }
    : null;
  return (
    <html
      lang="en"
      className={`${epilogue.variable} ${manrope.variable} h-full scroll-smooth`}>
      <body className="h-full flex flex-col" suppressHydrationWarning>
        <Header user={headerUser} />
        {children}
      </body>
    </html>
  );
}
