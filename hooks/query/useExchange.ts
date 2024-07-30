import { useMutation, useQuery } from "@tanstack/react-query";
import { createExchange, deleteExchange, searchExchanges } from "actions/exchange-actions";
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
