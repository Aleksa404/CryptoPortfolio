import { useEffect, useState } from "react";
import axios from "../axios";
import Spinner from "../Components/Spinner";
import PortfolioCoin from "../Components/PortfolioCoin";
import { formatLargeMonetaryNumber } from "../Services/NumberFormatService";
import { useAuth } from "@/Context/AuthContext";
import { PortfolioItem, PortfolioPageResult } from "@/Models/CoinModel";
import { getPortfolio } from "@/api";
import { handleError } from "@/Services/HandleErrorService";

const PortfolioPage = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const getPort = async () => {
      try {
        const res = await getPortfolio();
        setPortfolio(res.coins);
        setTotalValue(res.totalValue);
        setIsLoading(false);
      } catch (err) {
        handleError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getPort();
  }, []);

  const handleUpdateItem = (updatedItem: any) => {
    // Update the state in the parent when the child changes it
    setPortfolio((prevPortfolio) =>
      prevPortfolio.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  const removeCoin = (updatedItem: any) => {
    setPortfolio((prevPortfolio) =>
      prevPortfolio.filter((item) => item.id !== updatedItem.id)
    );
  };

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
                {formatLargeMonetaryNumber(totalValue.toFixed(2))}
              </span>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {portfolio.map((item) => (
                <PortfolioCoin
                  key={item.id}
                  coin={item}
                  onRemove={removeCoin}
                  onUpdate={handleUpdateItem}
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
