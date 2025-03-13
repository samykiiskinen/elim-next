import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import SongDetails from "./SongDetails";

const SongDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const song = await prisma.song.findUnique({
    where: { id: parseInt(id) },
  });

  if (!song) notFound();

  return (
    <>
      <Button>
        <Link href="/songs">{`<<`}</Link>
      </Button>
      <SongDetails song={song}></SongDetails>
    </>
  );
};

export default SongDetailPage;
