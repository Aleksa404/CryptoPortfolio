import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";

import axios from "axios";

// Get token from localStorage or cookie
//const token = localStorage.getItem("token");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImludmVzdG9yQGV4YW1wbGUuY29tIiwiZ2l2ZW5fbmFtZSI6ImludmVzdG9yIiwibmJmIjoxNzQzODk1NDQ4LCJleHAiOjE3NDQ1MDAyNDgsImlhdCI6MTc0Mzg5NTQ0OCwiaXNzIjoiaHR0cDovbG9jYWxob3N0OjUwNjciLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwNjcifQ.0-v3zjr2G9f5J4u5sTAhP-JzcgQ6H29pm_OmaNrappM";

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
