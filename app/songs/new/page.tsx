"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface SongForm {
  title: string;
  text: string;
}

const NewSongPage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<SongForm>();

  return (
    <>
      <form
        className="max-w-md space-y-2"
        onSubmit={handleSubmit(async (data) => {
          await axios.post("/api/songs", data);
          router.push("/songs");
        })}
      >
        <TextField.Root
          placeholder="Titel"
          {...register("title")}
        ></TextField.Root>
        <Controller
          name="text"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Text" {...field} />}
        />
        <Button>LÄGG TILL</Button>
      </form>
    </>
  );
};

export default NewSongPage;
