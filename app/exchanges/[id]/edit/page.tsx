import { fetchExchangeById } from "actions/exchange-actions";
import UI from "./ui";

export default async function page({ params }) {
  const exchange = await fetchExchangeById(params.id);

  return (
    <section className="p-10">
      <UI exchangeData={exchange}></UI>
    </section>
  );
}
