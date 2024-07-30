"use client";

import Image from "next/image";
import { useRecoilValue } from "recoil";
import { userEmailState } from "recoil/atoms";

export default function UI({ exchangeProduct }) {
    const userEmail = useRecoilValue(userEmailState);
    const imageUrl = exchangeProduct.exchange_images?.[0]?.image_url;

    return (
        <div className="w-full pt-4 pl-64 pr-64 flex flex-col pb-10">
            <div className="flex items-center justify-center">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt="교환 물건 이미지"
                        width={500}
                        height={500}
                        className="rounded-lg"
                    />
                ) : (
                    <Image
                        src={"/images/image-not-found.png"}
                        width={500}
                        height={500}
                        alt={"교환 물건 이미지"}
                        className="rounded-lg"
                    />
                )}
            </div>

            <ul className="space-y-2 pt-10">
                <li className="text-lg font-semibold text-gray-800">
                    {exchangeProduct.title}
                </li>
                <li className="text-gray-600">
                    <p>{exchangeProduct.created_at}</p>
                    <p>{exchangeProduct.location}</p>
                </li>
                <li className="text-gray-600">{exchangeProduct.category}</li>
                <li className="text-gray-600">{exchangeProduct.item_condition}</li>
                <li>
                    <div
                        className="w-full h-48 overflow-y-auto p-4"
                        style={{
                            overflowWrap: "break-word",
                            wordWrap: "break-word",
                            wordBreak: "break-word",
                            whiteSpace: "pre-wrap",
                        }}
                    >
                        {exchangeProduct.description}
                    </div>
                </li>
            </ul>
            {userEmail === exchangeProduct.user_id && (
                <div className="flex space-x-4 pt-4 justify-end">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">업데이트</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded">삭제</button>
                </div>
            )}
        </div>
    );
}
