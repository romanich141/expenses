import { type Config } from "drizzle-kit";

export default {
  schema: "./server/db/schema/*",
  out: "./drizzle",
  dialect: "postgresql", // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
