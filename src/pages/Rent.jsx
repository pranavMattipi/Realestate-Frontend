import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Rent = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRentProperties = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/properties?type=rent"
        );
        setProperties(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRentProperties();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto flex gap-8">
      
      {/* LEFT FILTER SIDEBAR */}
      <aside className="w-64 hidden md:block bg-white shadow-md p-5 rounded-xl h-fit sticky top-24">
        <h2 className="font-bold text-lg mb-4">Filters</h2>

        <label className="text-sm font-medium">City</label>
        <select className="w-full border rounded-lg p-2 mb-4">
          <option>Any</option>
          <option>Bangalore</option>
          <option>Hyderabad</option>
          <option>Mumbai</option>
          <option>Chennai</option>
        </select>

        <label className="text-sm font-medium">Monthly Rent</label>
        <select className="w-full border rounded-lg p-2 mb-4">
          <option>Any</option>
          <option>Below ₹10,000</option>
          <option>₹10,000 - ₹20,000</option>
          <option>₹20,000 - ₹40,000</option>
          <option>₹40,000+</option>
        </select>

        <label className="text-sm font-medium">Property Type</label>
        <select className="w-full border rounded-lg p-2 mb-4">
          <option>Any</option>
          <option>Apartment</option>
          <option>Independent House</option>
          <option>Villa</option>
          <option>PG/Hostel</option>
        </select>

        <label className="text-sm font-medium">Bedrooms</label>
        <select className="w-full border rounded-lg p-2 mb-4">
          <option>Any</option>
          <option>1 BHK</option>
          <option>2 BHK</option>
          <option>3 BHK</option>
          <option>4+ BHK</option>
        </select>

        <label className="text-sm font-medium">Bathrooms</label>
        <select className="w-full border rounded-lg p-2 mb-4">
          <option>Any</option>
          <option>1</option>
          <option>2</option>
          <option>3+</option>
        </select>

        <label className="text-sm font-medium">Parking</label>
        <select className="w-full border rounded-lg p-2 mb-4">
          <option>Any</option>
          <option>No Parking</option>
          <option>1 Parking</option>
          <option>2+ Parking</option>
        </select>

        <label className="text-sm font-medium">Furnishing</label>
        <select className="w-full border rounded-lg p-2 mb-4">
          <option>Any</option>
          <option>Furnished</option>
          <option>Semi-Furnished</option>
          <option>Unfurnished</option>
        </select>

        <label className="text-sm font-medium">Property Age</label>
        <select className="w-full border rounded-lg p-2 mb-4">
          <option>Any</option>
          <option>0 - 5 Years</option>
          <option>5 - 10 Years</option>
          <option>10+ Years</option>
        </select>

        <button className="w-full mt-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
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
            const firstImage =
              Array.isArray(p.images) && p.images.length > 0
                ? p.images[0]
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
                  <span className="text-xs px-3 py-1 bg-green-100 text-green-600 rounded-full">
                    RENT
                  </span>

                  <h2 className="text-xl font-semibold mt-3 text-gray-900">
                    {p.title}
                  </h2>

                  <p className="text-gray-600 text-sm mt-1">{p.city}</p>

                  <p className="text-2xl font-bold mt-3 text-gray-800">
                    ₹ {p.price.toLocaleString("en-IN")} / month
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

export default Rent;
