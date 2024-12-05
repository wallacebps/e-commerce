import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
const API_URL = process.env.REACT_APP_API_URL;

const useApi = (url, method = "GET", body = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method,
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body, token]);

  return { data, loading, error };
};

const ProductList = () => {
  const [searchKey, setSearchKey] = useState("");
  const [products, setProducts] = useState([]);
  const { data, loading, error } = useApi(
    searchKey ? `${API_URL}/search/${searchKey}` : `${API_URL}/products`
  );

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const handleSearch = (event) => {
    setSearchKey(event.target.value);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const response = await fetch(`${API_URL}/product/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#2563EB" size={50} />
      </div>
    );
  if (error)
    return (
      <h1 className="text-center text-2xl text-red-500">Error: {error}</h1>
    );

  return (
    <div className="container mx-auto mb-6 p-6 bg-gray-50 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Product List
      </h3>

      <div className="mb-6">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search Product"
          value={searchKey}
          onChange={handleSearch}
        />
      </div>

      <div className="grid grid-cols-[0.5fr,2fr,1fr,2fr,2fr,1.5fr] font-semibold text-gray-600 border-b border-gray-300 py-2">
        <span>ID</span>
        <span>Name</span>
        <span>Price</span>
        <span>Category</span>
        <span>Company</span>
        <span>Actions</span>
      </div>

      {products && products.length > 0 ? (
        products.map((item, index) => (
          <div
            key={item._id}
            className="grid grid-cols-[0.5fr,2fr,1fr,2fr,2fr,1.5fr] py-3 border-b border-gray-200 items-center text-gray-800"
          >
            <span>{index + 1}</span>
            <span className="truncate">{item.name}</span>
            <span>${item.price}</span>
            <span>{item.category}</span>
            <span className="truncate">{item.company || "N/A"}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleDelete(item._id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Delete
              </button>

              <Link
                to={`/update/${item._id}`}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Update
              </Link>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-center text-xl text-gray-600 mt-6">
          No products found
        </h1>
      )}
    </div>
  );
};

export default ProductList;
