"use client";

import Link from "next/link";
import { useRecoilState } from "recoil";
import { searchState } from "recoil/atoms";

export default function Header() {
    const [searchInput, setSearchInput] = useRecoilState(searchState);

  return (
    <header className="p-10 h-16 left-0 right-0 border-b-2 border-gray-300 flex items-center">
      <Link href={"/"} className="text-xl font-bold mr-auto">
        TradeBox
      </Link>
      <div className="flex-grow flex justify-center ml-1">
        <div className="border w-full max-w-[600px] border-white rounded-md p-2 flex gap-2 items-center relative">
          <i className="fas fa-search absolute left-3 text-gray-500"></i>
          <input
            type="text"
            className="bg-transparent w-full pl-8"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
}
