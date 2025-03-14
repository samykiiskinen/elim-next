import { Button, Container, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { prisma } from "@/prisma/client";
import { RiAddFill, RiPagesLine } from "react-icons/ri";
import DeleteSongButton from "./[id]/DeleteSongButton";
import EditSongButton from "./[id]/EditSongButton";

const SongsPage = async () => {
  const songs = await prisma.song.findMany();

  return (
    <Container>
      <div className="mb-5">
        <Heading>SÅNGER</Heading>
      </div>
      <Button>
        <Link href="/songs/new">NY SÅNG</Link>
      </Button>
      <div className="max-w-2xl mt-4">
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row className="text-lg">
              <Table.ColumnHeaderCell className="w-12/16">
                SÅNGTITEL
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="w-4/16 text-center">
                TONART
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="w-1/16"></Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="w-1/16"></Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="w-1/16"></Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="w-1/16"></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {songs.map((song) => (
              <Table.Row key={song.id}>
                <Table.Cell>
                  <div className="flex items-center h-full text-md">
                    {song.title.toLocaleUpperCase()}
                  </div>
                </Table.Cell>
                <Table.Cell className="text-center">
                  <div className="flex items-center justify-center h-full text-md">
                    {song.songKey.toLocaleUpperCase()}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Button color="jade" variant="soft">
                    <RiAddFill size={20} />
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Link href={`/songs/${song.id}`}>
                    <Button color="gray" variant="surface">
                      <RiPagesLine size={20} />
                    </Button>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <EditSongButton songId={song.id}></EditSongButton>
                </Table.Cell>
                <Table.Cell>
                  <DeleteSongButton id={song.id}></DeleteSongButton>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </Container>
  );
};

export default SongsPage;
