import React, { useEffect, useState } from "react";
import axios from "axios";

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

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchCoins = async () => {
        const res = await axios.get<CoinResponse>(
          `http://localhost:5270/api/Coin/all?page=${page}&search=${search}`
        );
        console.log(search);
        setCoins(res.data.coins);
        setTotalPages(res.data.totalPages);
      };
      fetchCoins();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [page, search]);

  const handleAdd = async (coinId: string) => {
    await axios.post("/api/portfolio", { coinId });
  };

  return (
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
            key={coin.id}
            className="border p-2 rounded flex align-center flex-col justify-center"
          >
            <h2 className="text-lg font-semibold mb-2 justify-center flex items-center">
              {coin.name} <p className="uppercase">({coin.symbol})</p>
            </h2>
            <p className="justify-center flex">Price: ${coin.current_price}</p>
            <p className="justify-center flex">
              Market Cap: ${coin.market_cap}
            </p>
            <button
              className="bg-blue-500 text-white px-2 py-1 mt-2"
              onClick={() => handleAdd(coin.id)}
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
  );
};

export default Landing;
