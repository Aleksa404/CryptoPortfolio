import axios from "axios";
import type { AxiosError } from "axios";

import { coinProfile, coinSearch } from "./Coins";

interface SearchResponse {
  data: coinSearch[];
}
const auth: string = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImludmVzdG9yQGV4YW1wbGUuY29tIiwiZ2l2ZW5fbmFtZSI6ImludmVzdG9yIiwibmJmIjoxNzQxOTA1MjQ3LCJleHAiOjE3NDI1MTAwNDcsImlhdCI6MTc0MTkwNTI0NywiaXNzIjoiaHR0cDovbG9jYWxob3N0OjUwNjciLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwNjcifQ.Ud6nqyfDQkYcLkp-xnIN0f4wl3Kb-IakJqLX9kSDQPs`;

//const [data, setData] = useState<SearchResponse | null>(null);
//const [error, setError] = useState<string | null>(null);

export const searchCoin = async (query: string) => {
  try {
    const data = await axios.get<SearchResponse>(
      `http://localhost:5270/api/Coin?Symbol=${query}`,
      {
        headers: {
          Authorization: auth,
        },
      }
    );
    return data;
  } catch (err) {
    const error = err as AxiosError;
    return error.message;
    // if(axios.isAxiosError(error)) {
    //     console.log(error.message);
    // }
    // else {
    //     console.log("unexpected error");
    // }
  }
};

export const getCoinProfile = async (query: string) => {
  try {
    const data = await axios.get<coinProfile[]>(
      `http://localhost:5270/api/Coin?Symbol=${query}`,
      {
        headers: {
          Authorization: auth,
        },
      }
    );
    return data;
  } catch (err) {
    const error = err as AxiosError;
    return error.message;
  }
};
