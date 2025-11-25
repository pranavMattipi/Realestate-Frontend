import React, { useEffect, useState } from "react";
import axios from "axios";

const Sell = () => {
  // Load from localStorage if available
  const initialProperties =
    JSON.parse(localStorage.getItem("properties")) || [
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
        images: [],
        ownerName: "",
        ownerPhone: "",
        ownerEmail: "",
        imagePreviews: [],
        saved: false,
        _id: null, // will store backend id after creation
      },
    ];

  const [properties, setProperties] = useState(initialProperties);

  // Save to localStorage whenever properties change
  useEffect(() => {
    localStorage.setItem("properties", JSON.stringify(properties));
  }, [properties]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...properties];
    updated[index][name] = value;
    if (name === "type") updated[index].price = "";
    setProperties(updated);
  };

  const handleImageChange = (index, e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((f) => URL.createObjectURL(f));
    const updated = [...properties];
    updated[index].images = files;
    updated[index].imagePreviews = urls;
    setProperties(updated);
  };

  // Create or Update (uses _id to decide)
  const handleSubmit = async (index) => {
    try {
      const prop = properties[index];
      const data = new FormData();

      // Append all fields (except client-only fields)
      for (const key in prop) {
        if (key === "images") {
          // append files
          prop.images.forEach((file) => data.append("images", file));
        } else if (key !== "imagePreviews" && key !== "saved" && key !== "_id") {
          // append other primitive fields
          data.append(key, prop[key] ?? "");
        }
      }

      let res;
      if (prop._id) {
        // UPDATE existing property
        res = await axios.put(
          `http://localhost:8000/api/properties/${prop._id}`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        // CREATE new property
        res = await axios.post("http://localhost:8000/api/properties", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      const updated = [...properties];
      updated[index].saved = true;
      updated[index]._id = res.data._id || res.data._id; // ensure id saved
      // if backend returned whole object, ensure image previews updated accordingly (optional)
      setProperties(updated);

      alert("Property saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving property. See console.");
    }
  };

  const addNewProperty = () => {
    setProperties((prev) => [
      ...prev,
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
        images: [],
        ownerName: "",
        ownerPhone: "",
        ownerEmail: "",
        imagePreviews: [],
        saved: false,
        _id: null,
      },
    ]);
  };

  const editProperty = (index) => {
    const updated = [...properties];
    updated[index].saved = false;
    setProperties(updated);
  };

  // DELETE: remove from backend if _id exists, then remove locally
  const deleteProperty = async (index) => {
    try {
      const prop = properties[index];

      const confirm = window.confirm(
        "Are you sure you want to delete this property?"
      );
      if (!confirm) return;

      // If property exists on backend, delete by id
      if (prop._id) {
        await axios.delete(`http://localhost:8000/api/properties/${prop._id}`);
      }

      // Remove locally
      const updated = properties.filter((_, i) => i !== index);
      setProperties(updated);

      alert("Property deleted.");
    } catch (err) {
      console.error(err);
      alert("Delete failed. See console for details.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-10">
      <h1 className="text-3xl font-bold mb-6">Sell Your Property</h1>

      {properties.map((property, index) => (
        <div key={index} className="border p-6 rounded-lg space-y-4">
          <h2 className="text-xl font-semibold">
            Property {index + 1} {property.saved && "(Saved)"}
          </h2>

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={property.title}
            onChange={(e) => handleChange(index, e)}
            className="border p-2 rounded w-full"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={property.description}
            onChange={(e) => handleChange(index, e)}
            className="border p-2 rounded w-full"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder={
                property.type === "rent" ? "Rent per month" : "Price"
              }
              value={property.price}
              onChange={(e) => handleChange(index, e)}
              className="border p-2 rounded"
              required
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
              type="number"
              name="bedrooms"
              placeholder="Bedrooms"
              value={property.bedrooms}
              onChange={(e) => handleChange(index, e)}
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="bathrooms"
              placeholder="Bathrooms"
              value={property.bathrooms}
              onChange={(e) => handleChange(index, e)}
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="area"
              placeholder="Area (sq ft)"
              value={property.area}
              onChange={(e) => handleChange(index, e)}
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
              type="text"
              name="propertyAge"
              placeholder="Property Age"
              value={property.propertyAge}
              onChange={(e) => handleChange(index, e)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="parking"
              placeholder="Parking"
              value={property.parking}
              onChange={(e) => handleChange(index, e)}
              className="border p-2 rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="floor"
              placeholder="Floor"
              value={property.floor}
              onChange={(e) => handleChange(index, e)}
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="totalFloors"
              placeholder="Total Floors"
              value={property.totalFloors}
              onChange={(e) => handleChange(index, e)}
              className="border p-2 rounded"
            />
          </div>

          <div>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={property.address}
              onChange={(e) => handleChange(index, e)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={property.city}
              onChange={(e) => handleChange(index, e)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={property.state}
              onChange={(e) => handleChange(index, e)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={property.pincode}
              onChange={(e) => handleChange(index, e)}
              className="border p-2 rounded"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              name="ownerName"
              placeholder="Owner Name"
              value={property.ownerName}
              onChange={(e) => handleChange(index, e)}
              className="border p-2 rounded"
            />
            <input
              type="tel"
              name="ownerPhone"
              placeholder="Owner Phone"
              value={property.ownerPhone}
              onChange={(e) => handleChange(index, e)}
              className="border p-2 rounded"
            />
            <input
              type="email"
              name="ownerEmail"
              placeholder="Owner Email"
              value={property.ownerEmail}
              onChange={(e) => handleChange(index, e)}
              className="border p-2 rounded"
            />
          </div>

          {/* Images */}
          <div>
            <input
              type="file"
              multiple
              onChange={(e) => handleImageChange(index, e)}
              className="border p-2 rounded"
              disabled={property.saved}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {property.imagePreviews.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`preview-${idx}`}
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            {!property.saved && (
              <button
                type="button"
                onClick={() => handleSubmit(index)}
                className="px-6 py-2 font-semibold rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Submit Property
              </button>
            )}

            {property.saved && (
              <>
                <button
                  type="button"
                  onClick={() => editProperty(index)}
                  className="px-6 py-2 font-semibold rounded bg-yellow-500 text-white hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => deleteProperty(index)}
                  className="px-6 py-2 font-semibold rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addNewProperty}
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
      >
        Add Another Property
      </button>
    </div>
  );
};

export default Sell;
