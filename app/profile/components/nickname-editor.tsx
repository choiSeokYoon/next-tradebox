import { useRecoilValue } from "recoil";
import { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { userInfoState } from "recoil/atoms";
import { useUpdateNickname } from "hooks/query/useUser";
import LogoutButton from "components/logout-button";
import { toast } from "react-toastify";

export default function NickNameEditor() {
  const userInfo = useRecoilValue(userInfoState);
  const [newNickname, setNewNickname] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const updateNicknameMutation = useUpdateNickname();

  const handleChangeNickname = async () => {
    if (newNickname.length < 4 || newNickname.length > 10) {
      setResponseMessage("닉네임은 4자 이상 10자 이하로 입력해주세요.");
      return;
    }

    updateNicknameMutation.mutate(newNickname, {
      onSuccess: () => {
        setIsEditing(false);
        toast.success("닉네임이 성공적으로 변경되었습니다.")
      },
      onError: () => {
        toast.error("닉네임 변경에 실패했습니다. 다시 시도해주세요.")
      },
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewNickname(userInfo.nickname);
    setResponseMessage("");
  };
  return (
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
          />
          <div className="flex justify-end gap-5 mt-2">
            <Button
              className="mt-2"
              onClick={handleChangeNickname}
              disabled={updateNicknameMutation.isPending}
            >
              {updateNicknameMutation.isPending ? "변경 중..." : "변경하기"}
            </Button>
            <Button color="red" className="mt-2" onClick={handleCancelEdit}>
              취소
            </Button>
          </div>
        </>
      ) : (
        <div className="flex justify-center">
          <Button
            className="mt-2 w-36 flex justify-center"
            variant="outlined"
            onClick={() => {
              setNewNickname(userInfo.nickname);
              setIsEditing(true);
            }}
          >
            닉네임 변경
          </Button>
        </div>
      )}
      {responseMessage && (
        <p className="mt-2 text-center text-red-500">{responseMessage}</p>
      )}
      <div className="lg:hidden flex justify-end">
        <LogoutButton>로그아웃</LogoutButton>
      </div>
    </div>
  );
}
