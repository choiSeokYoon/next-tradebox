"use client";

import { Button, Input } from "@material-tailwind/react";
import { useSignIn } from "hooks/query/useAuth";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "recoil/atoms";


export default function Signin({ setView }) {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInMutation = useSignIn();

  const handleSignIn = () => {
    signInMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          setUserInfo({
            email: data.user.email,
            id: data.user.id,
            nickname: data.user.user_metadata.nickname,
          });
        },
        onError: (error) => {
          alert(error.message);
        },
      }
    );
  };

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
          onClick={handleSignIn}
          disabled={signInMutation.isPending}
          loading={signInMutation.isPending}
        >
          로그인
        </Button>
      </div>
      <div className="text-end mt-4 pr-1">
        계정이 없으신가요 ?{" "}
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
