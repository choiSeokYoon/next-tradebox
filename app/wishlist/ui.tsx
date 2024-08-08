"use client";
import ExchangeProduct from "components/exchange-product";
import { useFetchLikes } from "hooks/query/useWishlist";
import { useRecoilValue } from "recoil";
import { userInfoState } from "recoil/atoms";

export default function UI() {
  const userInfo = useRecoilValue(userInfoState);
  const {
    data: likesQuery,
    isPending,
    isError,
    error,
  } = useFetchLikes(userInfo.id);

  if (isPending) {
    return <p className="text-center text-gray-600 py-4">로딩 중...</p>;
  }

  if (!likesQuery || likesQuery.length === 0) {
    return (
      <p className="text-center text-gray-600 py-4">
        관심 목록이 비어 있습니다.
      </p>
    );
  }

  if (isError) return <p>에러가 발생했습니다: {error.message}</p>;

  return (
    <section className="p-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 2xl:gap-20 pl-auto pr-auto  2xl:pl-10 2xl:pr-10">
        {likesQuery &&
          likesQuery.map((product) => (
            <ExchangeProduct key={product.id} product={product} />
          ))}
      </div>
    </section>
  );
}
