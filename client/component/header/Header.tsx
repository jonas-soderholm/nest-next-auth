"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full py-4 px-6 text-white flex justify-between items-center">
      <h1 className="text-2xl font-bold">Email only login</h1>
      <nav>
        <Link href="/login" className="mx-4 hover:underline">
          My Profile
        </Link>
      </nav>
    </header>
  );
}
