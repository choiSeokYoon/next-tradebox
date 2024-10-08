import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createChatRoom,
  deleteChatRoom,
  getChatRooms,
} from "actions/chat-actions";
import { queryClient } from "config/ReactQueryClientPorvider";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CreateChatRoomInputType } from "types";

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
    }: CreateChatRoomInputType) =>
      createChatRoom(productId, userId, title, imgUrl, nickname),
    onSuccess: (data) => {
      toast.success("채팅방이 성공적으로 생성되었습니다.");
      router.push('/chat-list');
      queryClient.invalidateQueries({
        queryKey: ["get_chatItem"],
      });
      if ('message' in data) {
        if(data.message === "이 채팅방이 이미 존재합니다."){
          alert("이미 채팅한 기록이 있습니다. 채팅 목록으로 이동합니다.");
          router.push("/chat-list");
        }
      }  
    },
    onError: (error) => {
      console.error("채팅 방 생성 중 오류 발생:", error);
      toast.error("채팅 방 생성 중 오류가 발생했습니다. 다시 시도해 주세요.");
    },
  });
};

export const useDeleteChatRoom = (id, creatorId) => {
  return useMutation({
    mutationFn: () => deleteChatRoom(id, creatorId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_chatItem"],
      });
    },
    onError: (error) => {
      console.error("채팅 방 삭제 중 오류 발생:", error);
      toast.error("채팅 방 삭제 중 오류가 발생했습니다. 다시 시도해 주세요.");
    },
  });
};
