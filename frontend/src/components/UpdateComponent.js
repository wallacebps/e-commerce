import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
const API_URL = process.env.REACT_APP_API_URL;

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, [params.id]);

  const getProductDetails = async () => {
    setFetchLoading(true);
    setError(null);

    try {
      let result = await fetch(`${API_URL}/product/${params.id}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();

      if (result.error) {
        setError(result.error);
      } else {
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
      }
    } catch (err) {
      setError("Failed to fetch product details. Please try again later.");
    } finally {
      setFetchLoading(false);
    }
  };

  const updateProduct = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const rawPrice = parsePriceToNumber(price);
      let result = await fetch(`${API_URL}/product/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ name, price: rawPrice, category, company }),
        headers: {
          "Content-Type": "Application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();

      if (result.error) {
        setError(result.error);
      } else {
        setSuccessMessage("Product updated successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      setError("Failed to update product. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (value) => {
    const numericValue = value.replace(/\D/g, "");
  
    const integerPart = numericValue.slice(0, -2) || "0"; 
    const decimalPart = numericValue.slice(-2).padStart(2, "0"); 
    
    const formattedInteger = parseInt(integerPart, 10).toLocaleString("en-US");
    
    return `$ ${formattedInteger}.${decimalPart}`;
  };
  
  
  const parsePriceToNumber = (formattedPrice) => {
    const numericValue = formattedPrice.replace(/[^0-9]/g, "");
    return parseFloat(numericValue) / 100;
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 mb-6 bg-gray-100 rounded-md shadow-md max-w-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Update Product
      </h1>

      {error && (
        <div className="mb-4 p-3 text-red-600 bg-red-100 border border-red-400 rounded-md">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="mb-4 p-3 text-green-600 bg-green-100 border border-green-400 rounded-md">
          {successMessage}
        </div>
      )}

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter price"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={price}
          onChange={(e) => {
            const rawValue = e.target.value;
            const formattedValue = formatPrice(rawValue);
            setPrice(formattedValue);
          }}
        />
        <input
          type="text"
          placeholder="Enter category"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter company"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <button
        className={`mt-6 w-full px-4 py-2 text-white rounded-md ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        onClick={updateProduct}
        disabled={loading}
      >
        {loading ? <ClipLoader color="#ffffff" size={20} /> : "Update Product"}
      </button>
    </div>
  );
};

export default UpdateProduct;
