"use client";
import React, { useState } from "react";
import { Textarea, Select, Option, Input } from "@material-tailwind/react";
import { createExchange } from "actions/exchange-actions";
import FileDragdropZone from "./components/file-dragdropzone";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "config/ReactQueryClientPorvider";

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

  const createExchangeMutation = useMutation({
    mutationFn: createExchange,
    onSuccess: (data) => {
      setExchangeId(data);
      setFileDragDropVisible(true);
      queryClient.invalidateQueries({
        queryKey: ["get_exchanges"],
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
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
          <Input
            type="text"
            value={title}
            placeholder="제목"
            label="타이틀"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            value={description}
            label="설명란"
            required
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            type="text"
            value={itemCondition}
            placeholder="물건의 상태를 간략하게 적어주세요"
            label="교환 물품 상태"
            required
            onChange={(e) => setItemCondition(e.target.value)}
          />
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            label="예) 서울시 광진구"
            placeholder="주소"
            required
          />
          <Select
            value={category}
            label="카테고리"
            required
            onChange={(e) => setCategory(e)}
          >
            {categories.map((cat) => (
              <Option key={cat.value} value={cat.value}>
                {cat.label}
              </Option>
            ))}
          </Select>
          <Input
            type="text"
            value={trade}
            placeholder="원하시는 아이템을 적어주세요"
            label="희망 교환 물건"
            required
            onChange={(e) => setTrade(e.target.value)}
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
