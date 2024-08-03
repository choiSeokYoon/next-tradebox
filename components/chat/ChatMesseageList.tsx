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
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`p-2 rounded-lg ${
            message.sender_id === currentUser?.id
              ? "bg-blue-500 text-white self-end"
              : "bg-gray-100 text-black self-start"
          }`}
        >
          <p>{message.content}</p>
          <small>{new Date(message.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};
