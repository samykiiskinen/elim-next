import { Song } from "@prisma/client";
import { Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";

const SongDetails = ({ song }: { song: Song }) => {
  return (
    <div className="mt-6 space-y-4">
      <Flex className="gap-5">
        <Heading>{`${song.title.toUpperCase()}`}</Heading>
        <Heading>{`(${song.songKey})`}</Heading>
      </Flex>
      <div className="prose">
        <Text>{`${song.text}`}</Text>
      </div>
    </div>
  );
};

export default SongDetails;
