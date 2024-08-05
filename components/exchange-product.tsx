import React from 'react';
import Image from "next/image";
import Link from "next/link";
import LikeToggle from './like-toggle';


const ExchangeProduct = ({ product }) => {
  const isLikedProduct = product.hasOwnProperty('exchange_id');
  const imageUrl = isLikedProduct 
    ? product.exchanges?.exchange_images?.[0]?.image_url 
    : product.exchange_images?.[0]?.image_url;
  const productId = isLikedProduct ? product.exchange_id : product.id;
  const productTitle = isLikedProduct ? product.exchanges?.title : product.title;

  return (
    <div className="bg-white pt-4 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/exchanges/${productId}`} className="block">
        <div className="relative aspect-square">
          <Image
            src={imageUrl || "/images/image-not-found.png"}
            alt={productTitle || "교환 물건 이미지"}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">{productTitle}</h2>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{product.user_nickname}</span>
            <LikeToggle productId={productId} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ExchangeProduct;