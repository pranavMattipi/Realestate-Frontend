import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Rent = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  // Filter states
  const [city, setCity] = useState("");
  const [rent, setRent] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [parking, setParking] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [propertyAge, setPropertyAge] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Fetch properties with filters
  const fetchFilteredProperties = async () => {
    try {
      const query = new URLSearchParams();
      query.append("type", "rent");
      if (city) query.append("city", city);

      // Rent filter
      if (rent) {
        if (rent === "Below ₹10,000") query.append("maxPrice", 10000);
        if (rent === "₹10,000 - ₹20,000") {
          query.append("minPrice", 10000);
          query.append("maxPrice", 20000);
        }
        if (rent === "₹20,000 - ₹40,000") {
          query.append("minPrice", 20000);
          query.append("maxPrice", 40000);
        }
        if (rent === "₹40,000+") query.append("minPrice", 40000);
      }

      // Other filters
      if (bedrooms) query.append("bedrooms", bedrooms === "4+ BHK" ? 4 : parseInt(bedrooms));
      if (bathrooms) query.append("bathrooms", bathrooms === "3+" ? 3 : parseInt(bathrooms));
      if (parking) query.append("parking", parking);
      if (furnishing) query.append("furnishing", furnishing.toLowerCase());
      if (propertyAge) query.append("propertyAge", propertyAge);

      const res = await axios.get(
        `http://localhost:8000/api/properties?${query.toString()}`
      );
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFilteredProperties();
    // eslint-disable-next-line
  }, [
    city,
    rent,
    bedrooms,
    bathrooms,
    parking,
    furnishing,
    propertyAge,
  ]);

  const resetFilters = () => {
    setCity("");
    setRent("");
    setBedrooms("");
    setBathrooms("");
    setParking("");
    setFurnishing("");
    setPropertyAge("");
    fetchFilteredProperties();
  };

  // ========= CART HELPERS =========
  const getCartKey = () => {
    const email =
      localStorage.getItem("userEmail") ||
      localStorage.getItem("userName") ||
      "guest";
    return `cart_${email}`;
  };

  const addToCart = (property, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
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
    } catch (err) {
      console.error("Add to cart failed", err);
      alert("Could not add to cart");
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* MOBILE FILTER BUTTON */}
      <div className="flex justify-end md:hidden mb-4">
        <button
          onClick={() => setShowFilters(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Filters
        </button>
      </div>

      <div className="flex gap-8">
        {/* MOBILE FILTER DRAWER */}
        {showFilters && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
              onClick={() => setShowFilters(false)}
            />
            <aside
              className="fixed top-0 right-0 w-80 max-w-full h-full bg-white shadow-lg z-50 p-6 overflow-y-auto transition-transform duration-300 md:hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 text-2xl"
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
              {/* Filter Controls */}
              <label className="text-sm font-medium">City</label>
              <select className="w-full border rounded-lg p-2 mb-4" value={city} onChange={e => setCity(e.target.value)}>
                <option value="">Any</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Chennai">Chennai</option>
              </select>

              <label className="text-sm font-medium">Monthly Rent</label>
              <select className="w-full border rounded-lg p-2 mb-4" value={rent} onChange={e => setRent(e.target.value)}>
                <option value="">Any</option>
                <option value="Below ₹10,000">Below ₹10,000</option>
                <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
                <option value="₹20,000 - ₹40,000">₹20,000 - ₹40,000</option>
                <option value="₹40,000+">₹40,000+</option>
              </select>

              <label className="text-sm font-medium">Bedrooms</label>
              <select className="w-full border rounded-lg p-2 mb-4" value={bedrooms} onChange={e => setBedrooms(e.target.value)}>
                <option value="">Any</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4+ BHK">4+ BHK</option>
              </select>

              <label className="text-sm font-medium">Bathrooms</label>
              <select className="w-full border rounded-lg p-2 mb-4" value={bathrooms} onChange={e => setBathrooms(e.target.value)}>
                <option value="">Any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3+">3+</option>
              </select>

              <label className="text-sm font-medium">Parking</label>
              <select className="w-full border rounded-lg p-2 mb-4" value={parking} onChange={e => setParking(e.target.value)}>
                <option value="">Any</option>
                <option value="No Parking">No Parking</option>
                <option value="1 Car">1 Car</option>
                <option value="2 Car">2 Car</option>
              </select>

              <label className="text-sm font-medium">Furnishing</label>
              <select className="w-full border rounded-lg p-2 mb-4" value={furnishing} onChange={e => setFurnishing(e.target.value)}>
                <option value="">Any</option>
                <option value="Furnished">Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>

              <label className="text-sm font-medium">Property Age</label>
              <select className="w-full border rounded-lg p-2 mb-4" value={propertyAge} onChange={e => setPropertyAge(e.target.value)}>
                <option value="">Any</option>
                <option value="0-1 Years">0-1 Years</option>
                <option value="1-5 Years">1-5 Years</option>
                <option value="5-10 Years">5-10 Years</option>
                <option value="10+ Years">10+ Years</option>
              </select>

              <button
                className="w-full mt-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                onClick={() => {
                  resetFilters();
                  setShowFilters(false);
                }}
              >
                Reset Filters
              </button>
            </aside>
          </>
        )}

        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="w-64 hidden md:block bg-white shadow-md p-5 rounded-xl h-fit sticky top-24">
          <h2 className="font-bold text-lg mb-4">Filters</h2>

          <label className="text-sm font-medium">City</label>
          <select className="w-full border rounded-lg p-2 mb-4" value={city} onChange={e => setCity(e.target.value)}>
            <option value="">Any</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Chennai">Chennai</option>
          </select>

          <label className="text-sm font-medium">Monthly Rent</label>
          <select className="w-full border rounded-lg p-2 mb-4" value={rent} onChange={e => setRent(e.target.value)}>
            <option value="">Any</option>
            <option value="Below ₹10,000">Below ₹10,000</option>
            <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
            <option value="₹20,000 - ₹40,000">₹20,000 - ₹40,000</option>
            <option value="₹40,000+">₹40,000+</option>
          </select>

          <label className="text-sm font-medium">Bedrooms</label>
          <select className="w-full border rounded-lg p-2 mb-4" value={bedrooms} onChange={e => setBedrooms(e.target.value)}>
            <option value="">Any</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4+ BHK">4+ BHK</option>
          </select>

          <label className="text-sm font-medium">Bathrooms</label>
          <select className="w-full border rounded-lg p-2 mb-4" value={bathrooms} onChange={e => setBathrooms(e.target.value)}>
            <option value="">Any</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3+">3+</option>
          </select>

          <label className="text-sm font-medium">Parking</label>
          <select className="w-full border rounded-lg p-2 mb-4" value={parking} onChange={e => setParking(e.target.value)}>
            <option value="">Any</option>
            <option value="No Parking">No Parking</option>
            <option value="1 Car">1 Car</option>
            <option value="2 Car">2 Car</option>
          </select>

          <label className="text-sm font-medium">Furnishing</label>
          <select className="w-full border rounded-lg p-2 mb-4" value={furnishing} onChange={e => setFurnishing(e.target.value)}>
            <option value="">Any</option>
            <option value="Furnished">Furnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
          </select>

          <label className="text-sm font-medium">Property Age</label>
          <select className="w-full border rounded-lg p-2 mb-4" value={propertyAge} onChange={e => setPropertyAge(e.target.value)}>
            <option value="">Any</option>
            <option value="0-1 Years">0-1 Years</option>
            <option value="1-5 Years">1-5 Years</option>
            <option value="5-10 Years">5-10 Years</option>
            <option value="10+ Years">10+ Years</option>
          </select>

          <button
            className="w-full mt-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </aside>

        {/* RIGHT SIDE LISTINGS */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-10 text-gray-800">
            Properties Available for <span className="text-green-600">Rent</span>
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {properties.map((p) => {
              const BACKEND_URL = "http://localhost:8000";
              const images = Array.isArray(p.images)
                ? p.images.map((img) =>
                    img.startsWith("http") ? img : `${BACKEND_URL}${img}`
                  )
                : [];
              const firstImage =
                images.length > 0
                  ? images[0]
                  : "https://via.placeholder.com/500x300?text=No+Image";

              return (
                <div
                  key={p._id}
                  onClick={() => navigate(`/property/${p._id}?from=rent`)}
                  className="rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white"
                >
                  <div className="w-full h-56 overflow-hidden rounded-t-xl">
                    <img
                      src={firstImage}
                      alt={p.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs px-3 py-1 bg-green-100 text-green-600 rounded-full">
                        RENT
                      </span>

                      <button
                        onClick={(e) => addToCart(p, e)}
                        className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Add to Cart
                      </button>
                    </div>

                    <h2 className="text-xl font-semibold mt-3 text-gray-900">
                      {p.title}
                    </h2>

                    <p className="text-gray-600 text-sm mt-1">{p.city}</p>

                    <p className="text-2xl font-bold mt-3 text-gray-800">
                      ₹ {p.price?.toLocaleString?.("en-IN") || p.price} / month
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rent;
