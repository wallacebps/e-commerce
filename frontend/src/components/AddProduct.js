import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return;
    }

    try {
      let result = await fetch(`https://e-commerce-6ogd.onrender.com/add-product`, {
        method: "Post",
        body: JSON.stringify({ name, price, category, company }),
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
    
  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Add Product</h1>

      <input
        type="text"
        placeholder="Enter name"
        className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && !name && <span className="text-red-500 text-sm">Enter a valid name</span>}

      <input
        type="text"
        placeholder="Enter price"
        className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {error && !price && <span className="text-red-500 text-sm">Enter a valid price</span>}

      <input
        type="text"
        placeholder="Enter category"
        className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {error && !category && <span className="text-red-500 text-sm">Enter a valid category</span>}

      <input
        type="text"
        placeholder="Enter company"
        className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      {error && !company && <span className="text-red-500 text-sm">Enter a valid company</span>}

      {successMessage && (
        <span className="text-green-500 text-sm">{successMessage}</span>
      )}

      <button
        onClick={handleSubmit}
        className="w-full mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
