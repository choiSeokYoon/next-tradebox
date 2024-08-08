"use client";

import {
  Category as CategoryIcon,
  Devices,
  Checkroom,
  MenuBook,
  Chair,
  SportsBasketball,
  SportsEsports,
} from "@mui/icons-material";
import { CategoryType } from "types";

export default function Category({ selectedCategory, onCategorySelect }) {
  const categories: CategoryType[] = [
    {
      id: 0,
      name: "전체",
      category: null,
      icon: <CategoryIcon />,
    },
    {
      id: 1,
      name: "전자기기",
      category: "ELECTRONICS",
      icon: <Devices />,
    },
    {
      id: 2,
      name: "의류",
      category: "CLOTHING",
      icon: <Checkroom />,
    },
    {
      id: 3,
      name: "책",
      category: "BOOK",
      icon: <MenuBook />,
    },
    {
      id: 4,
      name: "가구",
      category: "FURNITURE",
      icon: <Chair />,
    },
    {
      id: 5,
      name: "스포츠",
      category: "SPORT",
      icon: <SportsBasketball />,
    },
    {
      id: 6,
      name: "게임",
      category: "GAME",
      icon: <SportsEsports />,
    },
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
            selectedCategory === category.category
              ? "border-b-2 border-orange-500 "
              : ""
          }`}
          onClick={() => handleCategoryClick(category.category)}
        >
          <div className="text-4xl mb-2 hover:scale-110 transition-transform duration-300">
            {category.icon}
          </div>
          <span className="text-sm">{category.name}</span>
        </div>
      ))}
    </div>
  );
}
