import React from "react";
import { Link } from "react-router-dom";
//import logo from "./logo.png";
import "./Navbar.css";

//import { useAuth } from "../../Context/useAuth";

interface Props {}

const Navbar = (props: Props) => {
  // const { isLoggedIn, user, logout } = useAuth();
  return (
    <nav className="relative container mx-auto p-2">
      <div className="flex items-center justify-between">
        <div className="flex w-50 justify-between">
          <Link to="/">
            <p>Home</p>
          </Link>
          <div className=" font-bold lg:flex">
            <Link to="/portfolio" className="text-black hover:text-darkBlue ">
              My Portfolio
            </Link>
          </div>
        </div>
        <div className=" lg:flex items-center space-x-6 text-back justify-end">
          <Link to="/login" className="hover:text-darkBlue">
            Login
          </Link>
          <Link
            to="/register"
            className="px-8 py-3 font-bold rounded text-black bg-lightGreen hover:opacity-70"
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
