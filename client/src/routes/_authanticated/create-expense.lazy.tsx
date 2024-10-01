import { createLazyFileRoute } from "@tanstack/react-router";
import { CreateExpenseForm } from "@/components";

export const Route = createLazyFileRoute("/_authanticated/create-expense")({
  component: CreateExpenseForm,
});
