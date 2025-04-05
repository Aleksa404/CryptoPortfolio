import { createContext } from "react";
import { coinSearch } from "./Coins";

export const SearchContext = createContext<string | undefined>(undefined);
export const SearchResultContext = createContext<coinSearch[] | undefined>(
  undefined
);
