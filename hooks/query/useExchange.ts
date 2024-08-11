import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createExchange,
  deleteExchange,
  fetchExchangeById,
  fetchExchangesByCategoryAndSearch,

  updateExchange,
} from "actions/exchange-actions";
import { queryClient } from "config/ReactQueryClientPorvider";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { searchState } from "recoil/atoms";

export const useFetchExchanges = (category) => {
  const searchInput = useRecoilValue(searchState);
  return useQuery({
    queryKey: ["get_exchanges", searchInput, category],
    queryFn: () => fetchExchangesByCategoryAndSearch(category, searchInput),
    refetchOnWindowFocus: false,
  });
};

export const useFetchExchangeItam = (params) => {
  return useQuery({
    queryKey: ["get_exchangeItem", params],
    queryFn: () => fetchExchangeById(params.id)
  })
}

export const useCreateExchange = (onSuccessCallback) => {
  return useMutation({
    mutationFn: createExchange,
    onSuccess: (data) => {
      onSuccessCallback(data);
      toast.success("성공적으로 생성 하셨습니다.");
      queryClient.invalidateQueries({
        queryKey: ["get_exchanges"],
      });
    },
    onError: (error) => {
      console.error("생성 중 오류 발생:", error);
      toast.error("생성 중 오류가 발생했습니다. 다시 시도해 주세요.");
    },
  });
};

export const useUpdateExchange = (exchangeId) => {
  const router = useRouter();
  return useMutation({
    mutationFn: updateExchange,
    onSuccess: () => {
      router.push(`/exchanges/${exchangeId}`);
      toast.success("성공적으로 업데이트 하셨습니다.");
      queryClient.invalidateQueries({
        queryKey: ["get_exchanges"],
      });
    },
    onError: (error) => {
      console.error("업데이트 중 오류 발생:", error);
      toast.error("업데이트 중 오류가 발생했습니다. 다시 시도해 주세요.");
    },
  });
};

export const useDeleteExchange = (exchangeId) => {
  const router = useRouter();

  return useMutation({
    mutationFn: () => deleteExchange(exchangeId),
    onSuccess: () => {
      router.push("/");
      queryClient.invalidateQueries({
        queryKey: ["get_exchanges"],
      });
    },
    onError: (error) => {
      console.error("삭제 중 오류 발생:", error);
      toast.error("삭제 중 오류가 발생했습니다. 다시 시도해 주세요.");
    },
  });
};
