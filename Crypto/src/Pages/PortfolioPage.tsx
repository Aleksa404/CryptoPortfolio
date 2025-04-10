import { useEffect, useState } from "react";
import axios from "../axios";
import Spinner from "../Components/Spinner";
import PortfolioCoin from "../Components/PortfolioCoin";
interface Result {
  coins: PortfolioItem[];
  totalValue: number;
}
interface PortfolioItem {
  id: number;
  coinName: string;
  symbol: string;
  numOfCoins: number;
  price: number;
  balance: number;
  marketCap: number;
}

const PortfolioPage = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get<Result>("/portfolio").then((res) => {
      console.log(res.data);
      setPortfolio(res.data.coins);
      setTotalValue(res.data.totalValue);
      setIsLoading(false);
    });

    //console.log(portfolio);
  }, []);

  const removeCoin = async (id: number, amount: number) => {};

  return (
    <>
      {!isLoading ? (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
              My Portfolio
            </h1>
            <div className="text-center text-lg text-gray-700 mb-10">
              Total Value:{" "}
              <span className="font-semibold text-green-600">
                ${totalValue.toFixed(2)}
              </span>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {portfolio.map((item) => (
                <PortfolioCoin
                  key={item.id}
                  coin={item}
                  //removeCoin={() => removeCoin(item.id, item.numOfCoins)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default PortfolioPage;

{
  /* <>
{!isLoading ? (
  <div className="p-4 ">
    <h1 className="text-5xl mb-10 flex justify-center">My Portfolio</h1>
    <h2 className="text-md">Total value: ${totalValue}</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4  border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <>
        {portfolio.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded border-gray-300   shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-center items-center"
          >
            <h2 className="text-xl font-bold mb-2">
              {item.coinName} ({item.symbol})
            </h2>
            <p>Amount: {item.numOfCoins}</p>
            <p>Current Price: ${item.price}</p>
            <p>Total: ${item.balance}</p>
          </div>
        ))}
      </>
    </div>
  </div>
) : (
  <Spinner />
)}
</> */
}
