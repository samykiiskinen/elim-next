"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import Link from "next/link";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSongSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type SongForm = z.infer<typeof createSongSchema>;

const NewSongPage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SongForm>({
    resolver: zodResolver(createSongSchema),
  });
  const [error, setError] = useState("");
  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post("/api/songs", data);
      router.push("/songs");
    } catch {
      setError("Unexpected error occurred");
    }
  });

  return (
    <div className="max-w-md">
      {error && (
        <Callout.Root className="mb-2 font-bold" color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-2" onSubmit={onSubmit}>
        <div>
          <Button>
            <Link href="/songs">{`<<`}</Link>
          </Button>
        </div>
        <TextField.Root
          placeholder="Titel"
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Text" {...field}></SimpleMDE>
          )}
        ></Controller>
        <ErrorMessage>{errors.text?.message}</ErrorMessage>
        <Button>LÄGG TILL</Button>
      </form>
    </div>
  );
};

export default NewSongPage;
