"use client";
import ExchangeProduct from "components/exchange-product";
import { useFetchLikes } from "hooks/query/useWishlist";
import React from "react";
import { useRecoilValue } from "recoil";
import { userInfoState } from "recoil/atoms";

export default function UI() {
  const userInfo = useRecoilValue(userInfoState);
  const likesQuery = useFetchLikes(userInfo.id);

  if (likesQuery.isLoading) return <div>로딩중...</div>;
  console.log(likesQuery);
  return (
    <div className="p-10">
      {likesQuery.isPending && <p>...loading</p>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {likesQuery.data &&
          likesQuery.data.map((product) => (
            <ExchangeProduct key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}
