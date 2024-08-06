"use client";

import NickNameEditor from "./components/nickname-editor";
import UserExchangeItemList from "./components/user-exchange-item-list";




export default function UI() {

  return (
    <section className="p-10">
      <NickNameEditor/>
      <UserExchangeItemList/>
    </section>
  );
}