import React from "react";
import Landing from "../Components/Landing";
import { useAuth } from "../Context/AuthContext";
import CoinProfile from "../Components/CoinProfile";

interface Props {}

const CoinPage = ({}: Props) => {
  const { isLoggedIn } = useAuth();
  return <>{isLoggedIn ? <CoinProfile /> : <div>CoinProfile</div>}</>;
};

export default CoinPage;
