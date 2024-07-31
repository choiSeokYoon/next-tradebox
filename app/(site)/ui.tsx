"use client";

import { useEffect } from "react";
import Category from "./components/category";
import ExchangeList from "./components/exchange-list";
import { useRecoilState } from "recoil";
import { userInfoState } from "recoil/atoms";


export default function UI({session}) {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)

  useEffect(() => {
    if (session?.user) {
      setUserInfo({ email: session.user.email, id: session.user.id });
    }
  }, [session]);
  console.log(userInfo )


 
  return (
    <div className="w-full">
      <Category/>
      <div className="p-10">
        <ExchangeList/>
      </div>
    </div>
  );
}
