"use client";
import { Spinner } from "@material-tailwind/react";
import { useRecoilValue } from "recoil";
import { userInfoState } from "recoil/atoms";

import Image from "next/image";
import Link from "next/link";
import { useDeleteExchange } from "hooks/query/useExchange";
import { useCreateChatRoom } from "hooks/query/useChat";

export default function ExchangeItemDetail({ exchangeProduct }) {
  const userInfo = useRecoilValue(userInfoState);
  const deleteExchangeMutation = useDeleteExchange(exchangeProduct.id);
  const createChatRoomMutation = useCreateChatRoom();
  const imageUrl = exchangeProduct.exchange_images?.[0]?.image_url;

  const startChat = () => {
    createChatRoomMutation.mutate({
      productId: exchangeProduct.id,
      userId: exchangeProduct.user_uid,
      title: exchangeProduct.title
    });
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <Image
          src={imageUrl || "/images/image-not-found.png"}
          alt="교환 물건 이미지"
          width={500}
          height={500}
          className="rounded-lg"
        />
      </div>

      <ul className="space-y-2 pt-10">
        <li className="text-lg font-semibold text-gray-800">
          {exchangeProduct.title}
        </li>
        <li className="text-gray-600">
          <p>{exchangeProduct.created_at}</p>
          <p>{exchangeProduct.location}</p>
        </li>
        <li className="text-gray-600">{exchangeProduct.category}</li>
        <li className="text-gray-600">{exchangeProduct.item_condition}</li>
        <li>
          <div
            className="w-full h-48 overflow-y-auto p-4"
            style={{
              overflowWrap: "break-word",
              wordWrap: "break-word",
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            {exchangeProduct.description}
          </div>
        </li>
      </ul>
      <div className="flex space-x-4 pt-4 justify-end">
        {userInfo.email === exchangeProduct.user_id ? (
          <>
            <Link href={`/exchanges/${exchangeProduct.id}/edit`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                업데이트
              </button>
            </Link>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => deleteExchangeMutation.mutate()}
            >
              {deleteExchangeMutation.isPending ? (
                <Spinner />
              ) : (
                <span>삭제</span>
              )}
            </button>
          </>
        ) : (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={startChat}
            disabled={createChatRoomMutation.isPending}
          >
            채팅하기
          </button>
        )}
      </div>
    </div>
  );
}
