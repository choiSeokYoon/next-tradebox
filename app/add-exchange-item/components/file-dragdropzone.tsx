"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { useUploadFile } from "hooks/query/useUploadFile";

export default function FileDragdropZone({ exchangeId }) {
  const fileRef = useRef(null);
  const uploadMutation = useUploadFile(exchangeId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      uploadMutation.mutate(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className="w-full py-20 border-4 border-gray-500 flex flex-col items-center justify-center">
        <input ref={fileRef} type="file" />
      </div>
      <div className="flex justify-end w-full mt-4 space-x-2">
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          disabled={uploadMutation.isPending}
        >
          {uploadMutation.isPending ? "업로드 중..." : "이미지 업로드"}
        </button>
        <Link href={"/"}>
          <button
            type="button"
            className="bg-gray-700 text-white font-bold py-2 px-4 rounded hover:bg-gray-900 transition duration-200"
          >
            이미지 취소
          </button>
        </Link>
      </div>
    </form>
  );
}
