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
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("type", form.type);
      formData.append("bedrooms", form.bedrooms);
      formData.append("bathrooms", form.bathrooms);
      formData.append("area", form.area);
      formData.append("address", form.address);
      formData.append("city", form.city);
      formData.append("images", form.images);

      const res = await axios.post(
        "http://${import.meta.env.VITE_API_BASE_URL}/api/properties",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const created = res.data;
      if (!created || !created._id) {
        console.error("Create response did not include _id:", created);
        throw new Error("Server response missing created property id");
      }
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message || err);
      alert("Upload failed: " + (err.response?.data?.message || err.message));
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
