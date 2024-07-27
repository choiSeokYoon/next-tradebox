"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [search, setSearch] = useState("");

  return (
    <header className="p-10 h-16 left-0 right-0 border-b-2 border-gray-300 flex items-center">
      <Link href={"/"} className="text-xl font-bold mr-auto">
        TradeBox
      </Link>
      <div className="flex-grow flex justify-center">
        <div className="border w-full max-w-[600px] border-white rounded-md p-2 flex gap-2 items-center relative">
          <i className="fas fa-search absolute left-3 text-gray-500"></i>
          <input
            type="text"
            className="bg-transparent w-full pl-8"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
}
