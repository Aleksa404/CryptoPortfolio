import React, { useEffect, useState } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { formatLargeMonetaryNumber } from "../Services/NumberFormatService";
import toast from "react-hot-toast";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
}

interface CoinResponse {
  coins: Coin[];
  totalPages: number;
}

const Landing = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const delayDebounce = setTimeout(() => {
      const fetchCoins = async () => {
        const res = await axios.get<CoinResponse>(
          `/Coin/all?page=${page}&search=${search}`
        );
        console.log(search);
        setCoins(res.data.coins);
        setTotalPages(res.data.totalPages);
        setIsLoading(false);
      };
      fetchCoins();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [page, search]);

  const handleAdd = async (name: string, numOfCoins: number) => {
    try {
      console.log(name, numOfCoins);
      await axios.post(
        `/portfolio/addPortfolio?name=${name}&numOfCoins=${numOfCoins}`
      );
      toast.success("Coin added to portfolio!");
    } catch (error) {
      console.error("Error adding to portfolio:", error);
      toast.error("Failed to add coin to portfolio.");
    }
  };

  const handleClick = (coin: Coin) => {
    window.location.href = `/coin/${coin.id}`;
  };

  return (
    <>
      {!isLoading ? (
        <div className="p-4">
          <input
            type="text"
            placeholder="Search coin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 mb-4 w-full"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {coins.map((coin) => (
              <div
                className="flex flex-col items-center border-1 backdrop-blur-2xl border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-zinc-200"
                key={coin.id}
              >
                <Link
                  to={`/coin/${coin.name}`}
                  key={coin.id}
                  className="border  rounded flex align-center flex-col justify-center border-gray-300  p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <h2 className="text-lg font-semibold mb-2 justify-center flex items-center">
                    {coin.name} <p className="uppercase">({coin.symbol})</p>
                  </h2>
                  <p className="justify-center flex">
                    Price: ${coin.current_price}
                  </p>
                  <p className="justify-center flex">
                    Market Cap: {formatLargeMonetaryNumber(coin.market_cap)}
                  </p>
                </Link>
                <button
                  className="bg-blue-500 text-white px-2 py-1 mt-2 rounded"
                  onClick={() => handleAdd(coin.name, 1)}
                >
                  Add to Portfolio
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2 justify-center">
            <button
              className="bg-blue-950 text-white  px-2 py-1 mt-2"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>
            <span className="flex items-center justify-center px-2 py-1 mt-2">
              Page {page} / {totalPages}
            </span>
            <button
              className="bg-blue-950 text-white  px-2 py-1 mt-2"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Landing;
