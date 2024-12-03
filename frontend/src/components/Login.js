import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let result = await fetch("https://e-commerce-6ogd.onrender.com/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      result = await result.json();

      if (result.auth) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate("/");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-12 p-6 bg-gray-100 rounded-md shadow-md max-w-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Login
      </h1>

      {error && (
        <div className="mb-4 p-3 text-red-600 bg-red-100 border border-red-400 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <button
        type="button"
        className={`mt-6 w-full px-4 py-2 text-white rounded-md ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? <ClipLoader color="#ffffff" size={20} /> : "Login"}
      </button>
    </div>
  );
};

export default Login;