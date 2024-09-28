import app from "./app";

Bun.serve({
  port: 3000,
  fetch: app.fetch,
});

console.log('Server was starting')