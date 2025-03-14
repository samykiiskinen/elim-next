import { AidProject } from "@prisma/client";
import AidProjectForm from "../_components/AidProjectForm";

const NewAidProjectPage = ({
  aidProject,
}: {
  aidProject?: AidProject | null;
}) => {
  return <AidProjectForm aidProject={aidProject} />;
};

export default NewAidProjectPage;
