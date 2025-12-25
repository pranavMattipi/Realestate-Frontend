import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import API from "../utils/axios"; // Use your axios instance

const Individual = () => {
  const { id } = useParams();
  const location = useLocation();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const ownerRef = useRef(null);

  const queryParams = new URLSearchParams(location.search);
  const pageFrom = queryParams.get("from");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await API.get(`/properties/${id}`);
        setProperty(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center text-gray-600 mt-10 text-xl">
        Loading property...
      </p>
    );
  }

  if (!property) {
    return (
      <p className="text-center text-red-600 mt-10 text-xl">
        Property not found
      </p>
    );
  }

  // ================= IMAGES FIX =================
  const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;
  const images = Array.isArray(property.images)
    ? property.images.map((img) =>
        img.startsWith("http") ? img : `${BACKEND_URL}${img}`
      )
    : [];

  const formattedPrice =
    pageFrom === "rent"
      ? `₹ ${property.price?.toLocaleString("en-IN")} / month`
      : `₹ ${property.price?.toLocaleString("en-IN")}`;

  // ========== Collage Layout ==========
  // Show up to 5 images in a collage (1 big, 4 small)
  const mainImage = images[0] || "/no-image.png";
  const collageImages = images.slice(1, 5);

  // Add to Cart helper
  const getCartKey = () => {
    const email =
      localStorage.getItem("userEmail") ||
      localStorage.getItem("userName") ||
      "guest";
    return `cart_${email}`;
  };

  const addToCart = (property) => {
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
    <div className="max-w-7xl mx-auto p-4 md:p-10 bg-white">
      {/* ==================== IMAGE COLLAGE ==================== */}
      <div className="mb-6">
        <div className="grid grid-cols-3 grid-rows-2 gap-2 w-full h-[350px] md:h-[480px] overflow-hidden shadow-xl bg-black/5">
          <div
            className="row-span-2 col-span-2 cursor-pointer"
            onClick={() => {
              setModalImage(mainImage);
              setShowModal(true);
            }}
          >
            <img
              src={mainImage}
              alt="Property"
              className="w-full h-full object-cover"
              style={{ borderRadius: 0 }}
            />
          </div>
          {collageImages.map((img, i) => (
            <div
              key={i}
              className="cursor-pointer"
              onClick={() => {
                setModalImage(img);
                setShowModal(true);
              }}
            >
              <img
                src={img}
                alt={`Property ${i + 1}`}
                className="w-full h-full object-cover"
                style={{ borderRadius: 0 }}
              />
            </div>
          ))}
        </div>
        {/* Modal for enlarged image */}
        {showModal && (
          <div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
            onClick={() => setShowModal(false)}
          >
            <img
              src={modalImage}
              alt="Enlarged"
              className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
              style={{ background: "#fff", borderRadius: 0, padding: 0 }}
              onClick={e => e.stopPropagation()}
            />
          </div>
        )}
      </div>

      {/* ==================== PRICE + ADDRESS ==================== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-5xl font-extrabold text-black drop-shadow mb-2">
            {formattedPrice}
          </h1>
          <p className="text-lg text-gray-700 mt-1 flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {property.address}, {property.city}, {property.state} – {property.pincode}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-6 md:mt-0">
          <button
            onClick={() => ownerRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-600 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            Owner Details
          </button>
          <button
            onClick={() => addToCart(property)}
            className="px-8 py-3 bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 transition rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* ==================== BEDS / BATHS ==================== */}
      <div className="flex flex-wrap gap-8 text-xl font-semibold text-gray-800 border-y py-6 mb-12 justify-center bg-white shadow">
        <div className="flex items-center gap-2">
          <span className="inline-block bg-gray-100 text-black px-3 py-1">
            {property.bedrooms} Beds
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block bg-gray-100 text-black px-3 py-1">
            {property.bathrooms} Baths
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block bg-gray-100 text-black px-3 py-1">
            {property.area} sqft
          </span>
        </div>
      </div>

      {/* ==================== DETAILS ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        <div className="bg-white p-10 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-black flex items-center gap-2">
            🏡 Property Details
          </h2>
          <ul className="space-y-3 text-gray-700 text-lg">
            <li><strong>Type:</strong> {property.type}</li>
            <li><strong>Furnishing:</strong> {property.furnishing}</li>
            <li><strong>Property Age:</strong> {property.propertyAge}</li>
            <li><strong>Floor:</strong> {property.floor}</li>
            <li><strong>Total Floors:</strong> {property.totalFloors}</li>
            <li><strong>Parking:</strong> {property.parking}</li>
          </ul>
        </div>

        <div className="bg-white p-10 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-black flex items-center gap-2">
            📍 Location
          </h2>
          <ul className="space-y-3 text-gray-700 text-lg">
            <li><strong>Address:</strong> {property.address}</li>
            <li><strong>City:</strong> {property.city}</li>
            <li><strong>State:</strong> {property.state}</li>
            <li><strong>Pincode:</strong> {property.pincode}</li>
          </ul>
        </div>
      </div>

      {/* ==================== OWNER ==================== */}
      <div ref={ownerRef} className="bg-white p-10 shadow-lg mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-black flex items-center gap-2">
            👤 Owner Details
          </h2>
          <div className="space-y-2 text-lg text-gray-700">
            <p><strong>Name:</strong> {property.ownerName || <span className="text-gray-400">Not provided</span>}</p>
            <p><strong>Phone:</strong> {property.ownerPhone || <span className="text-gray-400">Not provided</span>}</p>
            <p><strong>Email:</strong> {property.ownerEmail || <span className="text-gray-400">Not provided</span>}</p>
          </div>
        </div>
      </div>

      {/* ==================== DESCRIPTION ==================== */}
      <div className="bg-white p-10 shadow-lg mb-12">
        <h2 className="text-2xl font-bold mb-6 text-black flex items-center gap-2">
          📝 Description
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          {property.description}
        </p>
      </div>

      {/* ==================== GOOGLE MAP ==================== */}
      <div className="bg-white p-10 shadow-lg mb-6">
        <h2 className="text-2xl font-bold mb-6 text-black flex items-center gap-2">
          🗺 Location Map
        </h2>
        <iframe
          className="shadow-md w-full h-80 mb-4"
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            `${property.address}, ${property.city}, ${property.state}, ${property.pincode}`
          )}&output=embed`}
        ></iframe>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            `${property.address}, ${property.city}, ${property.state}, ${property.pincode}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-black font-semibold hover:underline"
        >
          👉 View on Google Maps
        </a>
      </div>
    </div>
  );
};

export default Individual;
