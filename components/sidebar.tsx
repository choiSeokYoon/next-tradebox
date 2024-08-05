"use client";
import { AddBox, Favorite, Home, Message, Person } from "@mui/icons-material";
import Link from "next/link";
import LogoutButton from "./logout-button";

export default function Sidebar() {
  const links = [
    { href: "/", icon: <Home />, label: "홈" },
    { href: "/create-exchange-item", icon: <AddBox />, label: "교환 등록" },
    { href: "/wishlist", icon: <Favorite />, label: "관심 목록" },
    { href: "/chat-list", icon: <Message />, label: "채팅" },
    { href: "/profile", icon: <Person />, label: "프로필" },
  ];

  const SidebarContent = () => (
    <>
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
      <div className="pb-32">
        <LogoutButton>
          <span>로그아웃</span>
        </LogoutButton>
      </div>
    </>
  );

  return (
    <>
      <aside className="fixed w-56 h-full flex-col justify-between p-6 hidden lg:flex">
        <SidebarContent />
      </aside>
      <aside className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 flex justify-around lg:hidden z-50">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="flex flex-col items-center"
          >
            <div className="text-gray-600 hover:text-indigo-600 transition-colors text-xs">
              {link.icon}
            </div>
            <span className="text-xs mt-1">{link.label}</span>
          </Link>
        ))}
      </aside>
    </>
  );
}