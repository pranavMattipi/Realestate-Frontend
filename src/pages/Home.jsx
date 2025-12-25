// src/pages/Home.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Header images
import headerImg1 from "../assets/pexels-lkloeppel-466685.jpg";
import headerImg2 from "../assets/pexels-peng-liu-45946-169647.jpg";
import headerImg3 from "../assets/pexels-nout-gons-80280-378570.jpg";

// Content images
import aboutImg1 from "../assets/pexels-binyaminmellish-186077.jpg"; 
import aboutImg2 from "../assets/pexels-falling4utah-1080721.jpg";

// Team images
import teamImg1 from "../assets/pexels-hannah-nelson-390257-1065084.jpg";
import teamImg2 from "../assets/pexels-justin-shaifer-501272-1222271.jpg";
import teamImg3 from "../assets/pexels-olly-774909.jpg";

const Home = () => {
  const navigate = useNavigate();
  const images = [headerImg1, headerImg2, headerImg3];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    if (e.touches?.length) touchStartX = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    if (e.touches?.length) touchEndX = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const distance = touchStartX - touchEndX;
    if (Math.abs(distance) > 50) distance > 0 ? nextSlide() : prevSlide();
  };

  const handleViewProperties = (e) => {
    if (e?.preventDefault) e.preventDefault();
    const token = localStorage.getItem("token");
    token ? navigate("/properties") : navigate("/login");
  };

  return (
    <div className="w-full">

      {/* HEADER SLIDER */}
      <div
        className="w-full h-[350px] md:h-[450px] relative overflow-hidden rounded-xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[currentIndex]}
          alt="Header"
          className="w-full h-full object-cover rounded-xl transition-all duration-500"
        />

        <div className="absolute inset-0 bg-black/40 rounded-xl flex flex-col items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold">
            Find Your Dream Property
          </h1>
          <p className="text-white mt-3 text-lg md:text-xl text-center max-w-2xl">
            Discover verified homes, rentals, and investment opportunities
            across top cities with ease and confidence.
          </p>

          <Link
            to="/properties"
            onClick={handleViewProperties}
            className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition duration-300"
          >
            View All Properties
          </Link>
        </div>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-5 -translate-y-1/2 bg-white/70 hover:bg-white text-black p-2 rounded-full shadow-md"
        >
          ◀
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-5 -translate-y-1/2 bg-white/70 hover:bg-white text-black p-2 rounded-full shadow-md"
        >
          ▶
        </button>
      </div>

      {/* ABOUT */}
      <div className="px-4 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img
            src={aboutImg1}
            alt="About"
            className="w-full h-[340px] object-cover rounded-xl shadow-xl"
          />

          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              About RealEstateHub
            </h2>
            <p className="text-gray-600 leading-7 text-lg">
              RealEstateHub is a modern real estate platform designed to simplify
              property discovery and management. From browsing listings to
              contacting owners directly, we remove complexity and save your
              valuable time.
            </p>
            <p className="text-gray-600 leading-7 text-lg mt-4">
              Our goal is to provide transparency, trust, and technology-driven
              solutions for buyers, sellers, and renters.
            </p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="px-4 py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 leading-7 text-lg">
              We focus on verified listings, powerful search filters, and
              user-friendly design. Whether you're buying your first home or
              managing multiple properties, our platform adapts to your needs.
            </p>
            <p className="text-gray-600 leading-7 text-lg mt-4">
              With no unnecessary middlemen, you connect faster and make better
              property decisions.
            </p>
          </div>

          <img
            src={aboutImg2}
            alt="Properties"
            className="w-full h-[340px] object-cover rounded-xl shadow-xl"
          />
        </div>
      </div>

      {/* FEATURES */}
      <div className="px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Platform Highlights
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-xl shadow text-center">
            <h3 className="text-xl font-semibold mb-3">Verified Properties</h3>
            <p className="text-gray-600">
              Each listing is reviewed to ensure accurate information and trust.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow text-center">
            <h3 className="text-xl font-semibold mb-3">Smart Search</h3>
            <p className="text-gray-600">
              Filter by location, price, type, and amenities in seconds.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow text-center">
            <h3 className="text-xl font-semibold mb-3">Direct Contact</h3>
            <p className="text-gray-600">
              Communicate directly with property owners or sellers.
            </p>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="px-4 py-20 bg-blue-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-4xl font-bold text-blue-600">10K+</h3>
            <p className="text-gray-700 mt-2">Verified Listings</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">5K+</h3>
            <p className="text-gray-700 mt-2">Happy Customers</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">15+</h3>
            <p className="text-gray-700 mt-2">Cities Covered</p>
          </div>
        </div>
      </div>

      {/* TEAM */}
      <div className="px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Meet Our Team
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <div className="text-center shadow-lg p-6 rounded-xl bg-white">
            <img src={teamImg1} className="w-28 h-28 mx-auto rounded-full object-cover" />
            <h3 className="text-xl font-bold mt-4">Lana Del Ray</h3>
            <p className="text-gray-600">Frontend Developer</p>
          </div>

          <div className="text-center shadow-lg p-6 rounded-xl bg-white">
            <img src={teamImg2} className="w-28 h-28 mx-auto rounded-full object-cover" />
            <h3 className="text-xl font-bold mt-4">Micheal Jackson</h3>
            <p className="text-gray-600">Backend Developer</p>
          </div>

          <div className="text-center shadow-lg p-6 rounded-xl bg-white">
            <img src={teamImg3} className="w-28 h-28 mx-auto rounded-full object-cover" />
            <h3 className="text-xl font-bold mt-4">Selena Gomez</h3>
            <p className="text-gray-600">UI/UX Designer</p>
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      

    </div>
  );
};

export default Home;
