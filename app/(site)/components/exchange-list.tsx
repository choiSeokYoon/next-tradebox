"use client";

import { useState } from "react";
import ExchangeProduct from "components/exchange-product";
import { useFetchExchanges } from "hooks/query/useExchange";
import Category from "./Category";

export default function ExchangeList() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const exchangesQuery = useFetchExchanges(selectedCategory);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <Category selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />
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
