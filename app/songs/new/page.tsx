"use client";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSongSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import dynamic from "next/dynamic";

type SongForm = z.infer<typeof createSongSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

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
    } catch (error) {
      setError("Nu blev det något fel");
    }
  });

  return (
    <div className="max-w-md">
      {error && (
        <Callout.Root color="red" className="mb-2 text-2xl">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="space-y-2" onSubmit={onSubmit}>
        <TextField.Root
          placeholder="Titel"
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="text"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Text" {...field} />}
        />
        <ErrorMessage>{errors.text?.message}</ErrorMessage>
        <div className="mt-2">
          <Button>LÄGG TILL</Button>
        </div>
      </form>
    </div>
  );
};

export default NewSongPage;
