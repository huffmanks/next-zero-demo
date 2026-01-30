import * as drizzleSchema from "@/db/schema";
import { drizzleZeroConfig } from "drizzle-zero";

export default drizzleZeroConfig(drizzleSchema, {
  tables: {
    users: true,
    artists: true,
    albums: true,
    favorites: true,
  },
});
