import React, { useEffect, useState } from "react";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Sell = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  /* ================= USER KEY ================= */
  const getSellKey = () => {
    const email =
      localStorage.getItem("userEmail") ||
      localStorage.getItem("userName") ||
      "guest";
    return `sell_properties_${email}`;
  };

  /* ================= LOAD USER DATA ================= */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(getSellKey()) || "[]");
    setProperties(stored);
  }, []);

  /* ================= PERSIST ================= */
  const persist = (updated) => {
    setProperties(updated);

    // ❗ Do not store File objects in localStorage
    const safe = updated.map((p) => ({
      ...p,
      images: [],
    }));

    localStorage.setItem(getSellKey(), JSON.stringify(safe));
  };

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...properties];
    updated[index][name] = value;
    if (name === "type") updated[index].price = "";
    persist(updated);
  };

  /* ================= HANDLE IMAGE (ADD MORE) ================= */
  const handleImageChange = (index, e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));

    setProperties((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        images: [...(updated[index].images || []), ...files],           // append new files
        imagePreviews: [...(updated[index].imagePreviews || []), ...previews], // append new previews
      };

      // Save safe version without File objects
      const safe = updated.map((p) => ({ ...p, images: [] }));
      localStorage.setItem(getSellKey(), JSON.stringify(safe));
      return updated;
    });
  };

  /* ================= SUBMIT PROPERTY ================= */
  const handleSubmit = async (index) => {
    try {
      const prop = { ...properties[index] };

      // Convert numeric fields
      const numberFields = ["price", "bedrooms", "bathrooms", "area", "floor", "totalFloors"];
      numberFields.forEach((field) => {
        if (prop[field] !== "") prop[field] = Number(prop[field]);
      });

      const formData = new FormData();
      for (const key in prop) {
        if (key === "images") {
          prop.images?.forEach((f) => formData.append("images", f));
        } else if (!["_id", "imagePreviews", "saved"].includes(key)) {
          formData.append(key, prop[key] ?? "");
        }
      }

      let res;
      if (prop._id) {
        res = await API.put(`/properties/${prop._id}`, formData);
      } else {
        res = await API.post("/properties", formData);
      }

      const updated = [...properties];
      updated[index] = {
        ...updated[index],
        ...res.data,
        imagePreviews: res.data.images
          ? res.data.images.map((img) =>
              img.startsWith("http") ? img : `${API.defaults.baseURL}${img}`
            )
          : updated[index].imagePreviews,
        saved: true,
      };

      persist(updated);
      alert("Property saved successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save property");
    }
  };

  /* ================= ADD / EDIT / DELETE ================= */
  const addNewProperty = () => {
    persist([
      ...properties,
      {
        title: "",
        description: "",
        price: "",
        type: "sale",
        bedrooms: "",
        bathrooms: "",
        area: "",
        furnishing: "Unfurnished",
        propertyAge: "",
        parking: "",
        floor: "",
        totalFloors: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        ownerName: "",
        ownerPhone: "",
        ownerEmail: "",
        images: [],
        imagePreviews: [],
        saved: false,
      },
    ]);
  };

  const editProperty = (index) => {
    const updated = [...properties];
    updated[index].saved = false;
    persist(updated);
  };

  const deleteProperty = async (index) => {
    if (!window.confirm("Delete this property?")) return;

    try {
      const prop = properties[index];
      if (prop._id) {
        await API.delete(`/properties/${prop._id}`);
      }
      persist(properties.filter((_, i) => i !== index));
      alert("Property deleted");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-10">
      <h1 className="text-3xl font-bold mb-6">Sell Your Property</h1>

      {properties.map((property, index) => (
        <div key={index} className="border p-6 rounded-lg space-y-4">
          <h2 className="text-xl font-semibold">
            Property {index + 1} {property.saved && "(Saved)"}
          </h2>

          <input
            name="title"
            value={property.title}
            onChange={(e) => handleChange(index, e)}
            placeholder="Title"
            className="border p-2 w-full rounded"
          />

          <textarea
            name="description"
            value={property.description}
            onChange={(e) => handleChange(index, e)}
            placeholder="Description"
            className="border p-2 w-full rounded"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="price"
              value={property.price}
              onChange={(e) => handleChange(index, e)}
              placeholder={property.type === "rent" ? "Rent per month" : "Price"}
              className="border p-2 rounded"
            />
            <select
              name="type"
              value={property.type}
              onChange={(e) => handleChange(index, e)}
              className="border p-2 rounded"
            >
              <option value="sale">Sale</option>
              <option value="rent">Rent</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input
              name="bedrooms"
              value={property.bedrooms}
              onChange={(e) => handleChange(index, e)}
              placeholder="Bedrooms"
              className="border p-2 rounded"
            />
            <input
              name="bathrooms"
              value={property.bathrooms}
              onChange={(e) => handleChange(index, e)}
              placeholder="Bathrooms"
              className="border p-2 rounded"
            />
            <input
              name="area"
              value={property.area}
              onChange={(e) => handleChange(index, e)}
              placeholder="Area (sq ft)"
              className="border p-2 rounded"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <select
              name="furnishing"
              value={property.furnishing}
              onChange={(e) => handleChange(index, e)}
              className="border p-2 rounded"
            >
              <option value="Furnished">Furnished</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>
            <input
              name="propertyAge"
              value={property.propertyAge}
              onChange={(e) => handleChange(index, e)}
              placeholder="Property Age"
              className="border p-2 rounded"
            />
            <input
              name="parking"
              value={property.parking}
              onChange={(e) => handleChange(index, e)}
              placeholder="Parking"
              className="border p-2 rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              name="floor"
              value={property.floor}
              onChange={(e) => handleChange(index, e)}
              placeholder="Floor"
              className="border p-2 rounded"
            />
            <input
              name="totalFloors"
              value={property.totalFloors}
              onChange={(e) => handleChange(index, e)}
              placeholder="Total Floors"
              className="border p-2 rounded"
            />
          </div>

          <input
            name="address"
            value={property.address}
            onChange={(e) => handleChange(index, e)}
            placeholder="Address"
            className="border p-2 w-full rounded"
          />

          <div className="grid grid-cols-3 gap-4">
            <input
              name="city"
              value={property.city}
              onChange={(e) => handleChange(index, e)}
              placeholder="City"
              className="border p-2 rounded"
            />
            <input
              name="state"
              value={property.state}
              onChange={(e) => handleChange(index, e)}
              placeholder="State"
              className="border p-2 rounded"
            />
            <input
              name="pincode"
              value={property.pincode}
              onChange={(e) => handleChange(index, e)}
              placeholder="Pincode"
              className="border p-2 rounded"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input
              name="ownerName"
              value={property.ownerName}
              onChange={(e) => handleChange(index, e)}
              placeholder="Owner Name"
              className="border p-2 rounded"
            />
            <input
              name="ownerPhone"
              value={property.ownerPhone}
              onChange={(e) => handleChange(index, e)}
              placeholder="Owner Phone"
              className="border p-2 rounded"
            />
            <input
              name="ownerEmail"
              value={property.ownerEmail}
              onChange={(e) => handleChange(index, e)}
              placeholder="Owner Email"
              className="border p-2 rounded"
            />
          </div>

          {/* ================= IMAGE UPLOAD ================= */}
          <input
            type="file"
            multiple
            disabled={property.saved}
            onChange={(e) => handleImageChange(index, e)}
          />

          {/* ================= PREVIEWS (show backend images after submit, previews before) ================= */}
          <div className="flex gap-2 flex-wrap">
            {property.saved && property.images && property.images.length > 0
              ? property.images.map((img, i) => {
                  const BACKEND_URL = "http://${import.meta.env.VITE_API_BASE_URL}";
                  const url = img.startsWith("http") ? img : `${BACKEND_URL}${img}`;
                  return (
                    <img
                      key={i}
                      src={url}
                      alt=""
                      className="w-24 h-24 object-cover rounded"
                    />
                  );
                })
              : property.imagePreviews?.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="w-24 h-24 object-cover rounded"
                  />
                ))}
          </div>

          <div className="flex gap-4">
            {!property.saved ? (
              <button
                onClick={() => handleSubmit(index)}
                className="bg-blue-600 text-white px-6 py-2 rounded"
              >
                Submit Property
              </button>
            ) : (
              <>
                <button
                  onClick={() => editProperty(index)}
                  className="bg-yellow-500 text-white px-6 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProperty(index)}
                  className="bg-red-600 text-white px-6 py-2 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}

      <button
        onClick={addNewProperty}
        className="bg-green-600 text-white px-6 py-3 rounded"
      >
        Add Another Property
      </button>
    </div>
  );
};

export default Sell;
