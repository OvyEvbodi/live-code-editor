"use client"

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import SideNav from "@/components/SideNav";
import { Toaster } from "@/components/ui/toaster"

const roboto = Roboto({ weight: ["700", "300", "400", "500", "900"], subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Cat-ditor",
//   description: "A live editor designed by Ovy Evbodi",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <body className={roboto.className}>
            <SideNav />
            {children}
            <Toaster />
          </body>
        </PersistGate>
      </Provider>
    </html>
  );
}
