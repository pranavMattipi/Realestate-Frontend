// src/pages/Contact.jsx
import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-50 py-12 px-6 md:px-16">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-4 text-[#1A3E4C]">
        Contact Us
      </h1>
      <p className="text-center max-w-2xl mx-auto text-gray-600 mb-12">
        Have questions about buying, selling, or renting a property?  
        We’re here to help! Reach out to us any time.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* CONTACT FORM */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-[#1A3E4C]">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 mt-1 focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 mt-1 focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="font-medium">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                required
                className="w-full border rounded-lg p-3 mt-1 focus:ring focus:ring-blue-200"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1A3E4C] text-white p-3 rounded-lg font-medium hover:bg-[#16323d] transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* CONTACT INFO + MAP */}
        <div>
          <div className="bg-white p-8 rounded-xl shadow-md mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-[#1A3E4C]">
              Contact Details
            </h2>

            <p className="mb-2">
              📍 <strong>Office Address:</strong>  
              Hitech City, Hyderabad, Telangana
            </p>

            <p className="mb-2">
              📞 <strong>Phone:</strong> +91 98765 43210
            </p>

            <p>
              ✉️ <strong>Email:</strong> support@realestateapp.com
            </p>
          </div>

          {/* GOOGLE MAP */}
          <iframe
            className="rounded-xl shadow-md w-full h-64"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.615580588381!2d78.375!3d17.4483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93e11677599f%3A0xdb6b310a4b9a7c2e!2sHitech%20City!"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
