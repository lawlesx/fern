import { saveExpensesAction } from "@/app/action";
import { Expense } from "@/interfaces";
import { useState } from "react";

interface ExpensesProps {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  isExtracting: boolean;
}

const Expenses = ({ expenses, setExpenses, isExtracting }: ExpensesProps) => {
  const [statusMessage, setStatusMessage] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleSaveExpenses = async () => {
    try {
      await saveExpensesAction(expenses);
      setExpenses([]); // Clear the list after saving
      setStatusMessage("Expenses saved successfully!");
    } catch (err) {
      console.error("Failed to save expenses:", err);
      setErrorMessage(
        typeof err === "string"
          ? err
          : "Failed to save expenses to the database.",
      );
    }
  };

  return (
    <div>
      {expenses.length > 0 && (
        <div className="flex flex-col gap-6 w-full max-w-md mt-8">
          <h2 className="text-2xl font-bold text-slate-700 text-center">
            Extracted Items
          </h2>
          {expenses.map((item, index) => (
            <div
              key={index}
              className="text-xl p-4 border border-indigo-200 rounded-lg bg-indigo-50/50"
            >
              <p>
                <span className="font-semibold text-slate-600">Amount:</span>{" "}
                {item.amount}
              </p>
              <p>
                <span className="font-semibold text-slate-600">Category:</span>{" "}
                {item.category}
              </p>
              <p>
                <span className="font-semibold text-slate-600">Note:</span>{" "}
                {item.description}
              </p>
            </div>
          ))}
          <button
            className="px-6 py-3 bg-indigo-500 rounded-lg text-white font-bold text-lg self-center"
            onClick={handleSaveExpenses}
          >
            Save Expenses
          </button>
        </div>
      )}
      {/* Status Banner */}
      {statusMessage && (
        <div className="w-full max-w-md p-4 mb-4 text-green-700 bg-green-100 border border-green-300 rounded-lg">
          <p className="font-bold">Success</p>
          <p>{statusMessage}</p>
        </div>
      )}

      {/* Error Banner */}
      {errorMessage && (
        <div className="w-full max-w-md p-4 mb-4 text-rose-700 bg-rose-100 border border-rose-300 rounded-lg">
          <p className="font-bold">Error</p>
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Thinking Animation */}
      {isExtracting && (
        <div className="flex items-center gap-1 text-indigo-500 text-xl font-medium">
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
