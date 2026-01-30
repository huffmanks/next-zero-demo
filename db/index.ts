import * as drizzleSchema from "@/db/schema";
import { schema } from "@/zero/schema";
import { zeroDrizzle } from "@rocicorp/zero/server/adapters/drizzle";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.ZERO_UPSTREAM_DB!,
});
export const drizzleClient = drizzle(pool, {
  schema: drizzleSchema,
});
export const dbProvider = zeroDrizzle(schema, drizzleClient);

declare module "@rocicorp/zero" {
  interface DefaultTypes {
    dbProvider: typeof dbProvider;
  }
}
