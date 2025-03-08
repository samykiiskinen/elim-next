import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import { Card, Heading } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

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
      <Heading>{song.title}</Heading>
      <Card className="w-xl mt-2 prose">
        <ReactMarkdown>{song.text}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default SongDetailPage;
