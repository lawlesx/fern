import SessionGaurd from "@/components/SessionGaurd";

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-center px-4 relative">
      <SessionGaurd />
    </main>
  );
}
