import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="logo.png" alt="logo" className="h-10 w-10 mr-2" />
          <span className="text-xl font-bold">E-comn</span>
        </Link>

        <div>
          {auth ? (
            <ul className="flex space-x-6 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-gray-400 transition-colors duration-200"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/add"
                  className="hover:text-gray-400 transition-colors duration-200"
                >
                  Add Products
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/update"
                  className="hover:text-gray-400 transition-colors duration-200"
                >
                  Update Products
                </Link>
              </li> */}
              {/* <li>
                <Link
                  to="/profile"
                  className="hover:text-gray-400 transition-colors duration-200"
                >
                  Profile
                </Link>
              </li> */}
              <li>
                <button
                  onClick={logout}
                  className="hover:text-gray-400 transition-colors duration-200"
                >
                  Logout ({JSON.parse(auth).name})
                </button>
              </li>
            </ul>
          ) : (
            <ul className="flex space-x-6 text-sm">
              <li>
                <Link
                  to="/signup"
                  className="hover:text-gray-400 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-gray-400 transition-colors duration-200"
                >
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
