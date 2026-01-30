import { mutators } from "@/zero/mutators";
import { useZero } from "@rocicorp/zero/react";
import { nanoid } from "nanoid";

export function InvokeButton() {
  const zero = useZero();

  const onClick = async () => {
    const result = zero.mutate(
      mutators.albums.create({
        id: nanoid(),
        artistID: "artist_1",
        title: "Please Please Me",
        year: 1963,
        createdAt: Date.now(),
      }),
    );

    const clientResult = await result.client;

    if (clientResult.type === "error") {
      console.error("Failed to create album", clientResult.error.message);
    } else {
      console.log("Album created!");
    }
  };

  return <button onClick={onClick}>Create Album</button>;
}
