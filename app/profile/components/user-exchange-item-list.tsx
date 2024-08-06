import ExchangeProduct from "components/exchange-product";
import { useFetchUserExchangeItemList } from "hooks/query/useUser";
import { useRecoilValue } from "recoil";
import { userInfoState } from "recoil/atoms";


export default function UserExchangeItemList() {
    const userInfo = useRecoilValue(userInfoState);
    const {data: UserExchangeItamListQuery, isPending, isError, error} = useFetchUserExchangeItemList(userInfo.id);
  
    if (isPending) {
        return <p className="text-center text-gray-600 py-4">로딩 중...</p>;
      }
    
      if (!UserExchangeItamListQuery || UserExchangeItamListQuery.length === 0) {
        return <p className="text-center text-gray-600 py-4">유저 게시물이 비어 있습니다.</p>;
      }
    
      if (isError) return <p>에러가 발생했습니다: {error.message}</p>;
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {UserExchangeItamListQuery &&
          UserExchangeItamListQuery.map((product) => (
            <ExchangeProduct key={product.id} product={product} />
          ))}
      </div>
  )
}
