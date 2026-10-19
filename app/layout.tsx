import type { Metadata } from "next";
import { Epilogue, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${epilogue.variable} ${manrope.variable} h-full scroll-smooth`}>
      <body className="h-full flex flex-col" suppressHydrationWarning>
        <Header />
        {children}
      </body>
    </html>
  );
}
