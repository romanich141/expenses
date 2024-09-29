import { ApiRoutes } from "@server/app";
import { queryOptions } from "@tanstack/react-query";
import { hc } from "hono/client";
import { getUserProfile } from "./getUserProfile";

const client = hc<ApiRoutes>("/");

export const api = client.api;

export const userQueryOptions = queryOptions({
  queryKey: ["get-user-profile"],
  queryFn: getUserProfile,
  staleTime: Infinity,
});

export { getExpenses } from "./getExpenses";
export { getTotalSpent } from "./getTotalSpent";
export { createExpense } from "./createExpense";
export { getUserProfile } from "./getUserProfile";
