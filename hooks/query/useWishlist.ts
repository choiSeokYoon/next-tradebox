import { useQuery } from "@tanstack/react-query";
import { getLikeAction } from "actions/likes-actions";

export const useFetchLikes = (userId) => {
  
    return useQuery({
      queryKey: ["get_likes"],
      queryFn: () => getLikeAction(userId),
    });
  };