import { getExchange } from "actions/exchange-actions";
import UI from "./ui";

export default async function Page({ params }) {
  const exchange = await getExchange(params.id);

  return (
    <main>
      {exchange ? (
        <UI exchangeProduct={exchange} />
      ) : (
        <div>존재하지 않는 게시물입니다.</div>
      )}
    </main>
    
  );
}