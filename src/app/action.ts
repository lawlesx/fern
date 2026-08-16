"use server";

import { db } from "@/db";
import { expensesTable } from "@/db/schema";
import { Expense } from "@/interfaces";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function saveExpensesAction(expenses: Expense[]) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
      return {
        success: false,
        error: "Unauthorized. Please log in to save expenses.",
      };
    }

    const expensesWithUser = expenses.map((expense) => ({
      ...expense,
      userId: session.user.id,
    }));

    // Perform a batch insert into Turso using Drizzle
    await db.insert(expensesTable).values(expensesWithUser);

    // Tell Next.js to refresh any pages showing the expenses
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Error saving expenses:", error);
    return {
      success: false,
      error: "An error occurred while saving expenses.",
    };
  }
}
