import { ArrowBackOutlined } from "@mui/icons-material";
import Link from "next/link";
import React, { useState } from "react";

export default function ChatMessageInput({ onSendMessage }) {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="fixed bottom-0 left-0 lg:left-56 right-0 p-4 bg-white border-t z-50"
    >
      <div className="flex space-x-2">
        <Link href={"chat-list"} className="flex justify-center items-center">
          <ArrowBackOutlined />
        </Link>

        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className="flex-1 border p-2 rounded text-xs"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          전송
        </button>
      </div>
    </form>
  );
}
