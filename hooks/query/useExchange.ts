import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createExchange,
  deleteExchange,
  getExchange,
  searchExchanges,
  updateExchange,
} from "actions/exchange-actions";
import { queryClient } from "config/ReactQueryClientPorvider";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { searchState } from "recoil/atoms";

export const useFetchExchanges = () => {
  const searchInput = useRecoilValue(searchState);

  return useQuery({
    queryKey: ["get_exchanges", searchInput],
    queryFn: () => searchExchanges({ searchInput }),
  });
};

export const useFetchExchangeItam = (params) => {
  return useQuery({
    queryKey: ["get_exchangeItem", params],
    queryFn: () => getExchange(params.id)
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
