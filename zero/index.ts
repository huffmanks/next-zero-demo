import { mutators } from "@/zero/mutators";
import { schema } from "@/zero/schema";
import { Zero, ZeroOptions } from "@rocicorp/zero";

export const zeroOptions: ZeroOptions = {
  userID: process.env.NEXT_PUBLIC_USER_ID ?? "anon",
  cacheURL: process.env.NEXT_PUBLIC_ZERO_SERVER,
  schema,
  mutators,
  kvStore: "idb",
  storageKey: process.env.NODE_ENV === "production" ? "prod-app" : "dev-app",
};

let zero: Zero | null = null;

if (typeof window !== "undefined") {
  zero = new Zero(zeroOptions);
}

export { zero };
