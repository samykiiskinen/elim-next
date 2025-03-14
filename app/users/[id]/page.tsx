import { prisma } from "@/prisma/client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const UserDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!user) notFound();
  return (
    <>
      <div className="mt-5">
        <Link href="/users">
          <Button variant="surface">{`<<`}</Button>
        </Link>
      </div>
      <div>
        <p>{`Namn: ${user.firstName} ${user.lastName}`}</p>
        <p>{`Role: ${user.role}`}</p>
        <p>{`E-post: ${user.email}`}</p>
        <p>{`Roll: ${user.role}`}</p>
      </div>
    </>
  );
};

export default UserDetailPage;
