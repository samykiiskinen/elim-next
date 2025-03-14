import { Button, Container, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import { RiAddFill, RiPagesLine } from "react-icons/ri";
import DeleteProjectButton from "./DeleteAidProjectButton";
import EditProjectButton from "./EditAidProjectButton";
import { prisma } from "@/prisma/client";

const AidProjectsPage = async () => {
  const aidProjects = await prisma.aidProject.findMany();
  return (
    <>
      <Container>
        <div>
          <div className="flex items-center mb-5 space-x-5">
            <div>
              <Heading>BISTÅNDSPROJEKT</Heading>
            </div>
            <div>
              <Link href="aid-projects/new">
                <Button color="jade" variant="soft">
                  <RiAddFill size={20} />
                </Button>
              </Link>
            </div>
          </div>
          <div className="max-w-4xl">
            <Flex>
              <Table.Root variant="surface">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>DATUM</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>MOTTAGARE</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="hidden md:table-cell">
                      ÄNDAMÅL
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>INBETALNING</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>UTBETALNING</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {aidProjects.map((aidProject) => (
                    <Table.Row key={aidProject.id}>
                      <Table.Cell>
                        <div className="flex items-center h-full">
                          {aidProject.id}
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center h-full">
                          {aidProject.date}
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center h-full">
                          {aidProject.receiver}
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center h-full">
                          {aidProject.purpose}
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center justify-end h-full">
                          {aidProject.income}
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center justify-end h-full">
                          {aidProject.expense}
                        </div>
                      </Table.Cell>
                      <Table.Cell>
                        <Link href={`/aid-projects/${aidProject.id}`}>
                          <Button color="gray" variant="surface">
                            <RiPagesLine size={20} />
                          </Button>
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <EditProjectButton aidProjectId={aidProject.id} />
                      </Table.Cell>
                      <Table.Cell>
                        <DeleteProjectButton
                          id={aidProject.id}
                        ></DeleteProjectButton>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Flex>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AidProjectsPage;
