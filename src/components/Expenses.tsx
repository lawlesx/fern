import { saveExpensesAction } from "@/app/action";
import { Expense } from "@/interfaces";
import { categoryIconMap } from "@/lib/categoryIcons";
import { CheckCircle, LayoutGrid, Pencil, RotateCw } from "lucide-react";
import { useState } from "react";

interface ExpensesProps {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  isExtracting: boolean;
  isRecorded: boolean;
  setIsRecorded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Expenses = ({
  expenses,
  setExpenses,
  isExtracting,
  isRecorded,
  setIsRecorded,
}: ExpensesProps) => {
  const [statusMessage, setStatusMessage] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleSaveExpenses = async () => {
    try {
      await saveExpensesAction(expenses);
      setExpenses([]);
      setStatusMessage("Expenses saved successfully!");
      setErrorMessage(undefined);
      setIsRecorded(false);
    } catch (err) {
      console.error("Failed to save expenses:", err);
      setErrorMessage(
        typeof err === "string"
          ? err
          : "Failed to save expenses to the database.",
      );
    }
  };

  if (expenses.length === 0 && !isExtracting && isRecorded) {
    return (
      <div className="text-center text-lg text-slate-400 mt-8 font-exo2">
        No expenses extracted yet. Please record an audio note to extract
        expenses.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full mt-8">
      {expenses.length > 0 && (
        <>
          <div className="mb-2">
            <h1 className="text-3xl font-bold text-white font-audiowide">
              Extracted Items
            </h1>
            <p className="text-sm text-slate-400 mt-1 font-exo2">
              Please review the expenses captured from your voice note.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {expenses.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-600 text-white text-xs font-semibold uppercase tracking-wider font-exo2">
                    {categoryIconMap[item.category] ?? <LayoutGrid size={14} />}
                    {item.category}
                  </span>

                  <span className="text-white text-xl font-bold font-exo2">
                    ₹{item.amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-end justify-between mt-3">
                  <p className="text-slate-400 text-sm font-exo2 leading-snug max-w-[80%]">
                    {item.description}
                  </p>
                  <Pencil size={16} className="text-slate-500 shrink-0" />
                </div>
              </div>
            ))}
          </div>

          <button
            className="mt-2 w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold text-base font-exo2 hover:bg-white/30 transition-colors"
            onClick={handleSaveExpenses}
          >
            <CheckCircle size={20} />
            Save Expenses
          </button>
          <button
            className="mt-2 w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white font-semibold text-base font-exo2 hover:bg-white/30 transition-colors"
            onClick={() => {
              setExpenses([]);
              setIsRecorded(false);
            }}
          >
            <RotateCw size={20} />
            Retry Extraction
          </button>
        </>
      )}

      {statusMessage && (
        <div className="w-full p-4 text-green-400 bg-green-950/60 border border-green-800 rounded-2xl font-exo2">
          <p className="font-bold">Success</p>
          <p className="text-sm">{statusMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="w-full p-4 text-rose-400 bg-rose-950/60 border border-rose-800 rounded-2xl font-exo2">
          <p className="font-bold">Error</p>
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      {isExtracting && (
        <div className="flex items-center text-center gap-1 text-violet-400 font-medium font-audiowide text-3xl text-shadow-blue-300 text-shadow-sm">
          <span>Thinking</span>
          <span className="animate-bounce" style={{ animationDelay: "0ms" }}>
            .
          </span>
          <span className="animate-bounce" style={{ animationDelay: "150ms" }}>
            .
          </span>
          <span className="animate-bounce" style={{ animationDelay: "300ms" }}>
            .
          </span>
        </div>
      )}
    </div>
  );
};

export default Expenses;
