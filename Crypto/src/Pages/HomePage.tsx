import React from "react";
import Landing from "../Components/Landing";
import { useAuth } from "../Context/AuthContext";

interface Props {}

const HomePage = ({}: Props) => {
  const { isLoggedIn } = useAuth();
  return <>{isLoggedIn ? <Landing /> : <div>home</div>}</>;
};

export default HomePage;
