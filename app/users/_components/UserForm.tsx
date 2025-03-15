"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { userSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import {
  Button,
  Callout,
  Card,
  DropdownMenu,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type UserFormData = z.infer<typeof userSchema>;

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: { message?: string };
  placeholder: string;
}

const UserForm = ({ user }: { user?: User }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [role, setRole] = useState<string | undefined>(user?.role);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (user) await axios.patch("/api/users/" + user.id, data);
      else await axios.post("/api/users", data);
      router.push("/users");
    } catch (error) {
      setSubmitting(false);
      setError("SOMETHING WENT WRONG");
    }
  });

  return (
    <>
      <div className="mb-2">
        <Button variant="surface">
          <Link href="/users">{`<<`}</Link>
        </Button>
      </div>
      <div className="max-w-sm">
        {error && (
          <Callout.Root className="mb-2 font-bold" color="red">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <Card>
          <form onSubmit={onSubmit} className="space-y-2">
            <TextField.Root
              defaultValue={user?.email}
              placeholder="E-post"
              {...register("email")}
            ></TextField.Root>
            <TextField.Root
              defaultValue={user?.name}
              placeholder="Namn"
              {...register("name")}
            ></TextField.Root>
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
            <TextField.Root
              defaultValue={user?.hashedPassword}
              placeholder="Lösenord"
              {...register("password")}
            ></TextField.Root>
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="surface">{role || "Roll"}</Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="mt-2 bg-white rounded-md shadow-md">
                <DropdownMenu.Item
                  onClick={() => {
                    setRole("ADMIN");
                    setValue("role", "ADMIN");
                  }}
                >
                  ADMIN
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onClick={() => {
                    setRole("FINANCE");
                    setValue("role", "FINANCE");
                  }}
                >
                  FINANCE
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onClick={() => {
                    setRole("LEADERSHIP");
                    setValue("role", "LEADERSHIP");
                  }}
                >
                  LEADERSHIP
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onClick={() => {
                    setRole("WORSHIP");
                    setValue("role", "WORSHIP");
                  }}
                >
                  WORSHIP
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onClick={() => {
                    setRole("SUPPORT");
                    setValue("role", "SUPPORT");
                  }}
                >
                  SUPPORT
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onClick={() => {
                    setRole("YOUTH");
                    setValue("role", "YOUTH");
                  }}
                >
                  YOUTH
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
            {errors.role && <ErrorMessage>{errors.role.message}</ErrorMessage>}

            <div className="space-x-2 mt-5">
              <Button variant="surface" disabled={isSubmitting}>
                LÄGG TILL {isSubmitting && <Spinner />}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  placeholder,
  error,
  ...props
}) => (
  <div>
    <input
      type={type}
      placeholder={placeholder}
      className="block w-full mt-1 mb-1 border rounded-md"
      {...props}
    />
    {error && <ErrorMessage>{error.message}</ErrorMessage>}
  </div>
);

export default UserForm;
