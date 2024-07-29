"use client";

import { FavoriteBorderOutlined, FavoriteRounded } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";

export default function ExchangeProduct({ product }) {
  return (
    <div className="bg-[#D3D3D3] p-4 rounded-lg flex flex-col items-start max-w-xs mx-auto relative cursor-pointer hover:scale-110 transition-transform duration-300">
      <Link href={`/exchanges/${product.id}`}>
        <Image
          src={"/images/category-game.jpg"}
          width={400}
          height={400}
          alt={"테스트 이미지"}
          className="mb-2"
        />
        <FavoriteBorderOutlined
          color="action"
          className="absolute right-6 bottom-16 cursor-pointer hover:scale-110 transition-transform duration-300"
        />
        <h2 className="text-lg font-bold">{product.title}</h2>
      </Link>
    </div>
  );
}
