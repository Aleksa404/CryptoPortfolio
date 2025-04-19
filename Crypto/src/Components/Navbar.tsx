import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

interface Props {}

const Navbar = (props: Props) => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="relative container mx-auto p-2">
      <div className="flex items-center justify-between">
        <div className="flex w-50 justify-between">
          <Link to="/">
            <p>Home</p>
          </Link>
          {isLoggedIn && (
            <div className=" font-bold lg:flex">
              <Link to="/portfolio" className="text-black hover:text-darkBlue ">
                My Portfolio
              </Link>
            </div>
          )}
        </div>
        <div className="lg:flex items-center space-x-6 text-back justify-end">
          {!isLoggedIn ? (
            <div>
              <Link to="/login" className="hover:text-darkBlue">
                Login
              </Link>
              <Link
                to="/register"
                className="px-8 py-3 font-bold rounded text-black bg-lightGreen hover:opacity-70"
              >
                Register
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/profile" className="hover:text-darkBlue">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-8 py-3 font-bold rounded text-black bg-lightGreen hover:opacity-70"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
