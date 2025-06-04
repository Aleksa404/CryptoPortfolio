export interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
}

export interface CoinResponse {
  coins: Coin[];
  totalPages: number;
}

export interface CoinProfileFull {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_percentage_24h: number;
  image_url: string;
  description: string;
}

export interface coinProfile {
  coinName: string;
  price: number;
  symbol: string;
  marketCap: number;
}

export interface PortfolioItem {
  id: number;
  coinName: string;
  symbol: string;
  numOfCoins: number;
  price: number;
  balance: number;
  marketCap: number;
}

export interface PortfolioPageResult {
  coins: PortfolioItem[];
  totalValue: number;
}
export interface PriceAlert {
  coinId: string;
  targetPrice: number;
  email: string;
}
