import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ChatRoomItem({ room, onClick }) {
  return (
    <li
      key={room.id}
      className="flex items-center p-4 hover:bg-orange-50 transition-colors duration-300 cursor-pointer"
      onClick={onClick}
    >
      <Link href={`/chat`} className="flex-grow flex items-center">
        <Image
          src={room.img_url || "/images/image-not-found.png"}
          alt="교환 물건 이미지"
          width={70}
          height={70}
          className="rounded-full border border-gray-300"
        />
        <div className="ml-4 flex-grow">
          <p className="text-lg font-semibold text-gray-800 truncate">{room.item_title}</p>
          <p className="text-sm text-gray-500">3시간 전</p>
        </div>
        <div className="text-gray-600">{room.user_nickname}</div>
      </Link>
    </li>
  );
}
