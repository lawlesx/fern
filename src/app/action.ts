"use server";

import { db } from "@/db";
import { expensesTable } from "@/db/schema";
import { Expense } from "@/interfaces";
import { revalidatePath } from "next/cache";

export async function saveExpensesAction(expenses: Expense[]) {
  // Perform a batch insert into Turso using Drizzle
  await db.insert(expensesTable).values(expenses);

  // Tell Next.js to refresh any pages showing the expenses
  revalidatePath("/");

  return { success: true };
}
