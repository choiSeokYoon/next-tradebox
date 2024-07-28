"use client";

import Category from "./components/category";
import ExchangeList from "./components/exchange-list";


export default function UI() {
  return (
    <div className="w-full">
      <Category/>
      <div className="p-10">
        <ExchangeList/>
      </div>
    </div>
  );
}
