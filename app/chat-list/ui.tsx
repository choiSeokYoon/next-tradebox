"use client"

import { getChatRooms } from 'actions/chat-actions';
import { useFetchChatList } from 'hooks/query/useChat';
import Link from 'next/link';
import React from 'react'

export default function UI() {
    const { data: chatRooms, isLoading, isError } = useFetchChatList();

    if (isLoading) return <p className="text-center text-gray-600 py-4">로딩 중...</p>;
    if (isError) return <p className="text-center text-red-600 py-4">채팅방 목록을 불러오는 데 실패했습니다.</p>;
  
    console.log(chatRooms)
    return (
        <div className="max-w-md mx-auto bg-white">
            <h1 className="text-lg font-bold p-4 border-b">채팅</h1>
            {chatRooms?.length ? (
                <ul className="divide-y divide-gray-200">
                    {chatRooms.map((room) => (
                        <li key={room.id} className="flex items-center p-4 hover:bg-gray-50 cursor-pointer">
                            <Link href={`/chat`}></Link>
                            <div className="flex-grow min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{room.item_title}</p>
                               
                            </div>
                            <div className="flex-shrink-0 ml-3">
                                <p className="text-xs text-gray-500">3시간 전</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-600 py-4">현재 채팅방이 없습니다.</p>
            )}
        </div>
    )
}