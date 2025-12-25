import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  const handleProtectedNavigate = (e, path) => {
    if (e && e.preventDefault) e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="w-full bg-gray-900 text-gray-300 pt-10 pb-6 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* ABOUT SECTION */}
        <div>
          <h2 className="text-2xl font-semibold text-white mb-3">RealEstateHub</h2>
          <p className="text-sm leading-6">
            RealEstatePro is your trusted platform to find, buy, rent, and list 
            properties across the country. We bring verified listings, advanced 
            property search, and an easy user experience to help you make the 
            right real estate decisions.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>

            {/* Protected: if not logged in redirect to login */}
            <li>
              <a
                href="/properties"
                onClick={(e) => handleProtectedNavigate(e, "/properties")}
                className="hover:text-white"
              >
                Browse Properties
              </a>
            </li>

            <li><Link to="/sell" className="hover:text-white">List Your Property</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact Support</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
          </ul>
        </div>

        {/* CONTACT & SOCIAL */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Get in Touch</h3>
          <p className="text-sm">
            Email: support@realestatehub.com
          </p>
          <p className="text-sm mt-1">
            Phone: +91 98765 43210
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-5 mt-5 text-xl">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white">
              <FaInstagram />
            </a>

            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white">
              <FaTwitter />
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white">
              <FaLinkedin />
            </a>

            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT BELOW */}
      <div className="text-center text-sm text-gray-400 mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} RealEstateHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
