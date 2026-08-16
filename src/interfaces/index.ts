import { expenseSchema } from "@/schema/ExpenseSchema";
import { z } from "zod";

export type Expense = z.infer<typeof expenseSchema>;

export type ExpenseWithId = Expense & { id: string };
