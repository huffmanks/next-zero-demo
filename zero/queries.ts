import { zql } from "@/zero/schema";
import { defineQueries, defineQuery } from "@rocicorp/zero";
import { z } from "zod";

export const queries = defineQueries({
  albums: {
    byArtist: defineQuery(z.object({ artistID: z.string() }), ({ args: { artistID } }) =>
      zql.albums
        .where("artistId", artistID)
        .orderBy("createdAt", "asc")
        .limit(10)
        .related("artist", (q) => q.one()),
    ),
  },
});
