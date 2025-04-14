export interface coinSearch {
  id: number;
  coinName: string;
  price: number;
  symbol: string;
  marketCap: number;
}
export interface coinProfile {
  coinName: string;
  price: number;
  symbol: string;
  marketCap: number;
}
export interface Comment {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  text: string;
  createdAt: string;
}
