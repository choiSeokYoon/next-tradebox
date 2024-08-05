"use client";

import Image from "next/image";
import { CategoryType } from "types";

export default function Category({ selectedCategory, onCategorySelect }) {
  const categories: CategoryType[] = [
    { id: 0, name: "전체", img: "/images/category-all.jpg", category: null },
    {
      id: 1,
      name: "전자기기",
      img: "/images/category-electronics.jpg",
      category: "electronics",
    },
    {
      id: 2,
      name: "의류",
      img: "/images/category-clothing.jpg",
      category: "clothing",
    },
    { id: 3, name: "책", img: "/images/category-books.jpg", category: "books" },
    {
      id: 4,
      name: "가구",
      img: "/images/category-furniture.jpg",
      category: "furniture",
    },
    {
      id: 5,
      name: "스포츠",
      img: "/images/category-sport.jpg",
      category: "sports",
    },
    { id: 6, name: "게임", img: "/images/category-game.jpg", category: "game" },
  ];

  const handleCategoryClick = (category: string | null) => {
    onCategorySelect(category);
  };

  return (
    <div className="w-full grid grid-cols-3 lg:grid-cols-7 gap-4 border-b-2 border-gray-300 pt-2 pb-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className={`flex flex-col items-center justify-center cursor-pointer ${
            selectedCategory === category.category ? "border-b-2" : ""
          }`}
          onClick={() => handleCategoryClick(category.category)}
        >
          <Image
            src={category.img}
            alt={category.name}
            width={200}
            height={60}
            className="rounded-full h-16 w-16 sm:h-20 sm:w-20 hover:scale-110 transition-transform duration-300"
          />
          <span className="mt-2 text-sm">{category.name}</span>
        </div>
      ))}
    </div>
  );
}
