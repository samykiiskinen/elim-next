"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "PROGRAM", href: "/program" },
    { label: "OM OSS", href: "/about" },
    { label: "BISTÅND", href: "/aid-projects" },
    { label: "SÅNGER", href: "/songs" },
  ];

  return (
    <nav className="flex gap-4 mb-5 h-auto items-center m-2">
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
          <Link
            key={link.label}
            href={link.href}
            className={`${
              link.href === currentPath
                ? "bg-stone-700 border-2 rounded-lg p-2"
                : "border-2 rounded-lg p-2"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
