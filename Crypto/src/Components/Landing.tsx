import { useEffect, useState } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { formatLargeMonetaryNumber } from "../Services/NumberFormatService";
import toast from "react-hot-toast";
import { Coin } from "@/Models/CoinModel";

import { getAllCoins } from "@/api";

const Landing = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [coinAmount, setCoinAmount] = useState<number>(1); // Default amount to add

  useEffect(() => {
    setIsLoading(true);
    const delayDebounce = setTimeout(() => {
      const fetchCoins = async () => {
        const res = await getAllCoins(page, search);
        console.log(search);
        setCoins(res.coins);
        setTotalPages(res.totalPages);
        setIsLoading(false);
      };
      fetchCoins();
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [page, search]);

  const handleAdd = async (name: string, numOfCoins: number) => {
    try {
      console.log(name, numOfCoins);
      await axios.post(
        `/portfolio/addPortfolio?name=${name}&numOfCoins=${numOfCoins}`
      );
      toast.success(`${numOfCoins} ${name} added to portfolio!`);
    } catch (error) {
      console.error("Error adding to portfolio:", error);
      toast.error("Failed to add coin to portfolio.");
    }
  };

  const openModal = (coin: Coin) => {
    setSelectedCoin(coin);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCoin(null);
  };

  const handleConfirmAdd = () => {
    if (selectedCoin) {
      handleAdd(selectedCoin.name, coinAmount);
      closeModal();
    }
  };

  return (
    <>
      <div className=" bg-gray-100 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search coin..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      {!isLoading ? (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
              Explore Coins
            </h1>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {coins.map((coin) => (
                <div
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-200"
                  key={coin.id}
                >
                  <Link to={`/coin/${coin.name}`} className="block mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {coin.name}{" "}
                      <span className="uppercase text-gray-500">
                        ({coin.symbol})
                      </span>
                    </h2>
                    <p className="text-gray-700 mt-2">
                      Price:{" "}
                      <span className="text-blue-600 font-medium">
                        ${coin.current_price}
                      </span>
                    </p>
                    <p className="text-gray-700">
                      Market Cap:{" "}
                      <span className="font-semibold text-green-600">
                        {formatLargeMonetaryNumber(coin.market_cap)}
                      </span>
                    </p>
                  </Link>
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
                    onClick={() => openModal(coin)}
                  >
                    Add to Portfolio
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center items-center gap-4">
              <button
                className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                Prev
              </button>
              <span className="text-gray-700 font-medium">
                Page {page} / {totalPages}
              </span>
              <button
                className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
          <div className="max-w-6xl mx-auto">
            <Spinner />
          </div>
        </div>
      )}
      {isModalOpen && selectedCoin && (
        <div className="fixed inset-0 flex justify-center items-center  bg-opacity-50 z-50">
          {/* Modal Box */}
          <div className="bg-blue-300 p-6 rounded-lg  shadow-xl w-96 z-20">
            <h2 className="text-xl font-semibold mb-4">
              Add {selectedCoin.name} to Portfolio
            </h2>
            <div className="mb-4">
              <label htmlFor="coinAmount" className="block text-gray-700 mb-2">
                Amount
              </label>
              <input
                type="number"
                id="coinAmount"
                value={coinAmount}
                onChange={(e) => setCoinAmount(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                min="1"
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={closeModal} // Close modal without adding
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={handleConfirmAdd} // Confirm adding to portfolio
              >
                Add to Portfolio
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Landing;
