import { sql } from "drizzle-orm/sql/sql";
import { real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const expensesTable = sqliteTable("expenses", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  amount: real("amount").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});
