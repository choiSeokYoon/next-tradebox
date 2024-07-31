import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addLikeAction, getLikeAction, removeLikeAction } from "actions/likes-actions";

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
    });
  };