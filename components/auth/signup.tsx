"use client";

import { Button, Input } from "@material-tailwind/react";
import { useSignUp, useVerifyOtp } from "hooks/query/useAuth";
import { useState } from "react";

export default function SignUp({ setView }) {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationRequired, setConfirmationRequired] = useState(false);
  const [nicknameError, setNicknameError] = useState("");

  const signUpMutation = useSignUp();
  const verifyOtpMutation = useVerifyOtp();

  const validateNickname = (value) => {
    if (value.length < 4 || value.length > 10) {
      setNicknameError("닉네임은 4자 이상 10자 이하로 입력해주세요.");
      return false;
    }
    setNicknameError("");
    return true;
  };

  const handleSignUp = () => {
    if (!validateNickname(nickname)) return;

    signUpMutation.mutate(
      { email, password, nickname },
      {
        onSuccess: () => {
          setConfirmationRequired(true);
        },
        onError: (error) => {
          alert(error.message);
        },
      }
    );
  };

  const handleVerifyOtp = () => {
    verifyOtpMutation.mutate(
      { email, otp },
      {
        onSuccess: () => {
          alert("회원가입이 완료되었습니다.");
          setView("SIGNIN");
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
          회원가입
        </h2>
        {confirmationRequired ? (
          <Input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            label="otp"
            type="text"
            className="w-full rounded-sm"
            placeholder="6자리 OTP를 입력해주세요"
          />
        ) : (
          <>
            <Input
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                validateNickname(e.target.value);
              }}
              label="nickname"
              type="text"
              error={nicknameError !== ""}
            />
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
          </>
        )}
        <Button
          className="mt-2"
          onClick={() => {
            if (confirmationRequired) {
              handleVerifyOtp();
            } else {
              handleSignUp();
            }
          }}
          loading={
            confirmationRequired
              ? verifyOtpMutation.isPending
              : signUpMutation.isPending
          }
          disabled={
            confirmationRequired
              ? verifyOtpMutation.isPending
              : signUpMutation.isPending
          }
        >
          {confirmationRequired ? "인증하기" : "가입하기"}
        </Button>
      </div>
      <div className="text-end mt-4 pr-1">
        계정이 있으신가요 ?{" "}
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
