"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="header w-full py-4 px-6 bg-[#030111] text-white flex justify-between items-center shadow-sm">
      <Link href="/">
        <h1 className="md:text-2xl text-sm font-bold">JonasDev</h1>
      </Link>
      <nav>
        <Link href="/" className="md:text-md text-xs  hover:underline">
          Your Profile
        </Link>
      </nav>
    </header>
  );
}
