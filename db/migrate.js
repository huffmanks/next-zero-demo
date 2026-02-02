import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";

async function main() {
  const connectionString = process.env.ZERO_UPSTREAM_DB;

  if (!connectionString) {
    console.error("env.ZERO_UPSTREAM_DB is not set");
    process.exit(1);
  }

  const pool = new Pool({
    connectionString,
    max: 1,
  });

  const db = drizzle(pool);

  console.log("Running migrations...");

  try {
    await migrate(db, { migrationsFolder: "./db/migrations" });
    console.log("Migrations completed!");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
