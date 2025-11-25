// src/pages/AboutUs.jsx
import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      {/* ================== HEADER ================== */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          About <span className="text-blue-600">EstatePro</span>
        </h1>
        <p className="text-gray-600 text-lg mt-4 max-w-2xl mx-auto">
          Your trusted partner in finding your dream home, renting with ease,
          and selling with confidence.
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
            and more transparent. We combine technology, design, and data to
            give users a seamless experience.
          </p>

          <p className="text-gray-700 leading-relaxed text-lg mt-4">
            Whether you're searching for a luxury home, an affordable rental, or
            planning to list your property for sale, our platform ensures that
            every step feels effortless.
          </p>
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
              Every property is screened and verified to ensure accuracy,
              transparency, and trust.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow border text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              ⚡ Smart Filters
            </h3>
            <p className="text-gray-700">
              Easily find the perfect property with advanced search and
              filter options tailored to your needs.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow border text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              📞 Direct Owner Contact
            </h3>
            <p className="text-gray-700">
              No middlemen. Connect directly with property owners or agents for
              faster decisions.
            </p>
          </div>
        </div>
      </div>

      {/* ================== FINAL CTA ================== */}
      <div className="bg-blue-50 p-10 rounded-2xl text-center border shadow">
        <h2 className="text-3xl font-bold text-gray-900">
          Ready to find your dream home?
        </h2>
        <p className="text-gray-700 text-lg mt-3">
          Explore thousands of property listings curated just for you.
        </p>

        <a
          href="/properties"
          className="inline-block mt-6 px-8 py-3 bg-blue-600 text-white text-lg rounded-xl shadow hover:bg-blue-700"
        >
          Browse Properties
        </a>
      </div>

    </div>
  );
};

export default AboutUs;
