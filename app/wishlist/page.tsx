import { Metadata } from "next";
import UI from "./ui";


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "관심 목록 | 나의 관심 목록",
    description: "관심있는 게시물의 목록을 보여주는 페이지 입니다.",
    robots: "noindex, nofollow",
  };
}

export default function WishlistPage() {
  return <UI />;
}
