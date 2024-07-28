"use client";

import { useQuery } from "@tanstack/react-query";
import { getExchanges } from "actions/exchange-actions";
import ExchangeProduct from "components/exchange-product";
import { useState } from "react";

export default function ExchangeList() {
  const [searchInput, setSearchInput] = useState("");
  const exchangesQuery = useQuery({
    queryKey: ["get_exchanges"],
    queryFn: () => getExchanges({ searchInput }),
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
