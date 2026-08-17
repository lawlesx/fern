import { auth } from "@/lib/auth";
import { ChevronDown } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  return (
    <section>
      <div className="aurora-bg" />
      <div className="relative z-10 flex-1 overflow-y-auto pb-32 px-6 pt-12 no-scrollbar">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-fern-pink to-fern-yellow p-0.5">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <span className="text-sm font-bold font-audiowide">A</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-white/50 font-medium tracking-wider uppercase font-exo2">
                Welcome back
              </p>
              <p className="text-sm font-semibold font-audiowide">Aniruddha</p>
            </div>
          </div>

          <button className="rounded-2xl flex items-center justify-center gap-2 py-2 px-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold text-base font-exo2 hover:bg-white/30 transition-colors">
            <span className="text-xs font-medium font-exo2">Aug 2026</span>
            <ChevronDown className="w-4" />
          </button>
        </header>

        <section className="mb-12 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-white/60 mb-2 font-medium font-audiowide">
            Total spent this month
          </p>

          <h1 className="text-5xl tracking-wide font-audiowide text-transparent bg-clip-text bg-linear-to-b from-white to-white/70 drop-shadow-md">
            $1,240<span className="text-3xl text-white/40">.50</span>
          </h1>
        </section>

        <section>
          <h2 className="text-xs font-bold text-white/40 tracking-widest uppercase mb-6 font-exo2">
            Top Categories
          </h2>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-end mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🍔</span>
                  <span className="text-sm font-medium font-exo2">
                    Food & Dining
                  </span>
                </div>
                <span className="font-audiowide">$450.00</span>
              </div>

              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-fern-pink to-rose-400 rounded-full animate-fill-bar shadow-[0_0_10px_rgba(255,42,133,0.5)]"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🛍️</span>
                  <span className="text-sm font-medium">Shopping</span>
                </div>
                <span className="text-sm font-audiowide">$320.50</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-fern-cyan to-blue-400 rounded-full animate-fill-bar shadow-[0_0_10px_rgba(0,243,255,0.5)]"
                  style={{ width: "32%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  <span className="text-sm font-medium">Bills & Utilities</span>
                </div>
                <span className="text-sm font-audiowide">$280.00</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-fern-yellow to-orange-400 rounded-full animate-fill-bar shadow-[0_0_10px_rgba(255,223,0,0.5)]"
                  style={{ width: "28%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🚕</span>
                  <span className="text-sm font-medium">Transport</span>
                </div>
                <span className="text-sm font-audiowide">$190.00</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white/80 rounded-full animate-fill-bar shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                  style={{ width: "19%" }}
                ></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Dashboard;
