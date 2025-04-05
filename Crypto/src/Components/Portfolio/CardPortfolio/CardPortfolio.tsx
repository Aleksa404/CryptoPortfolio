import React, { SyntheticEvent } from "react";
import DeletePortfolio from "../DeletePortfolio/DeletePortfolio";
import { Link } from "react-router-dom";

interface Props {
  portfolioValue: string;
  onPortfolioDelete: (e: SyntheticEvent) => void;
}

function CardPortfolio({ portfolioValue, onPortfolioDelete }: Props) {
  return (
    <>
      <Link to={`../coin/${portfolioValue}`}>{portfolioValue}</Link>
      <DeletePortfolio
        onPortfolioDelete={onPortfolioDelete}
        portfolioValue={portfolioValue}
      />
    </>
  );
}

export default CardPortfolio;
