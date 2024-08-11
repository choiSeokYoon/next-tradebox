import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addLikeAction, getLikeAction, removeLikeAction } from "actions/likes-actions";
import { toast } from "react-toastify";

export const useFetchLikes = (userId) => {
    return useQuery({
      queryKey: ["get_likes"],
      queryFn: () => getLikeAction(userId),
    });
  };

  export const useAddLike = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: addLikeAction,
      onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["get_likes"],
          });
      },
      onError: (error) => {
        console.error("오류 발생:", error);
        toast.error("오류가 발생했습니다. 다시 시도해 주세요.");
      },
    });
  };

  export const useRemoveLike = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: removeLikeAction,
      onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["get_likes"],
          });
      },
      onError: (error) => {
        console.error("삭제 중 오류 발생:", error);
        toast.error("삭제 중 오류가 발생했습니다. 다시 시도해 주세요.");
      },
    });
  };