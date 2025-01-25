"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/lib/AuthContext"; 
import { doc, setDoc, getDoc } from "firebase/firestore"; // Dodano getDoc
import { db } from "@/app/lib/firebase";

export default function ProfilePage() {
  const { user, setUser } = useAuth(); // Pobieranie danych użytkownika i metody setUser z kontekstu
  const [form, setForm] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "/images/avatar.jpg",
    city: "",
    street: "",
    zipCode: "", 
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true); // Dodano loading do obsługi ładowania danych

  // Pobieranie danych użytkownika z Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      try {
        const snapshot = await getDoc(doc(db, "users", user.uid));
        if (snapshot.exists()) {
          const data = snapshot.data();
          setForm((prev) => ({
            ...prev,
            displayName: data.displayName || "",
            photoURL: data.photoURL || "/images/avatar.jpg",
            city: data.address?.city || "",
            street: data.address?.street || "",
            zipCode: data.address?.zipCode || "",
          }));
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych użytkownika:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  // Obsługa zmiany zdjęcia
  const handleSelectPhoto = (photo) => {
    setForm((prev) => ({ ...prev, photoURL: `/images/${photo}` }));
    setMessage("");
  };

  // Obsługa formularza
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await setDoc(doc(db, "users", user.uid), {
        displayName: form.displayName,
        photoURL: form.photoURL,
        address: {
          city: form.city,
          street: form.street,
          zipCode: form.zipCode,
        },
      });

      setMessage("Profil został zaktualizowany!");
      // Zaktualizuj kontekst
      setUser((prev) => ({
        ...prev,
        displayName: form.displayName,
        photoURL: form.photoURL,
      }));
    } catch (error) {
      console.error("Błąd zapisu danych:", error);
      setMessage("Nie udało się zaktualizować profilu.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <p>Ładowanie danych...</p>
      </div>
    );
  }

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
              Dane osobiste
            </label>
            <input
              type="text"
              id="displayName"
              value={form.displayName}
              onChange={(e) => setForm({ ...form, displayName: e.target.value })}
              className="w-full px-3 py-2 border border-[#C5B358] rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5B358]"
              placeholder="Wprowadź swoje imię i nazwisko"
            />
            <input
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full px-3 py-2 border border-[#C5B358] rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5B358] mt-4"
              placeholder="Miasto"
            />
            <input
              type="text"
              value={form.street}
              onChange={(e) => setForm({ ...form, street: e.target.value })}
              className="w-full px-3 py-2 border border-[#C5B358] rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5B358] mt-4"
              placeholder="Ulica"
            />
            <input
              type="text"
              value={form.zipCode}
              onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
              className="w-full px-3 py-2 border border-[#C5B358] rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5B358] mt-4"
              placeholder="Kod pocztowy"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-[#C5B358]">
              Zdjęcie profilowe
            </label>
            <img
              src={form.photoURL}
              alt="Zdjęcie profilowe"
              className="w-24 h-24 rounded-full mx-auto border border-[#C5B358]"
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
                  className="border border-gray-300 p-2 rounded-full hover:border-[#C5B358] focus:outline-none"
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
