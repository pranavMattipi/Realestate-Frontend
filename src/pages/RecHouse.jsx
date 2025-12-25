// src/pages/RecHouse.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const RecHouse = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔍 Read query typed in navbar
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("query") || "";

  useEffect(() => {
    fetchSearchedProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const fetchSearchedProperties = async () => {
    try {
      const res = await axios.get("http://${import.meta.env.VITE_API_BASE_URL}/api/properties");
      let results = res.data || [];

      const q = searchQuery.toLowerCase().trim();

      // 🧠 Filter by title OR city
      results = results.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.city?.toLowerCase().includes(q)
      );

      // ✅ SORT EXACTLY AS TYPED (NOT RANDOM)
      results.sort((a, b) => {
        const aText = `${a.title} ${a.city}`.toLowerCase();
        const bText = `${b.title} ${b.city}`.toLowerCase();

        const aStarts = aText.startsWith(q);
        const bStarts = bText.startsWith(q);

        // 1️⃣ Starts-with first
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;

        // 2️⃣ Earlier match first
        const aIndex = aText.indexOf(q);
        const bIndex = bText.indexOf(q);
        if (aIndex !== bIndex) return aIndex - bIndex;

        // 3️⃣ Stable fallback
        return aText.localeCompare(bText);
      });

      setProperties(results);
    } catch (err) {
      console.error("Error fetching searched properties", err);
    }
  };

  // ---------- CART HELPERS ----------
  const getCartKey = () => {
    const email =
      localStorage.getItem("userEmail") ||
      localStorage.getItem("userName") ||
      "guest";
    return `cart_${email}`;
  };

  const addToCart = (property, e) => {
    e.stopPropagation();
    try {
      const key = getCartKey();
      const cart = JSON.parse(localStorage.getItem(key) || "[]");

      if (cart.some((item) => item._id === property._id)) {
        alert("Property already in cart");
        return;
      }

      cart.push(property);
      localStorage.setItem(key, JSON.stringify(cart));
      alert("Added to cart");
    } catch {
      alert("Could not add to cart");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-3 text-gray-800">
        Search Results
      </h1>

      <p className="text-gray-600 mb-10">
        Showing results for{" "}
        <span className="font-semibold text-gray-800">
          "{searchQuery}"
        </span>
      </p>

      {/* NO RESULTS */}
      {properties.length === 0 && (
        <div className="text-center text-gray-500 text-lg mt-20">
          No properties found.
        </div>
      )}

      {/* RESULTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {properties.map((p) => {
          const firstImage =
            Array.isArray(p.images) && p.images.length > 0
              ? p.images[0]
              : "https://via.placeholder.com/500x300?text=No+Image";

          return (
            <div
              key={p._id}
              onClick={() => navigate(`/property/${p._id}`)}
              className="rounded-xl shadow-md hover:shadow-xl transition cursor-pointer bg-white h-[480px] overflow-hidden flex flex-col"
            >
              {/* IMAGE */}
              <div className="w-full h-60 overflow-hidden">
                <img
                  src={firstImage}
                  alt={p.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <span className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                    {p.type?.toUpperCase() || "PROPERTY"}
                  </span>

                  <button
                    onClick={(e) => addToCart(p, e)}
                    className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Add to Cart
                  </button>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mt-3 text-gray-900">
                    {p.title}
                  </h2>
                  <p className="text-gray-600 text-sm">{p.city}</p>
                </div>

                <p className="text-2xl font-bold mt-3 text-gray-800">
                  ₹ {p.price?.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default RecHouse;
