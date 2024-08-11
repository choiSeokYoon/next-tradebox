import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchExchangesByCategoryAndSearch } from "actions/exchange-actions";
import { createNickname } from "actions/user-actions";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { userInfoState } from "recoil/atoms";


export const useFetchUserExchangeItemList = (userId) => {
    return useQuery({
      queryKey: ["get_userExchangeItemList", userId],
      queryFn: () => fetchExchangesByCategoryAndSearch(null, "", userId)
    })
  }

export const useUpdateNickname = () => {
  const setUserInfo = useSetRecoilState(userInfoState);

  return useMutation({
    mutationFn: createNickname,
    onSuccess: (data, variables) => {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        nickname: variables,
      }));
    },
    onError: (error) => {
        console.error("업데이트 중 오류 발생:", error);
        toast.error("업데이트 중 오류가 발생했습니다. 다시 시도해 주세요.");
      },
  });
};