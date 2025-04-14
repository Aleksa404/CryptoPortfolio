import React from "react";
import Landing from "../Components/Landing";
import { useAuth } from "../Context/AuthContext";
import CoinProfile from "../Components/CoinProfile";
import LoginPage from "./LoginPage";

interface Props {}

const CoinPage = ({}: Props) => {
  const { isLoggedIn } = useAuth();
  return <>{isLoggedIn ? <CoinProfile /> : <LoginPage />}</>;
};

export default CoinPage;
