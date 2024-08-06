"use client";

import { useEffect, useState } from "react";
import ExchangeList from "./components/exchange-list";
import { useRecoilState } from "recoil";
import { userInfoState } from "recoil/atoms";
import Category from "./components/category";

export default function UI({ session }) {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (session?.user) {
      setUserInfo({
        email: session.user.email,
        id: session.user.id,
        nickname: session.user.user_metadata.nickname,
      });
    } else {
      setUserInfo(null);
    }
  }, [session]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <section className="w-full p-10">
      <Category
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      <ExchangeList selectedCategory={selectedCategory}/>
    </section>
  );
}
