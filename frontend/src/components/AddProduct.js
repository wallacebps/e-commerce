import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
const API_URL = process.env.REACT_APP_API_URL;

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return;
    }

    setError(false);
    setLoading(true);
    setSuccessMessage("");

    try {
      const rawPrice = parsePriceToNumber(price);
      let result = await fetch(`${API_URL}/add-product`, {
        method: "POST",
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
        setSuccessMessage("Product added successfully!");
        setTimeout(() => setSuccessMessage(""), 5000);
        setName("");
        setPrice("");
        setCategory("");
        setCompany("");
      }
    } catch (err) {
      setError("Failed to add product. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (value) => {
    const numericValue = value.replace(/\D/g, "");
    const integerPart = numericValue.slice(0, -2) || "0";
    const decimalPart = numericValue.slice(-2).padStart(2, "0");
    return `$ ${parseInt(integerPart, 10).toLocaleString("en-US")}.${decimalPart}`;
  };

  const parsePriceToNumber = (formattedPrice) => {
    const numericValue = formattedPrice.replace(/[^0-9]/g, "");
    return parseFloat(numericValue) / 100;
  };

  return (
    <div className="container mx-auto p-6 mb-6 bg-gray-100 rounded-md shadow-md max-w-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Add Product</h1>

      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            placeholder="Enter name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && !name && <span className="text-red-500 text-sm">Name is required</span>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Price</label>
          <input
            type="text"
            placeholder="Enter price"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-400"
            value={price}
            onChange={(e) => setPrice(formatPrice(e.target.value))}
          />
          {error && !price && <span className="text-red-500 text-sm">Price is required</span>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Category</label>
          <input
            type="text"
            placeholder="Enter category"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-400"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          {error && !category && <span className="text-red-500 text-sm">Category is required</span>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Company</label>
          <input
            type="text"
            placeholder="Enter company"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-400"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          {error && !company && <span className="text-red-500 text-sm">Company is required</span>}
        </div>

        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <button
          type="button"
          onClick={handleSubmit}
          className={`w-full px-4 py-2 text-white font-semibold rounded-md ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? <ClipLoader color="#fff" size={20} /> : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
