"use client";

import { useQuery } from "@tanstack/react-query";
import { searchExchanges } from "actions/exchange-actions";
import ExchangeProduct from "components/exchange-product";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { searchState } from "recoil/atoms";

export default function ExchangeList() {
  const searchInput = useRecoilValue(searchState);
  const exchangesQuery = useQuery({
    queryKey: ["get_exchanges", searchInput],
    queryFn: () => searchExchanges({ searchInput }),

  });

  return (
    <div>
      {exchangesQuery.isPending && <p>...loading</p>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {exchangesQuery.data &&
          exchangesQuery.data.map((product) => (
            <ExchangeProduct key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}
