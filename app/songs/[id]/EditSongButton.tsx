import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { GoPencil } from "react-icons/go";

const EditSongButton = ({ songId }: { songId: number }) => {
  return (
    <Link href={`/songs/${songId}/edit`}>
      <Button color="gray" variant="surface">
        <GoPencil size={20} />
      </Button>
    </Link>
  );
};

export default EditSongButton;
