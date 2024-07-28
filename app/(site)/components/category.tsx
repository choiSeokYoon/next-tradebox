"use client";

import Image from "next/image";

export default function Category() {
  const categories = [
    {
      id: 1,
      name: "전자기기",
      img: "/images/category-electronics.jpg",
    },
    {
      id: 2,
      name: "의류",
      img: "/images/category-clothing.jpg",
    },
    {
      id: 3,
      name: "책",
      img: "/images/category-books.jpg",
    },
    {
      id: 4,
      name: "가구",
      img: "/images/category-furniture.jpg",
    },
    {
      id: 5,
      name: "스포츠",
      img: "/images/category-sport.jpg",
    },
    {
      id: 6,
      name: "게임",
      img: "/images/category-game.jpg",
    },
  ];

  return (
    <div className="w-full h-40 flex justify-around border-b-2 border-gray-300 pt-2">
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex flex-col items-center justify-center mx-2 cursor-pointer"
        >
          <Image
            src={category.img}
            alt={category.name}
            width={200}
            height={60}
            className="rounded-full h-24 w-24 hover:scale-110 transition-transform duration-300"
          />
          <span className="mt-2">{category.name}</span>
        </div>
      ))}
    </div>
  );
}
