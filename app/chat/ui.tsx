"use client";

import { getMessages, sendMessage } from "actions/chat-actions";
import ChatMessageInput from "components/chat/ChatMessageInput";
import { ChatMessageList } from "components/chat/ChatMesseageList";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { selectedChatRoomState } from "recoil/atoms";
import { createBrowserSupabaseClient } from "utils/supabase/client";


interface Message {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export default function UI() {
  const selectedChatRoom = useRecoilValue(selectedChatRoomState);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser, setCurrentUser] = useState(null);
  const supabase = createBrowserSupabaseClient();
  
  const chatRoomId = selectedChatRoom.id;

  useEffect(() => {
    fetchMessages();
    fetchCurrentUser();
  }, [chatRoomId]);

  useEffect(() => {
    const channel = supabase
      .channel(`chat_${chatRoomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `chat_room_id=eq.${chatRoomId}`,
        },
        (payload) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            payload.new as Message,
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatRoomId, supabase]);

  const fetchMessages = async () => {
    try {
      const fetchedMessages = await getMessages(chatRoomId);
      setMessages(fetchedMessages);
    } catch (error) {
        console.error("에러 코드", error);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setCurrentUser(user);
    } catch (error) {
      console.error("에러 코드", error);
    }
  };

  const handleSendMessage = async (message: string) => {
    try {
      await sendMessage(chatRoomId, message);
    } catch (error) {
        console.error("에러 코드", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ChatMessageList messages={messages} currentUser={currentUser} />
      <ChatMessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
