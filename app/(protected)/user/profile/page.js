"use client";

import { useState } from "react";
import { useAuth } from "@/app/lib/AuthContext"; // Import AuthContext dla zarządzania użytkownikiem

export default function ProfilePage() {
  const { user, setUser } = useAuth(); // Pobieranie danych użytkownika i metody setUser z kontekstu
  const [form, setForm] = useState({
    displayName: user?.displayName || "Szczepan Duda",
    photoURL: user?.photoURL || "/images/avatar.jpg", // Domyślne zdjęcie profilowe
  });
  const [message, setMessage] = useState("");

  // Obsługa zmiany zdjęcia
  const handleSelectPhoto = (photo) => {
    setForm((prev) => ({ ...prev, photoURL: `/images/${photo}` }));
    setMessage("");
  };

  // Obsługa formularza
  const handleSubmit = (e) => {
    e.preventDefault();

    // Aktualizacja danych użytkownika w AuthContext
    setUser((prev) => ({
      ...prev,
      displayName: form.displayName,
      photoURL: form.photoURL,
    }));

    setMessage("Profil został zaktualizowany!");
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="w-full max-w-md bg-black text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#C5B358]">Twój Profil</h1>
        {message && (
          <div className="bg-green-600 text-white px-4 py-3 rounded-lg mb-4 text-center">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="displayName" className="block text-sm font-medium mb-2 text-[#C5B358]">
              Imię i nazwisko
            </label>
            <input
              type="text"
              id="displayName"
              value={form.displayName}
              onChange={(e) => setForm({ ...form, displayName: e.target.value })}
              className="w-full px-3 py-2 border border-[#C5B358] rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5B358]"
              placeholder="Wprowadź swoje imię i nazwisko"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-[#C5B358]">
              Zdjęcie profilowe
            </label>
            {/* Wyświetlenie aktualnego zdjęcia profilowego */}
            <img
              src={form.photoURL}
              alt="Zdjęcie profilowe"
              className="w-24 h-24 rounded-full mx-0 border border-[#C5B358]"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-[#C5B358]">
              Wybierz nowe zdjęcie
            </label>
            <div className="flex space-x-4">
              {["avatar.jpg", "logo_icon.png", "avatar2.jpg"].map((photo) => (
                <button
                  key={photo}
                  type="button"
                  onClick={() => handleSelectPhoto(photo)}
                  className="border border-gray-300 p-0 rounded-full hover:border-[#C5B358] focus:outline-none"
                >
                  <img
                    src={`/images/${photo}`}
                    alt={photo}
                    className="w-20 h-20 rounded-full"
                  />
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#C5B358] text-black py-3 px-4 rounded-full hover:bg-white hover:text-[#C5B358] transition duration-300"
          >
            Zapisz zmiany
          </button>
        </form>
      </div>
    </div>
  );
}
