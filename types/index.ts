

export interface CategoryType {
    id: number;
    name: string;
    img: string;
    category: string | null;
  }

  export interface CategoryProps {
    selectedCategory: string | null;
    onCategorySelect: (category: string | null) => void;
  }

  export interface Message {
    id: string;
    sender_id: string;
    content: string;
    created_at: string;
  }

  export interface ChatMessageListProps {
    messages: Message[];
    currentUser: { id: string } | null;
  }

  export interface CreateChatRoomInput {
    productId: number;
    userId: string;
    title: string;
    imgUrl: string;
    nickname: string;
  }

