// src/pages/AboutUs.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  /* ================= AUTH CHECK (MATCHES Home.jsx) ================= */
  const handleBrowseProperties = () => {
    const token = localStorage.getItem("token");
    token ? navigate("/properties") : navigate("/login");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      {/* ================== HEADER ================== */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          About <span className="text-blue-600">EstatePro</span>
        </h1>
        <p className="text-gray-600 text-lg mt-4 max-w-3xl mx-auto">
          EstatePro is your trusted digital real estate partner, helping buyers,
          renters, and property owners connect effortlessly. Our goal is to
          simplify the entire property journey through smart technology,
          verified data, and intuitive design.
        </p>
      </div>

      {/* ================== TWO COLUMN SECTION ================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <img
          src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg"
          alt="About Us"
          className="w-full rounded-2xl shadow-lg object-cover h-[380px]"
        />

        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            EstatePro is a modern real estate platform built with one mission:
            to make buying, renting, and selling properties smoother, faster,
            and more transparent.
          </p>

          <p className="text-gray-700 leading-relaxed text-lg mt-4">
            From first-time home buyers to seasoned investors, we support users
            at every stage by providing reliable listings, powerful search
            tools, and direct communication with property owners.
          </p>
        </div>
      </div>

      {/* ================== VISION & MISSION ================== */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
          Our Vision & Mission
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow border">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Our Vision
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To become the most trusted and user-friendly real estate platform,
              empowering people to make confident property decisions through
              transparency, innovation, and simplicity.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow border">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To connect buyers, renters, and sellers directly, eliminate
              unnecessary middlemen, and provide a seamless digital experience
              that saves time, effort, and money.
            </p>
          </div>
        </div>
      </div>

      {/* ================== FEATURES ================== */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
          What Makes Us Special
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow border text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              🔍 Verified Listings
            </h3>
            <p className="text-gray-700">
              Every property is carefully screened to ensure accuracy,
              authenticity, and trust.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow border text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              ⚡ Smart Filters
            </h3>
            <p className="text-gray-700">
              Advanced filters help you quickly narrow down properties based on
              location, price, type, and preferences.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow border text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              📞 Direct Owner Contact
            </h3>
            <p className="text-gray-700">
              No brokers in between — communicate directly with owners for
              faster and more transparent decisions.
            </p>
          </div>
        </div>
      </div>

      {/* ================== HOW IT HELPS ================== */}
      <div className="mb-20 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          How EstatePro Helps You
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          EstatePro brings together technology and real estate expertise to
          deliver a platform that is simple to use, reliable, and efficient.
          Whether you are browsing properties, managing your listings, or
          connecting with owners, every feature is designed to save time and
          build confidence.
        </p>
      </div>

      {/* ================== FINAL CTA ================== */}
      <div className="bg-blue-50 p-10 rounded-2xl text-center border shadow">
        <h2 className="text-3xl font-bold text-gray-900">
          Ready to find your dream home?
        </h2>
        <p className="text-gray-700 text-lg mt-3">
          Explore thousands of verified property listings across top cities.
        </p>

        <button
          onClick={handleBrowseProperties}
          className="inline-block mt-6 px-8 py-3 bg-blue-600 text-white text-lg rounded-xl shadow hover:bg-blue-700 transition"
        >
          Browse Properties
        </button>
      </div>

    </div>
  );
};

export default AboutUs;
