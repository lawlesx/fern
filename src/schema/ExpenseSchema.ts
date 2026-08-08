import categoriesData from "@/data/categories.json";
import { z } from "zod";

const CATEGORIES = categoriesData.categories as [string, ...string[]];

export const expenseSchema = z.object({
  amount: z.number().describe("The numeric cost"),
  category: z
    .enum(CATEGORIES)
    .describe("The best matching category from the allowed list."),
  description: z
    .string()
    .describe("Description of the item or service purchased"),
});

export const expenseListSchema = z.object({
  expenses: z.array(expenseSchema),
});
