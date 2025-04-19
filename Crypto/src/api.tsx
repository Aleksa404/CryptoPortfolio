import axios from "./axios";
import {
  CoinProfileFull,
  CoinResponse,
  PortfolioItem,
  PortfolioPageResult,
} from "./Models/CoinModel";
import { PagginatedComments, Comment } from "./Models/CommentModel";

export async function getPortfolio() {
  const res = await axios.get<PortfolioPageResult>("/portfolio");
  return res.data;
}

export async function getAllCoins(page: number, search: string) {
  const res = await axios.get<CoinResponse>(
    `/Coin/all?page=${page}&search=${search}`
  );
  return res.data;
}

export async function getCoinProfile(id: string) {
  const res = await axios.get<CoinProfileFull>(`Coin/coinProfile/${id}`);
  return res.data;
}

export async function deleteCoin(coin: PortfolioItem) {
  const res = await axios.delete(`/portfolio/DeleteCoin?name=${coin.coinName}`);
  return res.data;
}
export async function deleteAmount(coin: PortfolioItem, amount: number) {
  const res = await axios.delete(
    `/portfolio/DeleteAmountPortfolio?name=${coin.coinName}&amount=${amount}`
  );
  return res.data;
}

export async function getComments(coinId: string, page: number) {
  const res = await axios.get<PagginatedComments>(
    `/comment/${coinId}?page=${page}`
  );
  return res.data;
}
export async function postComment(coinId: string, newComment: Comment) {
  const res = await axios.post<Comment>(`/comment/${coinId}`, newComment);
  return res.data;
}
