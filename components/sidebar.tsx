"use client";
import {
  AddBox,
  Favorite,
  Home,
  Logout,
  Message,
  Person,
} from "@mui/icons-material";
import Link from "next/link";

export default function Sidebar() {
  const links = [
    { href: "/", icon: <Home />, label: "홈" },
    { href: "/add-item", icon: <AddBox />, label: "아이템 등록" },
    { href: "/wishlist", icon: <Favorite />, label: "관심 목록" },
    { href: "/chat", icon: <Message />, label: "채팅" },
    { href: "/profile", icon: <Person />, label: "프로필" },
  ];

  return (
    <aside className="w-64 h-screen flex flex-col justify-between p-6 border-r-2 border-gray-300">
      <nav className="flex flex-col gap-6">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="flex items-center group"
          >
            <div className="text-gray-600 group-hover:text-indigo-600 transition-colors mr-4">
              {link.icon}
            </div>
            <span className="group-hover:text-indigo-600 transition-colors">
              {link.label}
            </span>
          </Link>
        ))}
      </nav>

      <button
        onClick={() => console.log("logout")}
        className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
      >
        <Logout className="mr-4" />
        <span>로그아웃</span>
      </button>
    </aside>
  );
}
