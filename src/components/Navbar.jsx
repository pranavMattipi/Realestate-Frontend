import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DEFAULT_CITY_SUGGESTIONS = [
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

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const [searchText, setSearchText] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allSuggestions, setAllSuggestions] = useState([]);

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) setUserName(savedName);

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/properties`);
        const data = await res.json();

        const titles = [];
        const citySet = new Set(DEFAULT_CITY_SUGGESTIONS);

        data.forEach((p) => {
          if (p.title) titles.push({ type: "title", value: p.title });
          if (p.city) citySet.add(p.city);
        });

        const cities = [...citySet].map((c) => ({ type: "city", value: c }));
        setAllSuggestions([...cities, ...titles]);
      } catch {
        setAllSuggestions(
          DEFAULT_CITY_SUGGESTIONS.map((c) => ({ type: "city", value: c }))
        );
      }
    };

    fetchSuggestions();
  }, []);

  // INPUT CHANGE
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (!value.trim()) {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const matches = allSuggestions.filter((s) =>
      s.value.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredSuggestions(matches);
    setShowSuggestions(true);
  };

  // 🔍 NAVIGATE TO SEARCH PAGE
  const goToSearch = (query) => {
    if (!query.trim()) return;
    setShowSuggestions(false);
    navigate(`/search?query=${encodeURIComponent(query.trim())}`);
  };

  // CLICK SUGGESTION
  const handleSuggestionClick = (sugg) => {
    setSearchText(sugg.value);
    goToSearch(sugg.value);
  };

  // ENTER KEY
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      goToSearch(searchText);
    }
  };

  // 🔘 SEARCH BUTTON (FIXED)
  const handleSearchButton = () => {
    goToSearch(searchText);
  };

  const clearSearch = (e) => {
    e.preventDefault();
    setSearchText("");
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  const handleLogout = () => {
    // Only remove authentication/session keys, NOT cart or other user data
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    setUserName("");
    navigate("/login");
  };

  const handleProtectedClick = (path) => {
    const token = localStorage.getItem("token");
    navigate(token ? path : "/login");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            RealEstatePro
          </Link>

          {/* SEARCH */}
          <div className="flex-1 mx-6 relative">
            <input
              value={searchText}
              onChange={handleSearchInput}
              onKeyDown={handleKeyDown}
              placeholder="Search by city or apartment name..."
              className="w-full border rounded-full px-4 py-2 pr-28"
            />

            {searchText && (
              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={clearSearch}
                className="absolute right-20 top-1/2 -translate-y-1/2 text-gray-500"
              >
                ×
              </button>
            )}

            <button
              onClick={handleSearchButton}
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-full"
            >
              Search
            </button>

            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-50">
                {filteredSuggestions.map((s, i) => (
                  <div
                    key={i}
                    onClick={() => handleSuggestionClick(s)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"
                  >
                    <span>{s.value}</span>
                    <span className="text-xs text-gray-400">
                      {s.type === "city" ? "City" : "Apartment"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* NAV */}
          <div className="hidden md:flex gap-4 items-center">
            <button onClick={() => handleProtectedClick("/buy")}>Buy</button>
            <button onClick={() => handleProtectedClick("/rent")}>Rent</button>
            <button onClick={() => handleProtectedClick("/sell")}>Sell</button>

            <Link to="/cart" className="bg-yellow-400 px-3 py-1 rounded-full">
              To Cart
            </Link>

            {userName ? (
              <>
                <span>Hi, {userName}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-full"
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
