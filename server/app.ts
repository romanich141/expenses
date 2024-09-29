import { Hono } from "hono";
import { expensesRoute, authRoute } from "./routes";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
const app = new Hono();

app.use(logger());

const apiRoutes = app
  .basePath("/api")
  .route("/expenses", expensesRoute)
  .route("/", authRoute);

app.use("*", serveStatic({ root: "./client/dist" }));
app.use("*", serveStatic({ path: "./client/dist/index.html" }));

export default app;
export type ApiRoutes = typeof apiRoutes;
