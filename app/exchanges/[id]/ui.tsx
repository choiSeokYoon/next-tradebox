"use client";

import Image from "next/image";

export default function UI({ exchangeProduct }) {
  const imageUrl = exchangeProduct.exchange_images?.[0]?.image_url;
  return (
    <div className="w-full pt-4 pl-64 pr-64 flex flex-col pb-10">
      <div className="flex items-center justify-center">
        {imageUrl ? (
          <Image
            src={exchangeProduct.exchange_images[0].image_url}
            alt="교환 물건 이미지"
            width={500}
            height={500}
            className="rounded-lg"
          />
        ) : (
          <Image
            src={"/images/image-not-found.png"}
            width={500}
            height={500}
            alt={"교환 물건 이미지"}
            className="rounded-lg"
          />
        )}
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
            className="w-full h-64 overflow-y-auto p-4"
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
        <li></li>
      </ul>
    </div>
  );
}
