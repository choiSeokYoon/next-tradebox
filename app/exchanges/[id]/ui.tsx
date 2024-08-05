"use client";

import { Spinner } from "@material-tailwind/react";
import ExchangeItemDetail from "./components/exchange-item-detail";
import { useFetchExchangeItam } from "hooks/query/useExchange";
import Loading from "../../../components/loading";

export default function UI({ params }) {
  const exchangeItemQuery = useFetchExchangeItam(params);

  const { data: exchangeProduct, isLoading, error } = exchangeItemQuery;

  if (isLoading) return <Loading/>
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;

  if (!exchangeProduct) return <div>교환 상품을 찾을 수 없습니다.</div>;

  

  return (
    <div className="w-full pt-4 flex flex-col pb-10 pl-4 pr-4">
      <ExchangeItemDetail exchangeProduct={exchangeProduct}></ExchangeItemDetail>
    </div>
  );
}
