"use client";
import {
  AddBox,
  Favorite,
  Home,
  Message,
  Person,
} from "@mui/icons-material";
import Link from "next/link";
import LogoutButton from "./logout-button";


export default function Sidebar() {

  const links = [
    { href: "/", icon: <Home />, label: "홈" },
    { href: "/add-exchange-item", icon: <AddBox />, label: "교환 등록" },
    { href: "/wishlist", icon: <Favorite />, label: "관심 목록" },
    { href: "/chat", icon: <Message />, label: "채팅" },
    { href: "/profile", icon: <Person />, label: "프로필" },
  ];

  return (
    <aside className="w-56 h-full flex flex-col justify-between p-6 border-r-2 border-gray-300">
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

      <LogoutButton>
      <span>로그아웃</span>
      </LogoutButton>
    </aside>
  );
}
