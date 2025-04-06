import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { coinProfile } from "../Coins";
import { getCoinProfile } from "../api";
import Sidebar from "../Components/Sidebar";
import CoinDashboard from "../Components/CoinDashboard";

interface Props {}

const CoinPage = (props: Props) => {
  let { ticker } = useParams();
  const [coin, setCoin] = useState<coinProfile>();

  useEffect(() => {
    const getCoin = async () => {
      const result = await getCoinProfile(ticker!);
      setCoin(result?.data);
      console.log(result?.data);
    };
    getCoin();
  }, []);

  return (
    <>
      <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
        <Sidebar />
        <CoinDashboard />
      </div>
    </>
  );
};

export default CoinPage;
