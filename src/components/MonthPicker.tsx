"use client";

import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function MonthPicker() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current date as fallbacks
  const date = new Date();
  const currentMonth = searchParams.get("month") || String(date.getMonth() + 1);
  const currentYear = searchParams.get("year") || String(date.getFullYear());

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [year, month] = e.target.value.split("-");
    router.push(`?month=${month}&year=${year}`);
  };

  const displayDate = new Date(
    Number(currentYear),
    Number(currentMonth) - 1,
  ).toLocaleString("en-US", { month: "short", year: "numeric" });

  // Dynamically generate exactly the last 12 months
  const last12Months = Array.from({ length: 12 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i); // Automatically rolls back the year when needed

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const label = d.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });

    return { value: `${year}-${month}`, label };
  });

  return (
    <div className="relative">
      <select
        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        value={`${currentYear}-${currentMonth.padStart(2, "0")}`}
        onChange={handleMonthChange}
      >
        {last12Months.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button className="rounded-2xl flex items-center justify-center gap-2 py-2 px-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold text-base font-exo2 hover:bg-white/30 transition-colors pointer-events-none">
        <span className="text-sm font-medium font-exo2">{displayDate}</span>
        <ChevronDown className="w-4" />
      </button>
    </div>
  );
}
