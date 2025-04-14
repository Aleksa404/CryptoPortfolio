import React from "react";
import Landing from "../Components/Landing";
import { useAuth } from "../Context/AuthContext";
import LoginPage from "./LoginPage";

interface Props {}

const HomePage = ({}: Props) => {
  const { isLoggedIn } = useAuth();
  return <>{isLoggedIn ? <Landing /> : <LoginPage />}</>;
};

export default HomePage;
