import React from "react";
import { Button, Table } from "@radix-ui/themes";
import { prisma } from "@/prisma/client";
import Link from "next/link";

const SongsPage = async () => {
  const songs = await prisma.song.findMany();
  return (
    <>
      <div className="mb-4">
        <Button>
          <Link href="/songs/new">NY SÅNG</Link>
        </Button>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>TITEL</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>TEXT</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {songs.map((song) => (
            <Table.Row key={song.id}>
              <Table.Cell>
                <Link href={`/songs/${song.id}`}>{song.title}</Link>
              </Table.Cell>
              <Table.Cell>{song.text}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default SongsPage;
