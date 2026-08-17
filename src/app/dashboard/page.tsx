import { categoryIconMap } from "@/components/categoryIcons";
import HyperSpeedLayer from "@/components/HyperSpeedLayer";
import MonthPicker from "@/components/MonthPicker";
import RedirectToHomeButton from "@/components/RedirectToHomeButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getDashboardData } from "../action";

interface DashboardProps {
  searchParams: Promise<{ month?: string; year?: string }>;
}

const Dashboard = async ({ searchParams }: DashboardProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const { month, year } = await searchParams;

  const { totalMonthSpend, categorySpends } = await getDashboardData(
    month,
    year,
  );

  return (
    <section>
      <div className="aurora-bg" />
      <HyperSpeedLayer />
      <div className="relative z-10 flex-1 overflow-y-auto pb-32 px-6 pt-12 no-scrollbar">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-fern-pink to-fern-yellow p-0.5">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <span className="text-sm font-bold font-audiowide">
                  {session.user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs text-white/50 font-medium tracking-wider uppercase font-exo2">
                Welcome back
              </p>
              <p className="text-sm font-semibold font-audiowide">
                {session.user.name}
              </p>
            </div>
          </div>

          <MonthPicker />
        </header>

        <section className="mb-12 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-white/60 mb-2 font-medium font-audiowide">
            Total spent this month
          </p>

          <h1 className="text-5xl tracking-wide font-audiowide text-transparent bg-clip-text bg-linear-to-b from-white to-white/70 drop-shadow-md">
            ₹{Math.trunc(totalMonthSpend)}
            <span className="text-3xl text-white/40">
              .{totalMonthSpend.toFixed(2).split(".")[1]}
            </span>
          </h1>
        </section>

        <section>
          <h2 className="font-bold text-white/40 tracking-widest uppercase mb-6 font-exo2">
            Categories Breakdown
          </h2>

          {categorySpends.length > 0 ? (
            <div className="space-y-6">
              {categorySpends.map((category, index) => {
                const percentage =
                  totalMonthSpend > 0
                    ? (category.amount / totalMonthSpend) * 100
                    : 0;

                const gradients = [
                  "from-fern-pink to-rose-400 shadow-[0_0_10px_rgba(255,42,133,0.5)]",
                  "from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]",
                  "from-emerald-400 to-teal-500 shadow-[0_0_10px_rgba(52,211,153,0.5)]",
                  "from-purple-500 to-fuchsia-400 shadow-[0_0_10px_rgba(192,38,211,0.5)]",
                  "from-amber-400 to-orange-500 shadow-[0_0_10px_rgba(251,146,60,0.5)]",
                ];

                // 3. Pick a gradient based on the index so it loops smoothly if you have > 5 categories
                const currentGradient = gradients[index % gradients.length];

                return (
                  <div key={category.name} className="mb-4">
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {categoryIconMap[category.name]}
                        </span>
                        <span className="text-sm font-medium font-exo2">
                          {category.name}
                        </span>
                      </div>
                      <span className="font-audiowide">
                        ${category.amount.toFixed(2)}
                      </span>
                    </div>

                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-linear-to-r rounded-full animate-fill-bar ${currentGradient}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-sm text-white/60 font-exo2">
              No categories to display.
            </p>
          )}
        </section>
        <RedirectToHomeButton />
      </div>
    </section>
  );
};

export default Dashboard;
