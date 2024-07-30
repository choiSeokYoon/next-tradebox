"use client";

import FormField from "components/form-field";
import { useUpdateExchange } from "hooks/query/useExchange";
import { useEffect, useState } from "react";

export default function ui({ exchangeData }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [itemCondition, setItemCondition] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [trade, setTrade] = useState("");
  const [exchangeId, setExchangeId] = useState(null);

  const categories = [
    { value: "electronics", label: "전자기기" },
    { value: "clothing", label: "의류" },
    { value: "furniture", label: "가구" },
    { value: "game", label: "게임" },
    { value: "book", label: "책" },
    { value: "sport", label: "스포츠" },
  ];

  const updateExchangeMutation = useUpdateExchange((data) => {
    setExchangeId(data);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateExchangeMutation.mutate({
      id: exchangeId,
      title,
      description,
      item_condition: itemCondition,
      location,
      category,
      trade,
    });
  };

  useEffect(() => {
    if (exchangeData) {
      setTitle(exchangeData.title);
      setDescription(exchangeData.description);
      setItemCondition(exchangeData.item_condition);
      setLocation(exchangeData.location);
      setCategory(exchangeData.category);
      setTrade(exchangeData.trade);
      setExchangeId(exchangeData.id);
    }
  }, [exchangeData]);

  return (
    <div className="p-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg flex flex-col gap-5"
      >
        <FormField
          title={title}
          description={description}
          itemCondition={itemCondition}
          location={location}
          category={category}
          trade={trade}
          categories={categories}
          setTitle={setTitle}
          setDescription={setDescription}
          setItemCondition={setItemCondition}
          setLocation={setLocation}
          setCategory={setCategory}
          setTrade={setTrade}
        />
        <button
          type="submit"
          className="mt-4 bg-gray-700 text-white font-bold py-2 rounded hover:bg-gray-900 transition duration-200"
          disabled={updateExchangeMutation.isPending}
        >
          {updateExchangeMutation.isPending ? "수정 중..." : "수정 완료"}
        </button>
      </form>
    </div>
  );
}