import React from "react";
import SongForm from "../../_components/SongForm";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

const EditSongPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const song = await prisma.song.findUnique({
    where: { id: parseInt(id) },
  });

  if (!song) notFound();

  return <SongForm song={song}></SongForm>;
};

export default EditSongPage;
