"use client";

import { InvokeButton } from "@/components/invoke-button";
import { authClient } from "@/lib/auth-client";
import { queries } from "@/zero/queries";
import { useQuery } from "@rocicorp/zero/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [albums] = useQuery(queries.albums.byArtist({ artistId: "artist_1" }));
  const router = useRouter();
  console.log("Live albums sync:", albums);

  async function handleSignUp() {
    await authClient.signUp.email(
      {
        email: "tim@email.com",
        password: "password",
        name: "Tim",
        callbackURL: "/dashboard",
      },
      {
        onSuccess: async (ctx) => {
          const { error } = await authClient.signIn.email({
            email: ctx.data.user.email,
            password: "password",
          });

          if (!error) {
            router.push("/dashboard");
          }
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      },
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-16 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div>
          <button onClick={handleSignUp}>Sign up</button>
        </div>
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
