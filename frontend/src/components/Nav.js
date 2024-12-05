import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Controle do menu mobile
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="logo.png" alt="logo" className="h-10 w-10 mr-2" />
          <span className="text-xl font-bold">E-comn</span>
        </Link>

        {/* Botão do Menu Hambúrguer */}
        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden text-gray-400 hover:text-white focus:outline-none"
        >
          <i className="fas fa-bars text-2xl"></i>
        </button>

        {/* Menu Principal - Desktop */}
        <div className="hidden lg:flex items-center space-x-6 text-sm">
          {auth ? (
            <>
              <Link
                to="/"
                className="hover:text-gray-400 transition-colors duration-200"
              >
                Products
              </Link>
              <Link
                to="/add"
                className="hover:text-gray-400 transition-colors duration-200"
              >
                Add Products
              </Link>
              <button
                onClick={logout}
                className="hover:text-gray-400 transition-colors duration-200"
              >
                Logout ({JSON.parse(auth).name})
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="hover:text-gray-400 transition-colors duration-200"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="hover:text-gray-400 transition-colors duration-200"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Menu Lateral - Mobile */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="fixed right-0 top-0 h-auto w-64 bg-gray-800 text-white shadow-lg z-50 pb-6">
            <div className="flex justify-between items-center p-4">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-gray-400 hover:text-white focus:outline-none"
              >
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>
            <ul className="mt-4 space-y-4 px-4">
              {auth ? (
                <>
                  <li>
                    <Link
                      to="/"
                      onClick={() => setMenuOpen(false)}
                      className="block hover:text-gray-400 transition-colors duration-200"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/add"
                      onClick={() => setMenuOpen(false)}
                      className="block hover:text-gray-400 transition-colors duration-200"
                    >
                      Add Products
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                      className="block hover:text-gray-400 transition-colors duration-200"
                    >
                      Logout ({JSON.parse(auth).name})
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/signup"
                      onClick={() => setMenuOpen(false)}
                      className="block hover:text-gray-400 transition-colors duration-200"
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="block hover:text-gray-400 transition-colors duration-200"
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
