"use client";

import { Button, Input } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function SignUp({ setView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [nickname, setNickname] = useState("");
  const [confirmationRequired, setConfirmationRequired] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const supabase = createBrowserSupabaseClient();

  const router = useRouter()

  useEffect(() => {
    if (isOtpVerified) {
      const nicknameInput = document.getElementById('nickname-input');
      if (nicknameInput) nicknameInput.focus();
    }
  }, [isOtpVerified]);

  const signupMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (data) {
        setConfirmationRequired(true);
      }
      if (error) {
        alert(error.message);
      }
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.verifyOtp({
        type: "signup",
        email,
        token: otp,
      });
      if (error) {
        alert(error.message);
      } else {
        setIsOtpVerified(true);
      }
    },
  });

  const setNicknameMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.updateUser({
        data: { nickname: nickname },
      });
      if (error) {
        alert(error.message);
      } else {
        alert("닉네임이 성공적으로 설정되었습니다.");
        router.push('/')
      }
    },
  });

  const handleNicknameSubmit = () => {
    if (nickname.length < 4 || nickname.length > 10) {
      setResponseMessage("닉네임은 4자 이상 10자 이하로 입력해주세요.");
      return;
    }
    setNicknameMutation.mutate();
  };

  return (
    <div className="flex flex-col w-96">
      <div className="pt-8 pb-6 px-10 w-full flex flex-col items-center justify-center max-w-3xl bg-white gap-2 rounded-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          회원가입
        </h2>
        {isOtpVerified ? (
          <>
            <Input
              id="nickname-input"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              label="닉네임"
              type="text"
              className="w-full rounded-sm"
              placeholder="닉네임을 입력해주세요"
            />
            <div className="flex gap-2">
              <Button
                className="mt-2"
                onClick={handleNicknameSubmit}
                loading={setNicknameMutation.isPending}
                disabled={setNicknameMutation.isPending}
              >
                닉네임 설정
              </Button>
              <Button
                className="mt-2"
                onClick={() => {
                  setNickname(""); // 취소할 경우 닉네임 입력 초기화
                  setResponseMessage(""); // 메시지 초기화
                }}
              >
                취소
              </Button>
            </div>
            {responseMessage && (
              <p className="mt-2 text-center text-red-500">{responseMessage}</p>
            )}
          </>
        ) : confirmationRequired ? (
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

        {!isOtpVerified && (
          <Button
            className="mt-2"
            onClick={() => {
              if (confirmationRequired) {
                verifyOtpMutation.mutate();
              } else {
                signupMutation.mutate();
              }
            }}
            loading={
              confirmationRequired
                ? verifyOtpMutation.isPending
                : signupMutation.isPending
            }
            disabled={
              confirmationRequired
                ? verifyOtpMutation.isPending
                : signupMutation.isPending
            }
          >
            {confirmationRequired ? "인증하기" : "가입하기"}
          </Button>
        )}
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