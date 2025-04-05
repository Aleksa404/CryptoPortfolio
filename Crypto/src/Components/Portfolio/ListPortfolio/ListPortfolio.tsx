import React, { SyntheticEvent } from "react";
import CardPortfolio from "../CardPortfolio/CardPortfolio";
import { v4 as uuidv4 } from "uuid";
//import './ListPortfolio.css'

interface Props {
  portfolioValues: string[];
  onPortfolioDelete: (e: SyntheticEvent) => void;
}

const ListPortfolio = ({ portfolioValues, onPortfolioDelete }: Props) => {
  return (
    <>
      <h3 className="text-3xl font-bold underline">My Portfolio</h3>
      <ul>
        {portfolioValues &&
          portfolioValues.map((portfolioValue) => {
            return (
              <CardPortfolio
                key={uuidv4()}
                portfolioValue={portfolioValue}
                onPortfolioDelete={onPortfolioDelete}
              />
            );
          })}
      </ul>
    </>
  );
};

export default ListPortfolio;
