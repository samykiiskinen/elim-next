"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";

const DeleteUserButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const [error, setError] = useState(false);

  const deleteUser = async () => {
    try {
      await axios.delete("/api/users/" + id);
      router.push("/users");
      router.refresh();
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div>
      <>
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button color="tomato" variant="soft">
              <RiDeleteBin2Line size={20} />
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Title>
              BEKRÄFTA BORTTAGNING AV ANVÄNDARE
            </AlertDialog.Title>
            <AlertDialog.Description>
              Är du säker på att användaren ska tas bort? Det går inte att ångra
              i efterhand.
            </AlertDialog.Description>
            <Flex mt="4" gap="3">
              <AlertDialog.Cancel>
                <Button color="jade">NEJ, TA INTE BORT ANVÄNDAREN</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button color="red" onClick={deleteUser}>
                  JA, TA BORT ANVÄNDAREN
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
        <AlertDialog.Root open={error}>
          <AlertDialog.Content>
            <AlertDialog.Title>ERROR</AlertDialog.Title>
            <AlertDialog.Description>
              Användaren kunde inte tas bort
              {id}
            </AlertDialog.Description>
            <Button
              color="gray"
              variant="soft"
              mt="2"
              onClick={() => setError(false)}
            >
              OK
            </Button>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </>
    </div>
  );
};

export default DeleteUserButton;
