import { Button, Heading } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const SongsPage = () => {
  return (
    <>
      <div className="mb-5">
        <Heading>SÅNGER</Heading>
      </div>
      <Button>
        <Link href="/songs/new">NY SÅNG</Link>
      </Button>
    </>
  );
};

export default SongsPage;
