// src/pages/Individual.jsx
import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const Individual = () => {
  const { id } = useParams();
  const location = useLocation();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 NEW — reference to scroll to owner section
  const ownerRef = useRef(null);

  const queryParams = new URLSearchParams(location.search);
  const pageFrom = queryParams.get("from");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/properties/${id}`
        );
        setProperty(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchProperty();
  }, [id]);

  if (loading)
    return (
      <p className="text-center text-gray-600 mt-10 text-xl">
        Loading property...
      </p>
    );

  if (!property)
    return (
      <p className="text-center text-red-600 mt-10 text-xl">
        Property not found
      </p>
    );

  const images = property.images || [];

  const formattedPrice =
    pageFrom === "rent"
      ? `₹ ${property.price?.toLocaleString("en-IN")} / month`
      : `₹ ${property.price?.toLocaleString("en-IN")}`;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-10">

      {/* ==================== PHOTO COLLAGE ==================== */}
      <div className="grid grid-cols-12 gap-2 h-[350px] md:h-[480px] rounded-2xl overflow-hidden mb-10">
        <div className="col-span-12 md:col-span-7 h-full">
          <img
            src={images[0] || "/placeholder.jpg"}
            className="w-full h-full object-cover"
            alt="main"
          />
        </div>

        <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-2 col-span-5 h-full">
          {images.slice(1, 5).map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-full h-full object-cover"
              alt={`img${i}`}
            />
          ))}
        </div>
      </div>

      {/* ==================== PRICE + ADDRESS ==================== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            {formattedPrice}
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            {property.address}, {property.city}, {property.state} –{" "}
            {property.pincode}
          </p>
        </div>

        {/* 🔥 NEW — replaced buttons with one "Owner Details" button */}
        <button
          onClick={() => {
            ownerRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow mt-5 md:mt-0"
        >
          Owner Details
        </button>
      </div>

      {/* ==================== BEDS / BATHS / SQFT ==================== */}
      <div className="flex gap-8 text-xl font-semibold text-gray-800 border-y py-4 mb-10">
        <p>{property.bedrooms} Beds</p>
        <p>{property.bathrooms} Baths</p>
        <p>{property.area} sqft</p>
      </div>

      {/* ==================== FEATURES ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-8 shadow rounded-2xl border">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">🏡 Property Details</h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Type:</strong> {property.type}</li>
            <li><strong>Furnishing:</strong> {property.furnishing}</li>
            <li><strong>Property Age:</strong> {property.propertyAge}</li>
            <li><strong>Floor:</strong> {property.floor}</li>
            <li><strong>Total Floors:</strong> {property.totalFloors}</li>
            <li><strong>Parking:</strong> {property.parking}</li>
          </ul>
        </div>

        <div className="bg-white p-8 shadow rounded-2xl border">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">📍 Location</h2>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Address:</strong> {property.address}</li>
            <li><strong>City:</strong> {property.city}</li>
            <li><strong>State:</strong> {property.state}</li>
            <li><strong>Pincode:</strong> {property.pincode}</li>
          </ul>
        </div>
      </div>

      {/* ==================== OWNER ==================== */}
      <div ref={ownerRef} className="bg-white p-8 shadow rounded-2xl border mb-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">👤 Owner Details</h2>

        <div className="bg-gray-100 p-6 rounded-xl">
          <p className="text-lg"><strong>Name:</strong> {property.ownerName || "Not Provided"}</p>
          <p className="text-lg"><strong>Phone:</strong> {property.ownerPhone || "Not Provided"}</p>
          <p className="text-lg"><strong>Email:</strong> {property.ownerEmail || "Not Provided"}</p>
        </div>
      </div>

      {/* ==================== DESCRIPTION ==================== */}
      <div className="bg-white p-8 shadow rounded-2xl border mb-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">📝 Description</h2>
        <p className="text-gray-700 text-lg leading-relaxed">{property.description}</p>
      </div>

      {/* ==================== GOOGLE MAP ==================== */}
      <div className="bg-white p-8 shadow rounded-2xl border mb-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">🗺 Location Map</h2>

        <iframe
          className="rounded-xl shadow-md w-full h-80"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            `${property.address || ""}, ${property.city || ""}, ${property.state || ""}, ${property.pincode || ""}`
          )}&output=embed`}
          allowFullScreen
          loading="lazy"
        ></iframe>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            `${property.address || ""}, ${property.city || ""}, ${property.state || ""}, ${property.pincode || ""}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-blue-600 font-semibold hover:underline"
        >
          👉 View on Google Maps
        </a>
      </div>

    </div>
  );
};

export default Individual;
