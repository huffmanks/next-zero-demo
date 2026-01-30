import { mutators } from "@/zero/mutators";
import { schema } from "@/zero/schema";
import { Zero, ZeroOptions } from "@rocicorp/zero";

export const zeroOptions: ZeroOptions = {
  userID: "user_1",
  cacheURL: "http://localhost:4848",
  schema,
  mutators,
};

const zero = new Zero(zeroOptions);

console.log("clientID", zero.clientID);

export { zero };
