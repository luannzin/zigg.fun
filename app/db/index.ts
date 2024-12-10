import { drizzle } from "drizzle-orm/neon-http";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
export const db = drizzle(process.env.DATABASE_URL!);
