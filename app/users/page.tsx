import { prisma } from "@/prisma/client";
import { Button, Container, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import { RiAddFill, RiPagesLine } from "react-icons/ri";
import DeleteUserButton from "./_components/DeleteUserButton";

const UsersPage = async () => {
  const users = await prisma.user.findMany();
  return (
    <Container>
      <div>
        <div className="flex items-center mb-5 space-x-5">
          <div>
            <Heading>ANVÄNDARE</Heading>
          </div>
          <div>
            <Link href="users/new">
              <Button color="jade" variant="soft">
                <RiAddFill size={15} />
              </Button>
            </Link>
          </div>
        </div>
        <div className="max-w-xl">
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell className="w-5/16">
                  ANVÄNDARE
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="w-6/16">
                  E-POST
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="w-3/16">
                  ROLL
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="w-1/16"></Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="w-1/16"></Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {users.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell>
                    <div className="flex items-center h-full text-md">{`${user.name}`}</div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center h-full text-md">
                      {user.email}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center h-full text-md">
                      {user.role}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <Link href={`/users/${user.id}`}>
                      <Button color="gray" variant="surface">
                        <RiPagesLine size={20} />
                      </Button>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <DeleteUserButton id={user.id}></DeleteUserButton>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
      </div>
    </Container>
  );
};

export default UsersPage;
