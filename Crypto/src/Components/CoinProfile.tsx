import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from "../Components/Spinner";
import axios from "../axios";
import { formatLargeMonetaryNumber } from "../Services/NumberFormatService";

interface CoinProfile {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_percentage_24h: number;
  image_url: string;
  description: string;
}

const CoinPage = () => {
  //
  const { id } = useParams();
  const [coin, setCoin] = useState<CoinProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCoin = async () => {
      try {
        const res = await axios.get<CoinProfile>(`Coin/coinProfile/${id}`);
        setCoin(res.data);
      } catch (err) {
        console.error("Failed to fetch coin data", err);
      } finally {
        setIsLoading(false);
      }
    };
    getCoin();
  }, []);

  if (isLoading) return <Spinner />;
  if (!coin)
    return (
      <div className="text-center mt-10 text-red-500 font-semibold">
        Coin not found.
      </div>
    );

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-4 mb-6">
            <img src={coin.image_url} alt={coin.name} className="w-16 h-16" />
            <h1 className="text-3xl font-bold text-gray-800">
              {coin.name}{" "}
              <span className="uppercase text-gray-500">({coin.symbol})</span>
            </h1>
          </div>

          <p className="text-gray-600 mb-6">{coin.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800">
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Current Price</p>
              <p className="text-xl font-semibold text-blue-600">
                ${coin.current_price}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Market Cap</p>
              <p className="text-xl font-semibold text-green-600">
                {formatLargeMonetaryNumber(coin.market_cap)}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">24h High</p>
              <p className="text-xl font-semibold">${coin.high_24h}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">24h Low</p>
              <p className="text-xl font-semibold">${coin.low_24h}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">24h Change</p>
              <p
                className={`text-xl font-semibold ${
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {coin.price_change_percentage_24h}%
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Total Volume</p>
              <p className="text-xl font-semibold">
                {formatLargeMonetaryNumber(coin.total_volume)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoinPage;
