// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios"; // <-- use your axios instance

import headerImg1 from "../assets/pexels-lkloeppel-466685.jpg";
import headerImg2 from "../assets/pexels-peng-liu-45946-169647.jpg";
import headerImg3 from "../assets/pexels-nout-gons-80280-378570.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [headerImg1, headerImg2, headerImg3];

  // Auto-change background image
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        if (form.password !== form.confirmPassword) {
          return alert("Passwords do not match");
        }

        await API.post("/auth/register", {
          name: form.name,
          email: form.email,
          password: form.password,
        });

        alert("Account created! Please login.");
        setIsSignup(false);
      } else {
        const res = await API.post("/auth/login", {
          email: form.email,
          password: form.password,
        });

        alert("Login successful!");

        // ⭐ Save token + name to localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", res.data.user.name);

        // ⭐ Redirect to Home
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="relative w-full min-h-screen flex justify-center items-center overflow-hidden">

      {images.map((img, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${img})`,
            opacity: currentIndex === index ? 1 : 0,
          }}
        />
      ))}

      <div className="relative bg-white/80 backdrop-blur-md shadow-2xl rounded-xl p-10 w-full max-w-md z-10">
        <h1 className="text-3xl font-bold text-center mb-6">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-lg"
          />

          {isSignup && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            {isSignup ? "Create Account" : "Login"}
          </button>
        </form>

        <p className="text-center mt-6">
          {isSignup ? "Already have an account? " : "Don’t have an account? "}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-600 font-semibold cursor-pointer"
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
