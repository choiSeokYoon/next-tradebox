import React from "react";

interface Message {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

interface ChatMessageListProps {
  messages: Message[];
  currentUser: { id: string } | null;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  currentUser,
}) => {
  return (
    <div className="flex flex-col h-full bg-gray-100 p-4 space-y-4">
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
    </div>
  );
};
