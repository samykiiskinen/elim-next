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
      <nav className="flex space-x-4 border-b mb-5 px-5 h-auto items-center ">
        <Link href="/">
          <div className="w-full max-w-24 min-w-24 mx-auto m-1">
            <Image
              className="rounded-full w-full h-auto p-1 hover:ease-in-out"
              src="/Logo4.bmp"
              alt="Elim logo"
              width={60}
              height={60}
              priority
            ></Image>
          </div>
        </Link>
        <ul className="flex space-x-4 text-2xl font-bold">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                link.href === currentPath
                  ? "bg-slate-300 text-black border-slate-100 border-2 rounded-lg p-3"
                  : "border-2 rounded-lg p-3"
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
