import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "../axios";

interface PortfolioItem {
  id: number;
  coinName: string;
  symbol: string;
  numOfCoins: number;
  price: number;
  balance: number;
  marketCap: number;
}
interface Props {
  coin: PortfolioItem;
  onRemove: (item: any) => void;
  onUpdate: (item: any) => void;
}

const PortfolioCoin = ({ coin, onRemove, onUpdate }: Props) => {
  const [amount, setAmount] = useState<number>(0);
  const [isChanged, setIsChanged] = useState(false);
  const [ammountToShow, setAmountToShow] = useState<number>(0);

  useEffect(() => {
    setAmountToShow(coin.numOfCoins);
    setIsChanged(false);
    console.log("isChanged:", isChanged);
  }, []);

  const removeCoin = async () => {
    try {
      console.log(isChanged);
      if (amount > coin.numOfCoins) {
        toast.error("Amount exceeds current holdings.");
        return;
      } else if (amount < 0) {
        toast.error("Invalid amount.");
        return;
      }
      if (amount == 0) {
        const res = await axios
          .delete(`/portfolio/DeleteCoin?name=${coin.coinName}`)
          .then((res) => {
            console.log(res.data);
            toast.success(`${coin.coinName} removed from portfolio!`);
            onRemove(coin);
          });
      } else {
        const res = await axios
          .delete(
            `/portfolio/DeleteAmountPortfolio?name=${coin.coinName}&amount=${amount}`
          )
          .then((res) => {
            console.log(res.data);
            toast.success(`${amount} ${coin.coinName} removed from portfolio!`);
            setAmountToShow(parseFloat((ammountToShow - amount).toFixed(5)));
            onUpdate(coin);
            console.log(isChanged);
          });
      }
    } catch (error) {
      console.error("Error removing coin:", error);
    }
  };

  return (
    <>
      {ammountToShow > 0 && (
        <div
          key={coin.id}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-200 justify-center items-center flex flex-col"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {coin.coinName}{" "}
            <span className="text-gray-500">({coin.symbol})</span>
          </h2>
          <p className="text-gray-700">
            Amount: <span className="font-medium">{ammountToShow}</span>
          </p>
          <p className="text-gray-700">
            Current Price:{" "}
            <span className="font-medium text-blue-600">${coin.price}</span>
          </p>
          <p className="text-gray-700">
            Total:{" "}
            <span className="font-semibold text-green-600">
              ${coin.balance.toFixed(2)}
            </span>
          </p>
          {/* <button className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
                    Remove All
                  </button> */}
          <div>
            <input
              type="number"
              className="mt-2 border border-gray-300 rounded-md px-2 py-1"
              placeholder="Amount to remove"
              // value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            ></input>
            <button
              onClick={removeCoin}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioCoin;
