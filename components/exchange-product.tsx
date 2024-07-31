"use client";

import Image from "next/image";
import Link from "next/link";
import LikeToggle from "./like-toggle";

export default function ExchangeProduct({ product }) {

  const isLikedProduct = product.hasOwnProperty('exchange_id'); 
 
  const imageUrl = isLikedProduct 
    ? product.exchanges?.exchange_images?.[0]?.image_url 
    : product.exchange_images?.[0]?.image_url; 

 
  const productId = isLikedProduct ? product.exchange_id : product.id;

  const productTitle = isLikedProduct ? product.exchanges?.title : product.title

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-start max-w-xs mx-auto relative cursor-pointer hover:scale-110 transition-transform duration-300">
      <Link href={`/exchanges/${productId}`}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            width={400}
            height={200}
            alt={"교환 물건 이미지"}
            className="mb-2 h-36"
          />
        ) : (
          <Image
            src={"/images/image-not-found.png"}
            width={400}
            height={200}
            alt={"교환 물건 이미지"}
            className="mb-2 h-36"
          />
        )}
        <div className="flex justify-between">
          <h2 className="text-lg font-bold">{productTitle}</h2>
        </div>
      </Link>
      <LikeToggle productId={productId} />
    </div>
  );
}
