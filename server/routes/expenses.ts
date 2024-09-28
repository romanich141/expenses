import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const expenseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string().min(3).max(100),
    amount: z.number().int().positive()
})

const createExpenseSchema = expenseSchema.omit({id: true});

type TExpense = z.infer<typeof expenseSchema>

const fakeExpenses: TExpense[] = [
    {
        id: 1,
        title: "expense 1",
        amount: 1234
    }, {
        id: 2,
        title: "expense 2",
        amount: 1234
    }, {
        id: 3,
        title: "expense 3",
        amount: 1234
    }
];

export const expensesRoute = new Hono()
    .get('/', (context) => {
        return context.json({ expenses: fakeExpenses })
    })
    .get('/total', (context) => {
        const totalExpenses = fakeExpenses.reduce((total, expense) => total + expense.amount, 0)
        return context.json({totalExpenses})
    })
.get('/:id{[0-9]+}', (context) => {
    const id = Number.parseInt(context.req.param().id);
    const expense = fakeExpenses.find((expense) => expense.id === id)
    
    if (!expense) {
        return context.notFound()
    }

    return context.json({expense})
})
.post('/', zValidator('json', createExpenseSchema), async (context) => {
    const expense = await context.req.valid('json');
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1})
    context.status(201);
    return context.json({fakeExpenses});
})
.delete('/:id{[0-9]+}', (context) => {
    const id = Number.parseInt(context.req.param().id);
    const deleteIndex = fakeExpenses.findIndex((expense) => expense.id === id)
    
    if (deleteIndex === -1) {
        return context.notFound()
    }

    const deletedExpense = fakeExpenses.splice(deleteIndex, 1)[0]
    return context.json({expense: deletedExpense})
})
