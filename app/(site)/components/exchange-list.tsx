"use client";

import ExchangeProduct from "components/exchange-product";
import { useFetchExchanges } from "hooks/query/useExchange";

export default function ExchangeList({ selectedCategory }) {
  const {
    data: exchangesQuery,
    isPending,
    isError,
    error,
  } = useFetchExchanges(selectedCategory);

  if (isPending) {
    return <p className="text-center text-gray-600 py-4">로딩 중...</p>;
  }

  if (!exchangesQuery || exchangesQuery.length === 0) {
    return (
      <p className="text-center text-gray-600 py-4">
        현재 해당 게시글이 없습니다.
      </p>
    );
  }

  if (isError) return <p>에러가 발생했습니다: {error.message}</p>;

  return (

      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 2xl:gap-20 pl-auto pr-auto  2xl:pl-10 2xl:pr-10">
        {exchangesQuery &&
          exchangesQuery.map((product) => (
            <ExchangeProduct key={product.id} product={product} />
          ))}
      </div>

  );
}
