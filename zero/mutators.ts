import { defineMutator, defineMutators } from "@rocicorp/zero";
import { z } from "zod";

export const mutators = defineMutators({
  albums: {
    create: defineMutator(
      z.object({
        id: z.string(),
        artistId: z.string(),
        title: z.string(),
        coverArtUrl: z.string(),
        releaseYear: z.number(),
        createdAt: z.number(),
      }),
      async ({ args, tx }) => {
        await tx.mutate.albums.insert({
          id: args.id,
          artistId: args.artistId,
          title: args.title,
          coverArtUrl: args.coverArtUrl,
          releaseYear: args.releaseYear,
          createdAt: args.createdAt,
        });
      },
    ),
  },
});
