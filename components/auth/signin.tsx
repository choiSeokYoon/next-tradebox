"use client";

import { Button, Input } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function Signin({ setView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const supabase = createBrowserSupabaseClient();

  const signInMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (data) {
        console.log(data);
      }
      if (error) {
        //TODO 알림창 라이브러리 활용
        alert(error.message);
      }
    },
  });
  return (
    <div className="flex flex-col w-96">
      <div className="pt-8 pb-6 px-10 w-full flex flex-col items-center justify-center max-w-3xl bg-white gap-2 rounded-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          로그인
        </h2>
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
        <Button
          className="mt-2"
          onClick={() => {
            signInMutation.mutate();
          }}
          disabled={signInMutation.isPending}
          loading={signInMutation.isPending}
        >
          로그인
        </Button>
      </div>
      <div className="text-end mt-4 pr-1">
        계정이 있으신가요 ?{" "}
        <button
          className="text-light-blue-600 font-bold"
          onClick={() => setView("SIGNUP")}
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
