import EtherScreen from "@/components/EtherScreen";
import HomeListener from "@/components/HomeListener";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-center px-4 relative">
      <EtherScreen />
      <HomeListener />
    </main>
  );
}
