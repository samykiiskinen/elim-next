"use client";
import { Button, TextField } from "@radix-ui/themes";
import Link from "next/link";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface SongForm {
  title: string;
  text: string;
}

const NewSongPage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<SongForm>();

  return (
    <div className="max-w-md">
      <form
        className="space-y-2"
        onSubmit={handleSubmit(async (data) => {
          await axios.post("/api/songs", data);
          router.push("/songs");
        })}
      >
        <div>
          <Button>
            <Link href="/songs">{`<<`}</Link>
          </Button>
        </div>
        <TextField.Root
          placeholder="Titel"
          {...register("title")}
        ></TextField.Root>
        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Text" {...field}></SimpleMDE>
          )}
        ></Controller>
        <Button>LÄGG TILL</Button>
      </form>
    </div>
  );
};

export default NewSongPage;
