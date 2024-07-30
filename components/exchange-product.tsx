"use client";

import { FavoriteBorderOutlined } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

export default function ExchangeProduct({ product }) {
  const imageUrl = product.exchange_images?.[0]?.image_url;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-start max-w-xs mx-auto relative cursor-pointer hover:scale-110 transition-transform duration-300">
      <Link href={`/exchanges/${product.id}`}>
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
        <FavoriteBorderOutlined
          color="action"
          className="absolute right-6 bottom-16 cursor-pointer hover:scale-110 transition-transform duration-300"
        />
        <h2 className="text-lg font-bold">{product.title}</h2>
      </Link>
    </div>
  );
}
