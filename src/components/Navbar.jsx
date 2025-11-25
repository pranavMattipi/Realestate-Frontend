// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CITY_SUGGESTIONS = [
  "Hyderabad",
  "Bangalore",
  "Mumbai",
  "Chennai",
  "Pune",
  "Delhi",
  "Kolkata",
  "Noida",
  "Gurgaon",
  "Ahmedabad",
];

const Navbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  // SEARCH STATES
  const [searchText, setSearchText] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) setUserName(savedName);
  }, []);

  // Handle input typing
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.trim() === "") {
      setFilteredCities([]);
      return;
    }

    const matches = CITY_SUGGESTIONS.filter((city) =>
      city.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredCities(matches);
    setShowSuggestions(true);
  };

  // Search on clicking suggestion
  const handleSuggestionClick = (city) => {
    setSearchText(city);
    setShowSuggestions(false);
    navigate(`/properties?city=${city}`);
  };

  // Search when pressing Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchText.trim() !== "") {
      navigate(`/properties?city=${searchText}`);
      setShowSuggestions(false);
    }
  };

  const handleSearchButton = () => {
    if (searchText.trim() !== "") {
      navigate(`/properties?city=${searchText}`);
      setShowSuggestions(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUserName("");
    navigate("/login");
  };

  // ✅ Check if user is logged in
  const handleProtectedClick = (path) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              RealEstatePro
            </Link>
          </div>

          {/* SEARCHBAR */}
          <div className="flex-1 mx-6 relative">
            <div className="relative w-full">
              <input
                type="text"
                value={searchText}
                onChange={handleSearchInput}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search by city..."
                className="w-full border border-gray-300 rounded-full px-4 py-2 pr-28 bg-white"
              />

              <button
                onClick={handleSearchButton}
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-full"
              >
                Search
              </button>
            </div>

            {/* AUTO SUGGESTIONS */}
            {showSuggestions && filteredCities.length > 0 && (
              <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-50">
                {filteredCities.map((city, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSuggestionClick(city)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}

            {/* NO MATCH FOUND */}
            {showSuggestions && searchText !== "" && filteredCities.length === 0 && (
              <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-50 px-4 py-2 text-gray-500">
                No results found
              </div>
            )}
          </div>

          {/* NAV LINKS */}
          <div className="hidden md:flex items-center space-x-4">

            <button
              onClick={() => handleProtectedClick("/buy")}
              className="text-gray-700 hover:text-blue-600"
            >
              Buy
            </button>

            <button
              onClick={() => handleProtectedClick("/rent")}
              className="text-gray-700 hover:text-blue-600"
            >
              Rent
            </button>

            <button
              onClick={() => handleProtectedClick("/sell")}
              className="text-gray-700 hover:text-blue-600"
            >
              Sell
            </button>

            {/* AUTH SECTION */}
            {userName ? (
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-gray-800">
                  Hi, {userName}
                </span>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-400 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-500 transition"
              >
                Login / Sign-Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
