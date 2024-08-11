import { useMutation } from "@tanstack/react-query";
import { UploadFile } from "actions/storage-actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useUploadFile = (exchangeId) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (formData:FormData) => UploadFile(formData, exchangeId),
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      console.error("업로드 중 오류 발생:", error);
      toast.error("업로드 중 오류가 발생했습니다. 다시 시도해 주세요.");
    },
  });
};

