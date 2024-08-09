import HomeScreen from "@/components/HomeScreen";
import Logo from "@/components/Logo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cat-ditor",
  description: "A live editor designed by Ovy Evbodi",
};

export default function Home() {
  return (
    <main className="">
      <Logo />
      <HomeScreen />
    </main>
  );
}
