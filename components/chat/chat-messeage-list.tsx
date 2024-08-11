import React, { useEffect, useRef } from "react";
import { ChatMessageListProps } from "types";

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  currentUser,
}) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gray-100 p-4 space-y-4 overflow-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender_id === currentUser?.id
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <div
            className={`max-w-[70%] rounded-2xl px-4 py-2 ${
              message.sender_id === currentUser?.id
                ? "bg-white text-black border border-gray-300"
                : "bg-orange-200 text-black border border-gray-300"
            }`}
            style={{ wordBreak: "break-word" }}
          >
            <p className="text-sm">{message.content}</p>
            <div
              className={`text-xs text-gray-500 ${
                message.sender_id === currentUser?.id
                  ? "text-end"
                  : "text-start"
              }`}
            >
              <small>{new Date(message.created_at).toLocaleString()}</small>
            </div>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};
