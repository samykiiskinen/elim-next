"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "PROGRAM", href: "/program" },
    { label: "OM OSS", href: "/about" },
    { label: "BISTÅND", href: "/aid" },
    { label: "SÅNGER", href: "/songs" },
  ];
  return (
    <>
      <nav className="flex space-x-4 px-2 py-2 h-auto items-center ">
        <Link href="/">
          <div className="w-full max-w-24 min-w-16 mx-auto mt-1">
            <Image
              className="rounded-full w-full h-auto hover:ease-in-out"
              src="/Logo1.bmp"
              alt="Elim logo"
              width={60}
              height={60}
              priority
            ></Image>
          </div>
        </Link>
        <ul className="flex space-x-4 text-lg font-bold">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                link.href === currentPath
                  ? "text-black border-2 rounded-lg p-2 bg-zinc-200"
                  : "border-2 rounded-lg p-2"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
