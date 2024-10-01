import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { db } from "../db";
import {
  expenses as expensesTable,
  insertExpensesSchema,
} from "../db/schema/expenses";
import { getUser } from "../kinde";
import { desc, eq, sum, and } from "drizzle-orm";
import { createExpenseSchema } from "../sharedTypes";

export const expensesRoute = new Hono()
  .get("/", getUser, async (context) => {
    const userProfile = context.var.userProfile;

    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, userProfile.id))
      .orderBy(desc(expensesTable.createdAt));

    return context.json({ expenses });
  })
  .get("/total", getUser, async (context) => {
    const userProfile = context.var.userProfile;
    const { total } = await db
      .select({ total: sum(expensesTable.amount) })
      .from(expensesTable)
      .where(eq(expensesTable.userId, userProfile.id))
      .limit(1)
      .then((result) => result[0]);

    return context.json({ totalExpenses: total ?? 0 });
  })
  .get("/:id{[0-9]+}", getUser, async (context) => {
    const userProfile = context.var.userProfile;

    const id = Number.parseInt(context.req.param().id);

    const expense = await db
      .select()
      .from(expensesTable)
      .where(
        and(eq(expensesTable.userId, userProfile.id), eq(expensesTable.id, id))
      )
      .orderBy(desc(expensesTable.createdAt))
      .then((result) => result[0]);

    if (!expense) {
      return context.notFound();
    }

    return context.json({ expense });
  })
  .post(
    "/",
    getUser,
    zValidator("json", createExpenseSchema),
    async (context) => {
      const expense = await context.req.valid("json");
      const userProfile = context.var.userProfile;
      const validateExpense = insertExpensesSchema.parse({
        ...expense,
        userId: userProfile.id,
      });
      const result = await db
        .insert(expensesTable)
        .values(validateExpense)
        .returning();

      context.status(201);
      return context.json({ result });
    }
  )
  .delete("/:id{[0-9]+}", getUser, async (context) => {
    const id = Number.parseInt(context.req.param().id);
    const userProfile = context.var.userProfile;

    const expense = await db
      .delete(expensesTable)
      .where(
        and(eq(expensesTable.userId, userProfile.id), eq(expensesTable.id, id))
      )
      .returning()
      .then((result) => result[0]);

    if (!expense) {
      return context.notFound();
    }

    return context.json({ expense });
  });
