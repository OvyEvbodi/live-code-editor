import HomeScreen from "@/components/HomeScreen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cat-ditor",
  description: "A live editor designed by Ovy Evbodi",
};

export default function Home() {
  return (
    <main className="">
      <h1>Caditor</h1>
      <HomeScreen />
    </main>
  );
}
