import { ApiRoutes } from '@server/app';
import { hc } from 'hono/client';

const client = hc<ApiRoutes>("/");

export const api = client.api;

export { getExpenses } from './getExpenses';
export { getTotalSpent } from './getTotalSpent';