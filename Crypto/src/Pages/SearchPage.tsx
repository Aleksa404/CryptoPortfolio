import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import CardList from "../Components/CardList/CardList";
import Navbar from "../Components/Navbar/Navbar";
import ListPortfolio from "../Components/Portfolio/ListPortfolio/ListPortfolio";
import Search from "../Components/Search/Search";
import { searchCoin } from "../api";
import { coinSearch } from "../Coins";
import { SearchContext, SearchResultContext } from "../Context";

interface Props {}

function SearchPage({}: Props) {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<coinSearch[]>([]);
  const [serverError, setServerError] = useState<string>("");

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    const exist = portfolioValues.find((val) => val === e.target[0].value);
    if (exist) return;
    const updatedPortfolio = [...portfolioValues, e.target[0].value];
    setPortfolioValues(updatedPortfolio);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    //console.log(e);
  };

  const onPortfolioDelte = (e: any) => {
    e.preventDefault();
    const filtered = portfolioValues.filter((val) => {
      return val !== e.target[0].value;
    });
    setPortfolioValues(filtered);
  };

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCoin(search);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result?.data)) {
      setSearchResults(result.data);
      setServerError("");
    } else setSearchResults([]);
    console.log(searchResults);
  };

  return (
    <>
      <div>
        <Search
          onSearchSubmit={onSearchSubmit}
          search={search}
          handleSearchChange={handleSearchChange}
        />
        <ListPortfolio
          portfolioValues={portfolioValues}
          onPortfolioDelete={onPortfolioDelte}
        />
        <CardList
          searchResults={searchResults}
          onPortfolioCreate={onPortfolioCreate}
        />
        {/* <SearchResultContext.Provider value={searchResults}>
          <CardList />
        </SearchResultContext.Provider> */}

        {serverError && <h1>API Error</h1>}
      </div>
    </>
  );
}

export default SearchPage;
