import React, { JSX, SyntheticEvent } from "react";
import Card from "../Card/Card";
import { coinSearch } from "../../Coins";
import { v4 as uuidv4 } from "uuid";

interface Props {
  searchResults: coinSearch[];
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

const CardList: React.FC<Props> = ({
  searchResults,
  onPortfolioCreate,
}: Props): JSX.Element => {
  return (
    <div>
      {searchResults.length > 0 ? (
        searchResults.map((result) => {
          return (
            <Card
              id={result.symbol}
              key={uuidv4()}
              searchResult={result}
              onPortfolioCreate={onPortfolioCreate}
            />
          );
        })
      ) : (
        <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-x1">
          No result
        </p>
      )}
    </div>
  );
};

export default CardList;
