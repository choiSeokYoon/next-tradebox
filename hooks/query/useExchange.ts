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
      queryClient.invalidateQueries({
        queryKey: ["get_exchanges"],
      });
    },
  });
};

export const useUpdateExchange = (onSuccessCallback) => {
  const router = useRouter();
  return useMutation({
    mutationFn: updateExchange,
    onSuccess: (data) => {
      router.push("/");
      onSuccessCallback(data);
      queryClient.invalidateQueries({
        queryKey: ["get_exchanges"],
      });
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
  });
};
