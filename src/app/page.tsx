import EtherScreen from "@/components/EtherScreen";
import HomeListener from "@/components/HomeListener";

export default function Home() {
  return (
    <main className="flex w-full h-full flex-col items-center justify-center p-24 relative">
      <EtherScreen />
      <HomeListener />
    </main>
  );
}
