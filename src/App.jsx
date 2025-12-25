import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop"; // ✅ ADD THIS

// PAGES
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Properties from "./pages/Properties";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";
import Sell from "./pages/Sell";
import AddProperty from "./pages/AddProperty";
import Individual from "./pages/Individual";
import Login from "./pages/Login";
import CartPage from "./pages/CartPage";
import RecHouse from "./pages/RecHouse";

const App = () => {
  return (
    <Router>
      <ScrollToTop /> {/* ✅ FIX: always scroll to top on route change */}

      <Navbar />

      <div className="min-h-screen">
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<Individual />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />

          {/* SEARCH */}
          <Route path="/search" element={<RecHouse />} />

          {/* CART */}
          <Route path="/cart" element={<CartPage />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/buy"
            element={
              <ProtectedRoute>
                <Buy />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rent"
            element={
              <ProtectedRoute>
                <Rent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sell"
            element={
              <ProtectedRoute>
                <Sell />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-property"
            element={
              <ProtectedRoute>
                <AddProperty />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
};

export default App;
