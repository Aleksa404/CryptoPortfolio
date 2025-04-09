import React, { JSX, SyntheticEvent } from "react";

import { coinSearch } from "../../Coins";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  searchResult: coinSearch;
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

const Card: React.FC<Props> = ({
  searchResult,
  onPortfolioCreate,
  id,
}: Props): JSX.Element => {
  return (
    <div
      className="flex flex-col items-center justify-between w-full p-6 bg-slate-100 rounded-lg md:flex-row"
      key={id}
      id={id}
    >
      <Link
        to={`/coin/${searchResult.symbol}`}
        className="font-bold text-center text-emerald-800 md:text-left"
      >
        {searchResult.coinName}
      </Link>
      <h2 className="font-bold text-center text-emerald-800 md:text-left">
        {searchResult.symbol}
      </h2>
      <p>{searchResult.price}</p>
      <p>Market Cap is {searchResult.marketCap}</p>
      <AddPortfolio
        onPortfolioCreate={onPortfolioCreate}
        symbol={searchResult.symbol}
      />
    </div>
  );
};

export default Card;
