import { prisma } from "@/prisma/client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const AidProjectDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const aidProject = await prisma.aidProject.findUnique({
    where: { id: parseInt(id) },
  });

  if (!aidProject) notFound();
  return (
    <>
      <div className="mb-5">
        <Link href="/aid-projects">
          <Button variant="surface">{`<<`}</Button>
        </Link>
      </div>
      <div>
        <p>{`Datum: ${aidProject.date}`}</p>
        <p>{`Konto: ${aidProject.accountNumber}`}</p>
        <p>{`Kontonamn: ${aidProject.accountName}`}</p>
        <p>{`Land: ${aidProject.country}`}</p>
        <p>{`Mottagare: ${aidProject.receiver}`}</p>
        <p>{`Ändamål: ${aidProject.purpose}`}</p>
        <p>{`Beslut: ${aidProject.decision}`}</p>
        <p>{`Inbetalning: ${aidProject.income} kr`}</p>
        <p>{`Utbetalning: ${aidProject.expense} kr`}</p>
      </div>
    </>
  );
};

export default AidProjectDetailPage;
