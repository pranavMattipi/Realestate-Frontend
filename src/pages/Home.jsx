// src/pages/Home.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom"; // add at the top
// Header images
import headerImg1 from "../assets/pexels-lkloeppel-466685.jpg";
import headerImg2 from "../assets/pexels-peng-liu-45946-169647.jpg";
import headerImg3 from "../assets/pexels-nout-gons-80280-378570.jpg";

// Content images
import aboutImg1 from "../assets/pexels-binyaminmellish-186077.jpg"; 
import aboutImg2 from "../assets/pexels-falling4utah-1080721.jpg"; // second one, can replace later

const Home = () => {
  const images = [headerImg1, headerImg2, headerImg3];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Slide functions
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // Touch swipe states
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    if (e.touches.length >= 2) {
      touchStartX = e.touches[0].clientX;
    }
  };
  const handleTouchMove = (e) => {
    if (e.touches.length >= 2) {
      touchEndX = e.touches[0].clientX;
    }
  };
  const handleTouchEnd = () => {
    const distance = touchStartX - touchEndX;
    if (Math.abs(distance) > 50) {
      distance > 0 ? nextSlide() : prevSlide();
    }
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
          <p className="text-white mt-3 text-lg md:text-xl">
            Explore properties or list your own.
          </p>

          {/* NEW BUTTON */}
          <Link to="/properties" className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition duration-300">
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

      {/* SECTION 1: IMAGE LEFT + TEXT RIGHT */}
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
              RealEstateHub is your trusted destination to find the perfect 
              home or investment property. We provide reliable listings, easy 
              navigation, and advanced tools to help you choose the best property 
              without any hassle.
            </p>
          </div>

        </div>
      </div>

      {/* SECTION 2: TEXT LEFT + IMAGE RIGHT */}
      <div className="px-4 py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* LEFT TEXT */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 leading-7 text-lg">
              Our platform is built to give you a smooth browsing experience 
              with filters, comparison options, and verified property details. 
              Whether you're a buyer, seller, or tenant — we make your journey 
              simple and efficient.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <img
            src={aboutImg2}
            alt="Properties"
            className="w-full h-[340px] object-cover rounded-xl shadow-xl"
          />
          
        </div>
      </div>

      {/* SECTION 3: TEAM MEMBERS */}
      <div className="px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Meet Our Team
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

          {/* Team Member 1 */}
          <div className="text-center shadow-lg p-6 rounded-xl bg-white">
            <div className="w-28 h-28 mx-auto rounded-full bg-gray-300"></div>
            <h3 className="text-xl font-bold mt-4">Pranav Mattipi</h3>
            <p className="text-gray-600">Frontend Developer</p>
          </div>

          {/* Team Member 2 */}
          <div className="text-center shadow-lg p-6 rounded-xl bg-white">
            <div className="w-28 h-28 mx-auto rounded-full bg-gray-300"></div>
            <h3 className="text-xl font-bold mt-4">Member 2</h3>
            <p className="text-gray-600">Backend Developer</p>
          </div>

          {/* Team Member 3 */}
          <div className="text-center shadow-lg p-6 rounded-xl bg-white">
            <div className="w-28 h-28 mx-auto rounded-full bg-gray-300"></div>
            <h3 className="text-xl font-bold mt-4">Member 3</h3>
            <p className="text-gray-600">UI/UX Designer</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Home;
