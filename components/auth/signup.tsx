"use client";

import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";

export default function SignUp({ setView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex flex-col w-96">
      <div className="pt-8 pb-6 px-10 w-full flex flex-col items-center justify-center max-w-3xl bg-white gap-2 rounded-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">회원가입</h2>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="email"
          type="email"
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="password"
          type="password"
        />
        <Button className="mt-2">
          가입하기
        </Button>
      </div>
      <div className="text-end mt-4 pr-1">
        계정이 없으신가요 ?{" "}
        <button
          className="text-light-blue-600 font-bold"
          onClick={() => setView("SIGNIN")}
        >
          로그인하기
        </button>
      </div>
    </div>
  );
}
