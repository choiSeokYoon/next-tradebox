import React, { useState } from "react";
import { Spinner } from "@material-tailwind/react";
import { useRecoilValue } from "recoil";
import { userInfoState } from "recoil/atoms";
import Image from "next/image";
import Link from "next/link";
import { useDeleteExchange } from "hooks/query/useExchange";
import { useCreateChatRoom } from "hooks/query/useChat";
import { Update, Delete, Chat } from "@mui/icons-material";
import {
  categoriesOptions,
  itemConditionOptions,
} from "utils/constants/constants";

export default function ExchangeItemDetail({ exchangeProduct }) {
  const userInfo = useRecoilValue(userInfoState);
  const deleteExchangeMutation = useDeleteExchange(exchangeProduct.id);
  const createChatRoomMutation = useCreateChatRoom();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = exchangeProduct.exchange_images || [];

  const startChat = () => {
    createChatRoomMutation.mutate({
      productId: exchangeProduct.id,
      userId: exchangeProduct.user_uid,
      title: exchangeProduct.title,
      imgUrl: images[0]?.image_url,
      nickname: exchangeProduct.user_nickname,
    });
  };

  function getItemConditionLabel(value) {
    const condition = itemConditionOptions.find(
      (option) => option.value === value
    );
    return condition ? condition.label : value;
  }

  function getCategoriesLabel(value) {
    const categories = categoriesOptions.find(
      (option) => option.value === value
    );
    return categories ? categories.label : value;
  }

  return (
    <div className="bg-white">
      <div className="flex flex-col lg:flex-row">
        <div className="relative w-full lg:w-1/2 h-[350px]">
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          {images.length > 0 ? (
            <Image
              src={images[currentImageIndex].image_url}
              alt={`교환 물건 이미지`}
              fill
              objectFit="contain"
              objectPosition="center"
              className="rounded-lg lg:rounded-l-lg"
            />
          ) : (
            <Image
              src="/images/image-not-found.png"
              alt="이미지 없음"
              fill
              objectFit="contain"
              objectPosition="center"
              className="rounded-lg lg:rounded-l-lg"
            />
          )}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentImageIndex ? "bg-white" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
        <div className="lg:w-1/2 p-6 flex flex-col">
          <div className="mb-4 relative">
            <h1 className="text-2xl font-bold text-gray-800">
              {exchangeProduct.title}
            </h1>
            <span className="text-sm text-gray-500 absolute -top-4 -right-4">
              {new Date(exchangeProduct.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className="text-xl font-semibold text-orange-500 mb-4">
            교환하고 싶은 아이템: {exchangeProduct.trade}
          </p>
          <div className="space-y-2 text-sm text-gray-600 mb-6">
            <p>👤 {exchangeProduct.user_nickname}</p>
            <p>🏠 {exchangeProduct.location}</p>
            <p>📁 {getCategoriesLabel(exchangeProduct.category)}</p>
            <p>📦 {getItemConditionLabel(exchangeProduct.item_condition)}</p>
          </div>
          <div className="mt-auto">
            {userInfo.email === exchangeProduct.user_id ? (
              <div className="flex space-x-4">
                <Link
                  href={`/exchanges/${exchangeProduct.id}/edit`}
                  className="flex-1"
                >
                  <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center text-sm">
                    <Update className="mr-2" />
                    수정하기
                  </button>
                </Link>
                <button
                  className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center text-sm"
                  onClick={() => deleteExchangeMutation.mutate()}
                >
                  {deleteExchangeMutation.isPending ? (
                    <Spinner />
                  ) : (
                    <>
                      <Delete className="mr-2" />
                      삭제하기
                    </>
                  )}
                </button>
              </div>
            ) : (
              <button
                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center"
                onClick={startChat}
                disabled={createChatRoomMutation.isPending}
              >
                <Chat className="mr-2" />
                채팅하기
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="p-6 bg-gray-50 rounded-lg mt-6">
        <h2 className="text-lg font-semibold mb-3">상세 설명</h2>
        <p className="text-gray-700 whitespace-pre-wrap">
          {exchangeProduct.description}
        </p>
      </div>
    </div>
  );
}
