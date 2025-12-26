import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const getCartKey = () => {
    const email =
      localStorage.getItem("userEmail") ||
      localStorage.getItem("userName") ||
      "guest";
    return `cart_${email}`;
  };

  useEffect(() => {
    const validateCart = async () => {
      const key = getCartKey();
      const stored = JSON.parse(localStorage.getItem(key) || "[]");
      if (!stored.length) {
        setCart([]);
        return;
      }

      const checks = await Promise.allSettled(
        stored.map((item) =>
          axios.get(
            `http://${import.meta.env.VITE_API_BASE_URL}/api/properties/${item._id}`
          )
        )
      );

      const kept = stored.filter((item, idx) => {
        const res = checks[idx];
        if (res.status === "fulfilled") return true;
        const status = res.reason?.response?.status;
        if (status === 404) return false;
        return true;
      });

      setCart(kept);
      localStorage.setItem(key, JSON.stringify(kept));

      if (kept.length !== stored.length) {
        alert(
          "Some items were removed from your cart because they no longer exist."
        );
      }
    };

    validateCart();
  }, []);

  const persist = (updated) => {
    setCart(updated);
    localStorage.setItem(getCartKey(), JSON.stringify(updated));
  };

  const removeItem = (id) => {
    persist(cart.filter((c) => c._id !== id));
  };

  const clearCart = () => {
    if (!window.confirm("Clear all items from cart?")) return;
    persist([]);
    localStorage.removeItem(getCartKey());
  };

  const totalPrice = cart.reduce(
    (sum, it) => sum + (Number(it.price) || 0),
    0
  );

  const getListingLabel = (item) => {
    const raw = (
      item.type ||
      item.listingType ||
      item.listing_for ||
      item.for ||
      item.listing ||
      item.status ||
      ""
    )
      .toString()
      .toLowerCase();

    if (raw.includes("rent") || raw.includes("lease")) return "RENT";
    if (raw.includes("sale") || raw.includes("buy") || raw.includes("sell"))
      return "BUY";
    if (item.priceFrequency || item.rentPerMonth || item.rent) return "RENT";
    return "UNKNOWN";
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <button
            onClick={() => navigate("/buy")}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Browse Properties
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => {
              const label = getListingLabel(item);
              return (
                <div
                  key={item._id}
                  onClick={() => navigate(`/property/${item._id}`)}
                  className="relative flex flex-col md:flex-row gap-4 bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition"
                >
                  <span
                    className={`absolute top-3 left-3 text-xs px-2 py-1 rounded-full font-semibold ${
                      label === "RENT"
                        ? "bg-yellow-100 text-yellow-800"
                        : label === "BUY"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {label}
                  </span>

                  <img
                    src={(item.images && item.images[0]) || "/placeholder.jpg"}
                    alt={item.title}
                    className="w-full md:w-32 h-40 md:h-20 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h2 className="font-semibold text-lg text-gray-900">
                      {item.title || `${item.bedrooms}BHK in ${item.city}`}
                    </h2>
                    <p className="text-gray-600">
                      {item.address ? `${item.address}, ` : ""}
                      {item.city || ""}
                    </p>

                    <div className="mt-2">
                      <span className="text-sm inline-block px-2 py-1 bg-gray-100 text-gray-800 rounded">
                        {label === "UNKNOWN"
                          ? "Listing type unknown"
                          : label}
                      </span>
                    </div>
                  </div>

                  {/* PRICE SECTION FIXED */}
                  <div className="md:text-right flex md:flex-col justify-between items-start md:items-end">
                    <p className="font-bold text-lg">
                      ₹{" "}
                      {item.price?.toLocaleString?.("en-IN") || item.price}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(item._id);
                      }}
                      className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <button
              onClick={clearCart}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Clear Cart
            </button>

            <div className="text-right">
              <p className="text-lg font-semibold">
                Total: ₹{" "}
                {totalPrice.toLocaleString?.("en-IN") || totalPrice}
              </p>
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => navigate("/buy")}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
