import { useMutation, useQuery } from "@tanstack/react-query";
import { createChatRoom, getChatRooms } from "actions/chat-actions";
import { useRouter } from "next/navigation";

interface CreateChatRoomInput {
    productId: number;
    userId: string;
    title: string;
  }

  export const useFetchChatList= () => {
    return useQuery({
      queryKey: ["get_chatItem"],
      queryFn: () => getChatRooms()
    })
  }

export const useCreateChatRoom = () => {
    const router = useRouter();
  return useMutation({
    mutationFn: ({ productId, userId,title }: CreateChatRoomInput) => createChatRoom(productId, userId,title),
    onSuccess: () => alert("채팅방이 성공적으로 생성되었습니다."),
    onError: (error) => {
      if (error.message === '이 채팅방이 이미 존재합니다.') {
        alert("이미 채팅한 기록이 있습니다.");
        router.push('/chat'); 
      } else {
        alert("채팅방 생성에 실패했습니다.");
      }
    },
  });
};
