"use client";

import ExchangeItemDetail from "./components/exchange-item-detail";
import { useFetchExchangeItam } from "hooks/query/useExchange";

export default function UI({ params }) {
  const {
    data: exchangeItemQuery,
    isPending,
    error,
  } = useFetchExchangeItam(params);

  if (isPending)
    return <p className="text-center text-gray-600 py-4">로딩 중...</p>;
  if (error) return <p>에러가 발생했습니다: {error.message}</p>;

  if (!exchangeItemQuery) return <div>해당 게시물을 찾을 수 없습니다.</div>;

  return (
    <div className="w-full pt-4 flex flex-col pb-10 pl-4 pr-4">
      <ExchangeItemDetail
        exchangeProduct={exchangeItemQuery}
      ></ExchangeItemDetail>
    </div>
  );
}
