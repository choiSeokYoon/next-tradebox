"use client";

import { useEffect } from "react";
import Category from "./components/category";
import ExchangeList from "./components/exchange-list";
import { useRecoilState } from "recoil";
import { userEmailState } from "recoil/atoms";


export default function UI({session}) {
  const [userEmail, setUserEmail] = useRecoilState(userEmailState)
  useEffect(()=>{
    setUserEmail(session?.user?.email)
  },[session])

 
  return (
    <div className="w-full">
      <Category/>
      <div className="p-10">
        <ExchangeList/>
      </div>
    </div>
  );
}
