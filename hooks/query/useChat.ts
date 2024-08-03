import { useMutation, useQuery } from "@tanstack/react-query";
import { createChatRoom, getChatRooms } from "actions/chat-actions";
import { queryClient } from "config/ReactQueryClientPorvider";
import { useRouter } from "next/navigation";

interface CreateChatRoomInput {
  productId: number;
  userId: string;
  title: string;
  imgUrl: string;
  nickname: string;
}

export const useFetchChatList = () => {
  return useQuery({
    queryKey: ["get_chatItem"],
    queryFn: () => getChatRooms(),
  });
};


export const useCreateChatRoom = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: ({
      productId,
      userId,
      title,
      imgUrl,
      nickname,
    }: CreateChatRoomInput) =>
      createChatRoom(productId, userId, title, imgUrl, nickname),
    onSuccess: () => {
      alert("채팅방이 성공적으로 생성되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["get_chatItem"],
      });
    },

    onError: (error) => {
      if (error.message === "이 채팅방이 이미 존재합니다.") {
        alert("이미 채팅한 기록이 있습니다.");
        router.push("/chat");
      } else {
        alert("채팅방 생성에 실패했습니다.");
      }
    },
  });
};
