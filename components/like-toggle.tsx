"use client";

import { useState, useEffect } from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { userInfoState } from "recoil/atoms";
import { useRecoilValue } from "recoil";
import {
  useAddLike,
  useRemoveLike,
  useFetchLikes,
} from "hooks/query/useWishlist";
import { Spinner } from "@material-tailwind/react";

export default function LikeToggle({ productId }) {
  const userInfo = useRecoilValue(userInfoState);
  const [liked, setLiked] = useState(false);
  const userId = userInfo.id;
  const { data: likedProducts = [], isLoading } = useFetchLikes(userId);
  const addLikeMutation = useAddLike();
  const removeLikeMutation = useRemoveLike();

  useEffect(() => {
    if (likedProducts.some((product) => product.exchange_id === productId)) {
      setLiked(true);
    }
  }, [likedProducts, productId]);

  const toggleLike = () => {
    setLiked((prev) => !prev);

    const likeData = {
      user_id: userId,
      exchange_id: productId,
    };

    if (liked) {
      removeLikeMutation.mutate(likeData);
    } else {
      addLikeMutation.mutate(likeData, {
        onError: () => {
          setLiked(true);
        },
      });
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div onClick={toggleLike} style={{ cursor: "pointer" }}>
      {liked ? <Favorite color="error" /> : <FavoriteBorder />}
    </div>
  );
}
