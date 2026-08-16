import { categoryIconMap } from "@/components/categoryIcons";
import { Expense, ExpenseWithId } from "@/interfaces";
import { expenseSchema } from "@/schema/ExpenseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LayoutGrid, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface ExpenseCardProps {
  expense: ExpenseWithId;
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseWithId[]>>;
}

const ExpenseCard = ({ expense, setExpenses }: ExpenseCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<Expense>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
    },
    reValidateMode: "onBlur",
  });

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    reset();
  };

  const onEditSubmit = (data: Expense) => {
    setExpenses((prev) =>
      prev.map((item) =>
        item.id === expense.id ? { ...item, ...data } : item,
      ),
    );
    handleCloseDialog();
  };

  const handleDelete = () => {
    setExpenses((prev) => prev.filter((item) => item.id !== expense.id));
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) handleCloseDialog();
      }}
    >
      <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-600 text-white text-xs font-semibold uppercase tracking-wider font-exo2">
            {categoryIconMap[expense.category] ?? <LayoutGrid size={14} />}
            {expense.category}
          </span>
          <span className="text-white text-xl font-bold font-exo2">
            ₹{expense.amount.toFixed(2)}
          </span>
        </div>
        <div className="flex items-end justify-between mt-3">
          <p className="text-slate-400 text-sm font-exo2 leading-snug max-w-[70%]">
            {expense.description}
          </p>
          <div className="flex items-center gap-6">
            <button
              aria-label="Delete expense"
              className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
              onClick={handleDelete}
            >
              <Trash2 size={16} />
            </button>
            <button
              aria-label="Edit expense"
              className="text-slate-500 hover:text-white transition-colors cursor-pointer"
              onClick={() => setIsDialogOpen(true)}
            >
              <Pencil size={16} />
            </button>
          </div>
        </div>
      </div>

      <DialogContent
        className="bg-white/5 backdrop-blur-md rounded-2xl p-4"
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-bold font-audiowide text-white">
            Edit Expense
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onEditSubmit)}>
          <div className="flex flex-col gap-4">
            <Input placeholder="Description" {...register("description")} />
            <Input
              type="number"
              placeholder="Amount"
              step="0.01"
              {...register("amount", { valueAsNumber: true })}
            />
            {/* <select
              className="bg-black/30 rounded-2xl p-4 w-full font-audiowide text-white"
              {...register("category")}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-black text-white">
                  {cat}
                </option>
              ))}
            </select> */}
          </div>
          <div className="flex items-center justify-end gap-2 mt-4">
            <button
              className="button rounded-2xl p-4 w-1/2"
              type="button"
              onClick={handleCloseDialog}
            >
              Cancel
            </button>
            <button
              className="button rounded-2xl p-4 w-1/2 bg-green-300 disabled:opacity-50"
              type="submit"
              disabled={!isValid}
            >
              Save changes
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseCard;
