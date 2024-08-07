import { fetchExchangeById } from "actions/exchange-actions";
import UI from "./ui";
import { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  const exchange = await fetchExchangeById(params.id);

  return {
    title: {
      template: `${exchange.title} | 교환 게시물 수정 페이지`,
      default: "교환 게시물 수정 페이지",
    },
    description: exchange.description || "교환 게시물 수정 페이지입니다.",
  };
}

export default async function page({ params }) {
  const exchange = await fetchExchangeById(params.id);

  return (
    <section className="p-10">
      <UI exchangeData={exchange}></UI>
    </section>
  );
}
