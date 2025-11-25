// src/pages/AddProperty.jsx
import React, { useState } from "react";
import axios from "axios";

const AddProperty = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    type: "sale",
    bedrooms: "",
    bathrooms: "",
    area: "",
    address: "",
    city: "",
    images: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/properties", form);
      alert("Property added!");
      setForm({
        title: "",
        description: "",
        price: "",
        type: "sale",
        bedrooms: "",
        bathrooms: "",
        area: "",
        address: "",
        city: "",
        images: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error adding property");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Property</h2>
      <form className="space-y-2 max-w-md" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="images"
          placeholder="Image URL"
          value={form.images}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
