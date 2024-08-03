
import { fetchExchangeById } from "actions/exchange-actions";
import UI from "./ui"

export default async function page({params}) {
    const exchange = await fetchExchangeById(params.id);
    console.log(exchange)
  return (
    <UI exchangeData={exchange}>
      
    </UI>
  )
}
