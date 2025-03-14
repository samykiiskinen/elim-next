import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { GoPencil } from "react-icons/go";

const EditAidProjectButton = ({ aidProjectId }: { aidProjectId: number }) => {
  return (
    <Link href={`/aid-projects/${aidProjectId}/edit`}>
      <Button color="gray" variant="surface">
        <GoPencil size={15} />
      </Button>
    </Link>
  );
};

export default EditAidProjectButton;
