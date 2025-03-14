"use client";
import { Button, Callout, Container, TextField } from "@radix-ui/themes";
import Link from "next/link";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { songSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import { Song } from "@prisma/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type SongFormData = z.infer<typeof songSchema>;

const SongForm = ({ song }: { song?: Song }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SongFormData>({
    resolver: zodResolver(songSchema),
  });
  const [error, setError] = useState("");
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (song) await axios.patch("/api/songs/" + song.id, data);
      else await axios.post("/api/songs", data);
      router.push("/songs");
      router.refresh();
    } catch {
      setError("Unexpected error occurred");
    }
  });

  return (
    <Container>
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
            defaultValue={song?.title}
            placeholder="Titel"
            {...register("title")}
          ></TextField.Root>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <TextField.Root
            defaultValue={song?.songKey}
            placeholder="Tonart"
            {...register("songKey")}
          ></TextField.Root>
          <ErrorMessage>{errors.songKey?.message}</ErrorMessage>
          <Controller
            defaultValue={song?.text}
            name="text"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Text" {...field}></SimpleMDE>
            )}
          ></Controller>
          <ErrorMessage>{errors.text?.message}</ErrorMessage>
          <Button>{song ? "SPARA" : "LÄGG TILL"}</Button>
        </form>
      </div>
    </Container>
  );
};

export default SongForm;
