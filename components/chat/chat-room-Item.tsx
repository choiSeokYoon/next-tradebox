import { useDeleteChatRoom } from "hooks/query/useChat";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "recoil/atoms";

export default function ChatRoomItem({ room, onClick }) {
  const [userInfo] = useRecoilState(userInfoState);
  const deleteChatRoomMutation = useDeleteChatRoom(room.id, room.creator_id);

  const displayedNickname =
    userInfo.id === room.participant_id
      ? room.creator_nickname
      : room.user_nickname;

  const isActiveRoom = room.creator_id !== null && room.participant_id !== null;


  return (
    <li
      key={room.id}
      className={`flex items-center p-4 transition-colors duration-300 cursor-pointer border-b border-gray-200 ${
        isActiveRoom ? "hover:bg-gray-100" : "bg-gray-50"
      }`}
      onClick={isActiveRoom ? onClick : undefined}
    >
      {isActiveRoom ? (
        <Link href={`/chat`} className="flex-grow flex items-center">
          <div className="w-14 h-14 relative">
            <Image
              src={room.img_url || "/images/image-not-found.png"}
              alt="교환 물건 이미지"
              fill
              sizes="650px"
              className="rounded-full border border-gray-300 object-cover"
              priority
            />
          </div>
          <div className="ml-4 flex-grow">
            <p className="text-base font-medium text-gray-900 truncate">
              {room.item_title}
            </p>
            <p className="text-sm text-gray-500 mt-1">{displayedNickname}</p>
          </div>
        </Link>
      ) : (
        <div className="flex-grow flex items-center">
          <div className="w-14 h-14 relative opacity-50">
            <Image
              src={room.img_url || "/images/image-not-found.png"}
              alt="교환 물건 이미지"
              layout="fill"
              className="rounded-full border border-gray-300 object-cover"
            />
          </div>
          <div className="ml-4 flex-grow">
            <p className="text-base font-medium text-gray-600 truncate">
              {room.item_title}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {displayedNickname} <span className="text-red-500">(상대방이 나갔습니다)</span>
            </p>
          </div>
        </div>
      )}
      <button
        onClick={() => deleteChatRoomMutation.mutate(room.id, room.creator_id)}
        className="ml-4 text-sm text-red-500 hover:text-red-700"
      >
        {isActiveRoom ? "나가기" : "삭제"}
      </button>
    </li>
  );
}
