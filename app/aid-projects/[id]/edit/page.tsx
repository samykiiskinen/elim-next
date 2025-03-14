import { prisma } from "@/prisma/client";
import AidProjectForm from "../../_components/AidProjectForm";
import { notFound } from "next/navigation";

const EditAidProjectPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const aidProject = await prisma.aidProject.findUnique({
    where: { id: parseInt(id) },
  });
  if (!aidProject) notFound();
  return <AidProjectForm aidProject={aidProject} />;
};

export default EditAidProjectPage;
