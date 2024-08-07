import { Metadata } from "next";
import UI from "./ui";
import { fetchExchangeById } from "actions/exchange-actions";

export async function generateMetadata({ params }): Promise<Metadata> {
  const exchange = await fetchExchangeById(params.id);

  return {
    title: {
      template: `${exchange.title} | 교환 상세 정보 페이지`,
      default: "교환 상세 정보 페이지",
    },
    description: exchange.description || "교환 상세 정보 페이지입니다.",
  };
}

export default async function ExchangeDetailPage({ params }) {
  return (
    <section>
      <UI params={params} />
    </section>
  );
}
