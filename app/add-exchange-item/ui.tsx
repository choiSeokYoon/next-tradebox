"use client";
import React, { useState } from "react";
import FileDragdropZone from "./components/file-dragdropzone";
import { useCreateExchange } from "hooks/query/useExchange";
import FormField from "components/form-field";


export default function UI() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [itemCondition, setItemCondition] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [trade, setTrade] = useState("");
  const [fileDragDropVisible, setFileDragDropVisible] = useState(false);
  const [exchangeId, setExchangeId] = useState(null);

  const categories = [
    { value: "electronics", label: "전자기기" },
    { value: "clothing", label: "의류" },
    { value: "furniture", label: "가구" },
    { value: "game", label: "게임" },
    { value: "book", label: "책" },
    { value: "sport", label: "스포츠" },
  ];

  const createExchangeMutation = useCreateExchange((data) => {
    setExchangeId(data);
    setFileDragDropVisible(true);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createExchangeMutation.mutate({
      title,
      description,
      item_condition: itemCondition,
      location,
      category,
      status: "active",
      trade,
    });
  };

  return (
    <div className="p-10">
      {fileDragDropVisible ? (
        <FileDragdropZone exchangeId={exchangeId} />
      ) : (
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
            disabled={createExchangeMutation.isPending}
          >
            {createExchangeMutation.isPending ? "작성 중..." : "작성 완료"}
          </button>
        </form>
      )}
    </div>
  );
}
