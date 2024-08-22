import React from "react";
import Image from "next/image";
import Link from "next/link";
import LikeToggle from "./like-toggle";

const ExchangeProduct = ({ product }) => {
  const isLikedProduct = product.hasOwnProperty("exchange_id");
  const imageUrl = isLikedProduct
    ? product.exchanges?.exchange_images?.[0]?.image_url
    : product.exchange_images?.[0]?.image_url;
  const productId = isLikedProduct ? product.exchange_id : product.id;
  const productTitle = isLikedProduct
    ? product.exchanges?.title
    : product.title;

  const userNickname = isLikedProduct
    ? product.exchanges?.user_nickname
    : product.user_nickname;

  return (
    <div className="bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative mt-4 flex lg:block">
      <Link href={`/exchanges/${productId}`} className="flex lg:block w-full">
        <div className="relative w-20 h-20 lg:w-auto lg:h-auto aspect-square flex-shrink-0">
          <Image
            src={imageUrl || "/images/image-not-found.png"}
            alt={productTitle || "교환 물건 이미지"}
            fill
            sizes="650px"
            className="transition-transform duration-300 rounded object-cover"
            priority
          />
        </div>
        <div className="p-4 flex-1 min-w-0">
          <h2 className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-1 truncate">
            {productTitle}
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">{product.trade}</span>
          </div>
        </div>
      </Link>
      <div className="absolute right-2 lg:right-4 bottom-2 lg:bottom-24">
        <LikeToggle productId={productId} />
      </div>
    </div>
  );
};

export default ExchangeProduct;
