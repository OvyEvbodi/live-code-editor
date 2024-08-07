import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import SideNav from "@/components/SideNav";

const roboto = Roboto({ weight: ["700", "300", "400", "500", "900"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cat-ditor",
  description: "A live editor designed by Ovy Evbodi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
      <SideNav />
        {children}
        </body>
    </html>
  );
}
