import { useMutation } from "@tanstack/react-query";
import { UploadFile } from "actions/storageActions";
import { useRouter } from "next/navigation";

export const useUploadFile = (exchangeId) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (formData:FormData) => UploadFile(formData, exchangeId),
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      alert(error);
    },
  });
};

