"use client";

import { useState } from "react";
import { useAuth } from "@/app/lib/AuthContext";
import { db } from "@/app/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AddTrainee() {
  const { user } = useAuth(); // Aktualnie zalogowany trener
  const router = useRouter(); // Hook do nawigacji
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    height: "",
    weight: "",
    age: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.firstName || !form.lastName || !form.height || !form.weight || !form.age) {
      setMessage("Wszystkie pola są wymagane.");
      return;
    }

    try {
      // Dodaj nowy dokument do kolekcji articles
      await addDoc(collection(db, "articles"), {
        firstName: form.firstName,
        lastName: form.lastName,
        height: parseInt(form.height),
        weight: parseInt(form.weight),
        age: parseInt(form.age),
        trainerId: user.uid, // UID trenera
      });

      // Po sukcesie przekieruj do listy podopiecznych
      router.push("/trainees/list");
    } catch (error) {
      console.error("Błąd podczas dodawania podopiecznego:", error);
      setMessage("Nie udało się dodać podopiecznego.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black to-[#C5B358]">
      <div className="w-full max-w-md bg-black text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#C5B358]">
          Dodaj podopiecznego
        </h1>
        {message && (
          <div className="bg-red-600 text-white px-4 py-3 rounded-lg mb-4 text-center">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Imię"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className="w-full px-3 py-2 mb-4 border border-[#C5B358] rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5B358]"
            required
          />
          <input
            type="text"
            placeholder="Nazwisko"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className="w-full px-3 py-2 mb-4 border border-[#C5B358] rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5B358]"
            required
          />
          <input
            type="number"
            placeholder="Wzrost (cm)"
            value={form.height}
            onChange={(e) => setForm({ ...form, height: e.target.value })}
            className="w-full px-3 py-2 mb-4 border border-[#C5B358] rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5B358]"
            required
          />
          <input
            type="number"
            placeholder="Waga (kg)"
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
            className="w-full px-3 py-2 mb-4 border border-[#C5B358] rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5B358]"
            required
          />
          <input
            type="number"
            placeholder="Wiek (lata)"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            className="w-full px-3 py-2 mb-4 border border-[#C5B358] rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5B358]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#C5B358] text-black py-3 px-4 rounded-full hover:bg-white hover:text-[#C5B358] transition duration-300"
          >
            Dodaj
          </button>
        </form>
      </div>
    </div>
  );
}
