import { zql } from "@/zero/schema";
import { defineQueries, defineQuery } from "@rocicorp/zero";
import { z } from "zod";

export const queries = defineQueries({
  albums: {
    byArtist: defineQuery(z.object({ artistId: z.string() }), ({ args: { artistId } }) =>
      zql.albums
        .where("artistId", artistId)
        .orderBy("createdAt", "asc")
        .limit(10)
        .related("artist", (q) => q.one()),
    ),
  },
});
