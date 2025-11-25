// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";

import Home from "./pages/Home";
import Properties from "./pages/Properties";
import AddProperty from "./pages/AddProperty";
import Buy from "./pages/Buy";
import Contact from "./pages/Contact";
import Rent from "./pages/Rent";
import Sell from "./pages/Sell";
import Individual from "./pages/Individual";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Navbar />

      <div className="min-h-screen">
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/login" element={<Login />} />
          <Route path="/property/:id" element={<Individual />} />
          <Route path="/about" element={<AboutUs />} />
<Route path="/contact" element={<Contact />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/sell"
            element={
              <ProtectedRoute>
                <Sell />
              </ProtectedRoute>
            }
          />
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
