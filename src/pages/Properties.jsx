// src/pages/Properties.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  // FILTER STATES
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [propertyAge, setPropertyAge] = useState("");
  const [parking, setParking] = useState("");
  const [area, setArea] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchFilteredProperties();
    // eslint-disable-next-line
  }, [
    type,
    city,
    price,
    bedrooms,
    bathrooms,
    furnishing,
    propertyAge,
    parking,
    area,
  ]);

  const fetchFilteredProperties = async () => {
    try {
      const query = new URLSearchParams();
      if (type) query.append("type", type);
      if (city) query.append("city", city);
      if (bedrooms) query.append("bedrooms", bedrooms);
      if (bathrooms) query.append("bathrooms", bathrooms);
      if (furnishing) query.append("furnishing", furnishing);
      if (propertyAge) query.append("propertyAge", propertyAge);
      if (parking) query.append("parking", parking);
      if (area) query.append("minArea", area);

      if (price === "low") query.append("maxPrice", 3000000);
      if (price === "mid") {
        query.append("minPrice", 3000000);
        query.append("maxPrice", 8000000);
      }
      if (price === "high") query.append("minPrice", 8000000);

      const res = await axios.get(
        `http://localhost:8000/api/properties?${query.toString()}`
      );
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const resetFilters = () => {
    setType("");
    setCity("");
    setPrice("");
    setBedrooms("");
    setBathrooms("");
    setFurnishing("");
    setPropertyAge("");
    setParking("");
    setArea("");
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

      <div className="flex gap-10">
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
              <label className="block text-sm text-gray-600">Property Type</label>
              <select
                className="w-full border p-2 rounded mt-1 mb-4"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Both</option>
                <option value="sale">Buy</option>
                <option value="rent">Rent</option>
              </select>

              <label className="block text-sm text-gray-600">City</label>
              <select
                className="w-full border p-2 rounded mt-1 mb-4"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">Any</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Chennai">Chennai</option>
              </select>

              <label className="block text-sm text-gray-600">Price Range</label>
              <select
                className="w-full border p-2 rounded mt-1 mb-4"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              >
                <option value="">Any</option>
                <option value="low">Below ₹30L</option>
                <option value="mid">₹30L - ₹80L</option>
                <option value="high">Above ₹80L</option>
              </select>

              <label className="block text-sm text-gray-600">Bedrooms</label>
              <select
                className="w-full border p-2 rounded mt-1 mb-4"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              >
                <option value="">Any</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4 BHK</option>
              </select>

              <label className="block text-sm text-gray-600">Bathrooms</label>
              <select
                className="w-full border p-2 rounded mt-1 mb-4"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
              >
                <option value="">Any</option>
                <option value="1">1 Bathroom</option>
                <option value="2">2 Bathrooms</option>
                <option value="3">3 Bathrooms</option>
                <option value="4">4 Bathrooms</option>
              </select>

              <label className="block text-sm text-gray-600">Furnishing</label>
              <select
                className="w-full border p-2 rounded mt-1 mb-4"
                value={furnishing}
                onChange={(e) => setFurnishing(e.target.value)}
              >
                <option value="">Any</option>
                <option value="furnished">Furnished</option>
                <option value="semi-furnished">Semi-Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>

              <label className="block text-sm text-gray-600">Property Age</label>
              <select
                className="w-full border p-2 rounded mt-1 mb-4"
                value={propertyAge}
                onChange={(e) => setPropertyAge(e.target.value)}
              >
                <option value="">Any</option>
                <option value="0-1 Years">0-1 Years</option>
                <option value="1-5 Years">1-5 Years</option>
                <option value="5-10 Years">5-10 Years</option>
                <option value="10+ Years">10+ Years</option>
              </select>

              <label className="block text-sm text-gray-600">Parking</label>
              <select
                className="w-full border p-2 rounded mt-1 mb-4"
                value={parking}
                onChange={(e) => setParking(e.target.value)}
              >
                <option value="">Any</option>
                <option value="No Parking">No Parking</option>
                <option value="1 Car">1 Car</option>
                <option value="2 Car">2 Car</option>
              </select>

              <label className="block text-sm text-gray-600">Min Area (sqft)</label>
              <input
                type="number"
                className="w-full border p-2 rounded mt-1 mb-4"
                placeholder="e.g., 800"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />

              <button
                onClick={() => {
                  resetFilters();
                  setShowFilters(false);
                }}
                className="w-full mt-3 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
              >
                Reset Filters
              </button>
            </aside>
          </>
        )}

        {/* DESKTOP FILTER SIDEBAR */}
        <div className="w-72 bg-white shadow-lg p-6 rounded-xl h-max sticky top-5 hidden md:block">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Filters</h2>
          {/* TYPE */}
          <div className="mb-5">
            <label className="block text-sm text-gray-600">Property Type</label>
            <select
              className="w-full border p-2 rounded mt-1"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Both</option>
              <option value="sale">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>

          {/* CITY */}
          <div className="mb-5">
            <label className="block text-sm text-gray-600">City</label>
            <select
              className="w-full border p-2 rounded mt-1"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Any</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Chennai">Chennai</option>
            </select>
          </div>

          {/* PRICE */}
          <div className="mb-5">
            <label className="block text-sm text-gray-600">Price Range</label>
            <select
              className="w-full border p-2 rounded mt-1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="">Any</option>
              <option value="low">Below ₹30L</option>
              <option value="mid">₹30L - ₹80L</option>
              <option value="high">Above ₹80L</option>
            </select>
          </div>

          {/* BEDROOMS */}
          <div className="mb-5">
            <label className="block text-sm text-gray-600">Bedrooms</label>
            <select
              className="w-full border p-2 rounded mt-1"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            >
              <option value="">Any</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4 BHK</option>
            </select>
          </div>

          {/* BATHROOMS */}
          <div className="mb-5">
            <label className="block text-sm text-gray-600">Bathrooms</label>
            <select
              className="w-full border p-2 rounded mt-1"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
            >
              <option value="">Any</option>
              <option value="1">1 Bathroom</option>
              <option value="2">2 Bathrooms</option>
              <option value="3">3 Bathrooms</option>
              <option value="4">4 Bathrooms</option>
            </select>
          </div>

          {/* FURNISHING */}
          <div className="mb-5">
            <label className="block text-sm text-gray-600">Furnishing</label>
            <select
              className="w-full border p-2 rounded mt-1"
              value={furnishing}
              onChange={(e) => setFurnishing(e.target.value)}
            >
              <option value="">Any</option>
              <option value="furnished">Furnished</option>
              <option value="semi-furnished">Semi-Furnished</option>
              <option value="unfurnished">Unfurnished</option>
            </select>
          </div>

          {/* PROPERTY AGE */}
          <div className="mb-5">
            <label className="block text-sm text-gray-600">Property Age</label>
            <select
              className="w-full border p-2 rounded mt-1"
              value={propertyAge}
              onChange={(e) => setPropertyAge(e.target.value)}
            >
              <option value="">Any</option>
              <option value="0-1 Years">0-1 Years</option>
              <option value="1-5 Years">1-5 Years</option>
              <option value="5-10 Years">5-10 Years</option>
              <option value="10+ Years">10+ Years</option>
            </select>
          </div>

          {/* PARKING */}
          <div className="mb-5">
            <label className="block text-sm text-gray-600">Parking</label>
            <select
              className="w-full border p-2 rounded mt-1"
              value={parking}
              onChange={(e) => setParking(e.target.value)}
            >
              <option value="">Any</option>
              <option value="No Parking">No Parking</option>
              <option value="1 Car">1 Car</option>
              <option value="2 Car">2 Car</option>
            </select>
          </div>

          {/* AREA */}
          <div className="mb-5">
            <label className="block text-sm text-gray-600">Min Area (sqft)</label>
            <input
              type="number"
              className="w-full border p-2 rounded mt-1"
              placeholder="e.g., 800"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>

          {/* RESET FILTERS BUTTON */}
          <button
            onClick={resetFilters}
            className="w-full mt-3 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            Reset Filters
          </button>
        </div>

        {/* -------------------- PROPERTIES GRID -------------------- */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
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
                onClick={() => navigate(`/property/${p._id}`)}
                className="rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white h-[480px] overflow-hidden flex flex-col"
              >
                <div className="w-full h-60 overflow-hidden rounded-t-xl">
                  <img
                    src={firstImage}
                    alt={p.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between gap-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${p.type === "rent" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}>
                      {p.type ? p.type.toUpperCase() : "PROPERTY"}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold mt-3 text-gray-900 line-clamp-2">
                    {p.title || "Untitled Property"}
                  </h2>

                  <p className="text-gray-600 text-sm mt-1">{p.city || "—"}</p>

                  <p className="text-2xl font-bold mt-3 text-gray-800">
                    ₹ {p.price?.toLocaleString?.("en-IN") || p.price || "—"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Properties;
