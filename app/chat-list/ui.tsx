"use client";
import ChatRoomItem from "components/chat/ChatRoomItem";
import ErrorMessage from "components/ErrorMessage";
import Loading from "components/loading";
import { useFetchChatList } from "hooks/query/useChat";
import React from "react";
import { useSetRecoilState } from "recoil";
import { selectedChatRoomState } from "recoil/atoms";

export default function UI() {
    const { data: chatRooms, isLoading, isError } = useFetchChatList();
    const setSelectedChatRoom = useSetRecoilState(selectedChatRoomState);
    
    const handleChatRoomClick = (chatRoom) => {
      setSelectedChatRoom(chatRoom); 
    };
    
    if (isLoading) 
      return <Loading />;
    
    if (isError) 
      return <ErrorMessage />;
  
    return (
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg border border-gray-200 mt-4">
        <h1 className="text-2xl font-bold p-4 border-b bg-orange-100 text-center">내 채팅방</h1>
        {chatRooms?.length ? (
          <ul className="divide-y divide-gray-300">
            {chatRooms.map((room) => (
              <ChatRoomItem key={room.id} room={room} onClick={() => handleChatRoomClick(room)} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 py-4">
            현재 채팅방이 없습니다.
          </p>
        )}
      </div>
    );
  }