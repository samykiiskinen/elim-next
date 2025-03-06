import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const SongsPage = () => {
  return (
    <>
      <div className="mb-2">
        <Button>
          <Link href="/songs/new">NY SÅNG</Link>
        </Button>
      </div>
      <h1>SÅNGER</h1>
    </>
  );
};

export default SongsPage;
