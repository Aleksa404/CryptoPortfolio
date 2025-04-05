import { useEffect, useState } from "react";
import axios from "axios";

interface PortfolioItem {
  id: number;
  name: string;
  symbol: string;
  amount: number;
  price: number;
  total: number;
}

const PortfolioPage = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    //TODO: Replace with actual token retrieval logic
    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImludmVzdG9yQGV4YW1wbGUuY29tIiwiZ2l2ZW5fbmFtZSI6ImludmVzdG9yIiwibmJmIjoxNzQzODE2OTAzLCJleHAiOjE3NDQ0MjE3MDMsImlhdCI6MTc0MzgxNjkwMywiaXNzIjoiaHR0cDovbG9jYWxob3N0OjUwNjciLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwNjcifQ.XR-_HvKnJWGIWviezhbCzpQoYuzhmyymP-IWBLwGtZo";
    axios
      .get<PortfolioItem[]>("http://localhost:5270/api/portfolio", {
        headers: {
          Authorization: `Bearer ${token}`, // replace `token` with your actual JWT
        },
      })
      .then((res) => setPortfolio(res.data));
    console.log(portfolio);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">My Portfolio</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {portfolio.map((item) => (
          <div key={item.id} className="border p-2 rounded">
            <h2>
              {item.name} ({item.symbol})
            </h2>
            <p>Amount: {item.amount}</p>
            <p>Current Price: ${item.price}</p>
            <p>Total: ${item.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioPage;
