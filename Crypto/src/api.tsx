import axios from "./axios";

import { coinProfile, coinSearch } from "./Models/CoinModel";
import { handleError } from "./Services/HandleErrorService";

interface SearchResponse {
  data: coinSearch[];
}

//const [data, setData] = useState<SearchResponse | null>(null);
//const [error, setError] = useState<string | null>(null);

export const searchCoin = async (query: string) => {
  try {
    const data = await axios.get<SearchResponse>(`/Coin?CoinName=${query}`);
    return data;
  } catch (err) {
    handleError(err);
  }
};

export const getCoinProfile = async (query: string) => {
  try {
    const data = await axios.get<coinProfile[]>(`/Coin?CoinName=${query}`);
    return data;
  } catch (err) {
    handleError(err);
  }
};
