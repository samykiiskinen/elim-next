"use client";
import { useRouter } from "next/navigation";
import { aidProjectSchema } from "../../validationSchemas";
import { z } from "zod";
import {
  Button,
  Callout,
  Container,
  Spinner,
  TextField,
} from "@radix-ui/themes";
import ErrorMessage from "@/app/components/ErrorMessage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import { Label } from "@radix-ui/themes/components/context-menu";
import Link from "next/link";
import { AidProject } from "@prisma/client";

type aidProjectFormData = z.infer<typeof aidProjectSchema>;

const AidProjectForm = ({ aidProject }: { aidProject?: AidProject | null }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<aidProjectFormData>({
    resolver: zodResolver(aidProjectSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      const convertedData = {
        date: data.date,
        accountNumber: Number(data.accountNumber),
        accountName: data.accountName,
        country: data.country,
        receiver: data.receiver,
        purpose: data.purpose,
        decision: data.decision,
        income: Number(data.income),
        expense: Number(data.expense),
      };
      if (aidProject)
        await axios.patch("/api/aid-projects/" + aidProject.id, convertedData);
      else await axios.post("/api/aid-projects", convertedData);
      router.push("/aid-projects");
    } catch (error) {
      setSubmitting(false);
      setError("Something went wrong");
    }
  });

  type ProjectField =
    | "date"
    | "accountNumber"
    | "accountName"
    | "country"
    | "receiver"
    | "purpose"
    | "decision"
    | "income"
    | "expense";

  interface FieldDefinition {
    label: string;
    field: ProjectField;
  }

  const tableFields: FieldDefinition[] = [
    { label: "Datum", field: "date" },
    { label: "Kontonummer", field: "accountNumber" },
    { label: "Kontonamn", field: "accountName" },
    { label: "Land", field: "country" },
    { label: "Mottagare", field: "receiver" },
    { label: "Ändamål", field: "purpose" },
    { label: "Beslut", field: "decision" },
    { label: "Inbetalning", field: "income" },
    { label: "Utbetalning", field: "expense" },
  ];

  return (
    <Container>
      <div className="max-w-md">
        {error && (
          <Callout.Root className="mb-2 font-bold" color="red">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <div className="mb-4">
          <Button variant="surface">
            <Link href="/aid-projects">{`<<`}</Link>
          </Button>
        </div>
        <form onSubmit={onSubmit}>
          {tableFields.map(({ label, field }) => (
            <div key={field} className="mb-1">
              <Label>{label}</Label>
              <TextField.Root
                {...(register(field),
                {
                  onChange: (e) => {
                    const { value } = e.target;
                    if (
                      field === "accountNumber" ||
                      field === "income" ||
                      field === "expense"
                    ) {
                      setValue(field, value === "" ? 0 : Number(value));
                    } else {
                      setValue(field, value);
                    }
                  },
                })}
                defaultValue={aidProject ? aidProject[field] ?? undefined : ""}
              ></TextField.Root>
            </div>
          ))}
          <ErrorMessage>{`Datum: ${errors.date?.message}`}</ErrorMessage>
          <ErrorMessage>{`Kontonummer: ${errors.accountNumber?.message}`}</ErrorMessage>
          <ErrorMessage>{`Kontonamn: ${errors.accountName?.message}`}</ErrorMessage>
          <ErrorMessage>{`Land: ${errors.country?.message}`}</ErrorMessage>
          <ErrorMessage>{`Mottagare: ${errors.receiver?.message}`}</ErrorMessage>
          <ErrorMessage>{`Ändamål: ${errors.purpose?.message}`}</ErrorMessage>
          <ErrorMessage>{`Beslut: ${errors.decision?.message}`}</ErrorMessage>
          <ErrorMessage>{`Inbetalning: ${errors.income?.message}`}</ErrorMessage>
          <ErrorMessage>{`Utbetalning: ${errors.expense?.message}`}</ErrorMessage>
          <div className="mt-4 space-x-2">
            <Button variant="surface" disabled={isSubmitting}>
              {aidProject ? "SPARA" : "LÄGG TILL"}
            </Button>
            <div>{isSubmitting && <Spinner />}</div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default AidProjectForm;
