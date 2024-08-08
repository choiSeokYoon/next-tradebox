"use client";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { selectedChatRoomState } from "recoil/atoms";
import { createBrowserSupabaseClient } from "utils/supabase/client";
import { useFetchChatList } from "hooks/query/useChat";
import ChatRoomItem from "components/chat/ChatRoomItem";

export default function ChatRoomList() {
  const {
    data: chatRoomsQuery,
    isPending,
    error,
    refetch,
  } = useFetchChatList();
  const setSelectedChatRoom = useSetRecoilState(selectedChatRoomState);
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    const channel = supabase
      .channel("chat_list")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chat_rooms",
        },
        (payload) => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, refetch]);

  const handleChatRoomClick = (chatRoom) => {
    setSelectedChatRoom(chatRoom);
  };

  if (isPending) return <p className="text-center text-gray-600 py-4">로딩 중...</p>;

  if (!chatRoomsQuery || chatRoomsQuery.length === 0) {
    return <p className="text-center text-gray-600 py-4">현재 채팅방이 없습니다.</p>
  }

  if (error) return <p>에러가 발생했습니다: {error.message}</p>;
  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg border border-gray-200 mt-4 mr-1 ml-1">
      <ul className="divide-y divide-gray-300">
        {chatRoomsQuery.map((room) => (
          <ChatRoomItem
            key={room.id}
            room={room}
            onClick={() => handleChatRoomClick(room)}
          />
        ))}
      </ul>
    </div>
  );
}
