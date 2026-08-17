"use server";

import { db } from "@/db";
import { expensesTable } from "@/db/schema";
import { Expense } from "@/interfaces";
import { auth } from "@/lib/auth";
import { and, desc, eq, sql, sum } from "drizzle-orm";
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

export async function getDashboardData(month?: string, year?: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Unauthorized");
  const userId = session.user.id;

  // If a month/year is passed, use it. Otherwise, default to "now"
  let dateFilter;
  if (month && year) {
    // Ensure month is two digits (e.g., '08')
    const formattedMonth = month.padStart(2, "0");
    const targetDate = `${year}-${formattedMonth}`;

    dateFilter = sql`strftime('%Y-%m', ${expensesTable.createdAt}) = ${targetDate}`;
  } else {
    dateFilter = sql`strftime('%Y-%m', ${expensesTable.createdAt}) = strftime('%Y-%m', 'now')`;
  }

  // Use dateFilter in your existing query
  const [totalResult] = await db
    .select({ total: sum(expensesTable.amount) })
    .from(expensesTable)
    .where(and(eq(expensesTable.userId, userId), dateFilter));

  const categoryResults = await db
    .select({
      category: expensesTable.category,
      total: sum(expensesTable.amount),
    })
    .from(expensesTable)
    .where(and(eq(expensesTable.userId, userId), dateFilter))
    .groupBy(expensesTable.category)
    .orderBy(desc(sum(expensesTable.amount)));

  return {
    totalMonthSpend: Number(totalResult?.total || 0),
    categorySpends: categoryResults.map((row) => ({
      name: row.category,
      amount: Number(row.total || 0),
    })),
  };
}
