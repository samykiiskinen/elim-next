"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Box, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  const links = [
    { label: "PROGRAM", href: "/program" },
    { label: "OM OSS", href: "/about" },
    { label: "BISTÅND", href: "/aid-projects" },
    { label: "SÅNGER", href: "/songs" },
  ];

  return (
    <nav className="mb-5 m-2 p-2 py-2">
      <Container>
        <Flex justify="between" align="center">
          <Flex align="center" gap="3">
            <Link href="/">
              <Image
                width="100"
                height="100"
                src="/Logo2.bmp"
                alt="Elim logotype"
                className="rounded-full"
                priority
              ></Image>
            </Link>
            <ul className="flex gap-4 text-md font-bold">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${
                      link.href === currentPath
                        ? "bg-stone-700 border-2 rounded-lg p-2"
                        : "border-2 rounded-lg p-2"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box className="border-2 rounded-lg p-2 text-md text-gray-500 font-bold flex items-center">
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Text>{session.user!.name}</Text>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session.user!.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">LOGGA UT</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">LOGGA IN</Link>
            )}
          </Box>
          {/* <Box className="border-2 rounded-lg p-2 text-md text-gray-500 font-bold flex items-center">
            {status === "authenticated" && (
              <Link href="/api/auth/signout">LOGGA UT</Link>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">LOGGA IN</Link>
            )}
          </Box> */}
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
