'use client';

import { useState, useEffect } from "react";
import { useAuth } from "@/app/lib/AuthContext";
import { db } from "@/app/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function ProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    city: "",
    street: "",
    zipCode: "",
  });

  useEffect(() => {
    const fetchAddress = async () => {
      setLoading(true);
      try {
        const snapshot = await getDoc(doc(db, "users", user?.uid));
        if (snapshot.exists()) {
          const address = snapshot.data().address || {};
          setForm({
            city: address.city || "",
            street: address.street || "",
            zipCode: address.zipCode || "",
          });
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load address.");
      } finally {
        setLoading(false);
      }
    };
  
    if (user) {
      fetchAddress();
    }
  }, [user]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await setDoc(doc(db, "users", user?.uid), {
        address: {
          city: form.city,
          street: form.street,
          zipCode: form.zipCode,
        },
      });
      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile. Check your permissions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Profile</h1>
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700">City</label>
          <input
            id="city"
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="street" className="block text-gray-700">Street</label>
          <input
            id="street"
            name="street"
            value={form.street}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="zipCode" className="block text-gray-700">Zip Code</label>
          <input
            id="zipCode"
            name="zipCode"
            value={form.zipCode}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}


