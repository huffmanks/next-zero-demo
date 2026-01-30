import { queries } from "@/zero/queries";
import { schema } from "@/zero/schema";
import { mustGetQuery } from "@rocicorp/zero";
import { handleQueryRequest } from "@rocicorp/zero/server";

export async function POST(req: Request) {
  const result = await handleQueryRequest(
    (name, args) => {
      const query = mustGetQuery(queries, name);
      return query.fn({ args, ctx: { userId: "user_1" } });
    },
    schema,
    req,
  );

  return Response.json(result);
}
