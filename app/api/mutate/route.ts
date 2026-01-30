import { dbProvider } from "@/db";
import { mutators } from "@/zero/mutators";
import { mustGetMutator } from "@rocicorp/zero";
import { handleMutateRequest } from "@rocicorp/zero/server";

export async function POST(req: Request) {
  const result = await handleMutateRequest(
    dbProvider,
    (transact) =>
      transact((tx, name, args) => {
        const mutator = mustGetMutator(mutators, name);
        return mutator.fn({ args, tx, ctx: { userId: "user_1" } });
      }),
    req,
  );

  return Response.json(result);
}
