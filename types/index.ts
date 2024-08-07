import { ReactNode } from "react";

export interface CategoryType {
  id: number;
  name: string;
  category: string | null;
  icon: ReactNode;
}

export interface CategoryProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export interface MessageType {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export interface ChatMessageListProps {
  messages: MessageType[];
  currentUser: { id: string } | null;
}

export interface CreateChatRoomInputType {
  productId: number;
  userId: string;
  title: string;
  imgUrl: string;
  nickname: string;
}

