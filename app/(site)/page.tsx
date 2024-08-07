import { Metadata } from 'next';
import { createServerSupabaseClient } from "utils/supabase/server";
import UI from "./ui";

export const metadata: Metadata = {
  title: 'TradeBox',
  description: 'TradeBox 다양한 상품과 서비스를 손쉽게 교환할 수 있는 온라인 거래 플랫폼입니다.',
  openGraph: {
    title: "안정한 교환 거래 플랫폼",
    description: "회원들간의 안전하고 흥미로운 물품 교환. 지금 가입하세요!",
    images: [{ url: "" }],
  },
};


export default async function Home() {

  const supabase = await createServerSupabaseClient()
  const {data: {session}} = await supabase.auth.getSession()

  return (
    <UI session={session}/>
  );
}
