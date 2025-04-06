import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/Card/Card";
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

  useEffect(() => {
    axios.get<Result>("http://localhost:5270/api/portfolio").then((res) => {
      console.log(res.data);
      setPortfolio(res.data.coins);
      setTotalValue(res.data.totalValue);
    });

    console.log(portfolio);
  }, []);

  return (
    <>
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
    </>
  );
};

export default PortfolioPage;
