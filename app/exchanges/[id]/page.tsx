import { getExchange } from "actions/exchange-actions";
import UI from "./ui";

export default async function ExchangeDetailPage({ params }) {

  return (
    <main>
        <UI params={params} />
    </main>
    
  );
}