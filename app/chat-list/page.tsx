import { Metadata } from "next";
import UI from './ui'


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "채팅 리스트 | 나의 대화 목록",
    description: "안전하고 개인적인 공간에서 대화를 나누세요. 로그인하여 채팅 리스트를 확인하실 수 있습니다.",
    robots: "noindex, nofollow",
  };
}

export default function ChatList() {
  
  return (
    <div>
      <UI/>
    </div>
  )
}
