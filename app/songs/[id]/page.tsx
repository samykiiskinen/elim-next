import React from "react";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";

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
      <div className="mt-6 space-y-4">
        <Flex className="gap-5">
          <Heading>{`${song.title.toUpperCase()}`}</Heading>
          <Heading>{`(${song.songKey})`}</Heading>
        </Flex>
        <Text>{`${song.text}`}</Text>
      </div>
    </>
  );
};

export default SongDetailPage;
