"use client";

import { InvokeButton } from "@/components/invoke-button";
import { queries } from "@/zero/queries";
import { useQuery } from "@rocicorp/zero/react";

export default function Home() {
  const [albums] = useQuery(queries.albums.byArtist({ artistId: "artist_1" }));

  console.log("Live albums sync:", albums);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <InvokeButton />
        <div>
          {albums.map((album) => (
            <div key={album.id}>{album.title}</div>
          ))}
        </div>
      </main>
    </div>
  );
}
