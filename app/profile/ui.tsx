"use client";

import { useRecoilState } from "recoil";
import { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { userInfoState } from "recoil/atoms";
import { createNickname } from "actions/user-actions";

export default function ChangeNickname() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [newNickname, setNewNickname] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChangeNickname = async () => {
    if (newNickname.length < 4 || newNickname.length > 10) {
      setResponseMessage("닉네임은 4자 이상 10자 이하로 입력해주세요.");
      return;
    }

    const result = await createNickname(newNickname);
    if (result.success) {
      setUserInfo((prev) => ({ ...prev, nickname: newNickname }));
      setIsEditing(false);
      setResponseMessage("닉네임이 성공적으로 변경되었습니다.");
    } else {
      setResponseMessage(`오류 발생: ${result.error}`);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewNickname(userInfo.nickname);
    setResponseMessage("");
  };

  return (
    <div className="p-10">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col gap-5">
        <p className="text-center text-gray-700">{userInfo.nickname}</p>
        {isEditing ? (
          <>
            <Input
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              label="새 닉네임"
              type="text"
              placeholder="새 닉네임을 입력해주세요"
              error={newNickname.length < 4 || newNickname.length > 10}
            />
            <div className="flex justify-end gap-5 mt-2">
              <Button className="mt-2" onClick={handleChangeNickname}>
                변경하기
              </Button>
              <Button className="mt-2" onClick={handleCancelEdit}>
                취소
              </Button>
            </div>
          </>
        ) : (
          <Button
            className="mt-2"
            onClick={() => {
              setNewNickname(userInfo.nickname);
              setIsEditing(true);
            }}
          >
            닉네임 변경
          </Button>
        )}
        {responseMessage && (
          <p className="mt-2 text-center text-red-500">{responseMessage}</p>
        )}
      </div>
    </div>
  );
}
