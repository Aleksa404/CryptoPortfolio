import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import { Toaster } from "react-hot-toast";

// Get token from localStorage or cookie
//const token = localStorage.getItem("token");

function App() {
  return (
    <>
      <Toaster />
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
