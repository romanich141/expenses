import { Hono } from 'hono'
import { expensesRoute } from './routes/expenses'
import { serveStatic } from 'hono/bun';
const app = new Hono()

const apiRoutes = app.basePath('/api').route('/expenses', expensesRoute);
app.use('*', serveStatic({root: './client/dist'}));
app.use('*', serveStatic({path: './client/dist/index.html'}));
export default app;
export type ApiRoutes = typeof apiRoutes;