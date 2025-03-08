import React from "react";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const SongDetailPage = async ({ params }: Props) => {
  const song = await prisma.song.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!song) notFound();

  return (
    <div>
      <p>{song.title}</p>
      <p>{song.text}</p>
    </div>
  );
};

export default SongDetailPage;
