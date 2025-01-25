"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/lib/AuthContext";
import { db } from "@/app/lib/firebase";
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";

export default function TraineesList() {
  const { user } = useAuth();
  const [trainees, setTrainees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTrainee, setEditingTrainee] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    height: "",
    weight: "",
    age: "",
  });

  useEffect(() => {
    const fetchTrainees = async () => {
      const q = query(collection(db, "articles"), where("trainerId", "==", user.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTrainees(data);
      setLoading(false);
    };

    if (user) fetchTrainees();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "articles", id));
      setTrainees((prev) => prev.filter((trainee) => trainee.id !== id));
      alert("Podopieczny został usunięty!");
    } catch (error) {
      console.error("Błąd podczas usuwania podopiecznego:", error);
      alert("Nie udało się usunąć podopiecznego.");
    }
  };

  const handleEdit = (trainee) => {
    setEditingTrainee(trainee);
    setForm({
      firstName: trainee.firstName,
      lastName: trainee.lastName,
      height: trainee.height,
      weight: trainee.weight,
      age: trainee.age,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, "articles", editingTrainee.id), {
        firstName: form.firstName,
        lastName: form.lastName,
        height: parseInt(form.height),
        weight: parseInt(form.weight),
        age: parseInt(form.age),
      });

      setTrainees((prev) =>
        prev.map((trainee) =>
          trainee.id === editingTrainee.id
            ? { ...trainee, ...form }
            : trainee
        )
      );

      alert("Podopieczny został zaktualizowany!");
      setEditingTrainee(null); // Zamknij modal
    } catch (error) {
      console.error("Błąd podczas aktualizowania podopiecznego:", error);
      alert("Nie udało się zaktualizować podopiecznego.");
    }
  };

  if (loading) {
    return <p>Ładowanie danych...</p>;
  }

  return (
    <div className="p-4  text-white">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#C5B358]">Twoi Podopieczni</h1>
          <Link href="/trainees/add">
            <button className="py-3 px-8 rounded-full text-black bg-[#C5B358] hover:bg-white hover:text-[#C5B358] border border-[#C5B358] transition duration-300 shadow-md">
              Dodaj podopiecznego
            </button>
          </Link>
        </div>

        {trainees.length === 0 ? (
          <p>Brak podopiecznych do wyświetlenia.</p>
        ) : (
          <ul className="space-y-4">
            {trainees.map((trainee) => (
              <li
                key={trainee.id}
                className="bg-gradient-to-br from-gray-800 to-[#3A3A3A] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-[#C5B358]">
                      {trainee.firstName} {trainee.lastName}
                    </h2>
                    <p>Wzrost: {trainee.height} cm</p>
                    <p>Waga: {trainee.weight} kg</p>
                    <p>Wiek: {trainee.age} lat</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(trainee)}
                      className="bg-yellow-500 text-black py-2 px-3 rounded hover:bg-yellow-600 transition duration-300"
                    >
                      Edytuj
                    </button>
                    <button
                      onClick={() => handleDelete(trainee.id)}
                      className="bg-red-500 text-white py-2 px-3 rounded hover:bg-red-600 transition duration-300"
                    >
                      Usuń
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {editingTrainee && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Edytuj Podopiecznego</h2>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                placeholder="Imię"
                className="w-full px-3 py-2 mb-4 border rounded"
              />
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                placeholder="Nazwisko"
                className="w-full px-3 py-2 mb-4 border rounded"
              />
              <input
                type="number"
                value={form.height}
                onChange={(e) => setForm({ ...form, height: e.target.value })}
                placeholder="Wzrost (cm)"
                className="w-full px-3 py-2 mb-4 border rounded"
              />
              <input
                type="number"
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
                placeholder="Waga (kg)"
                className="w-full px-3 py-2 mb-4 border rounded"
              />
              <input
                type="number"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                placeholder="Wiek"
                className="w-full px-3 py-2 mb-4 border rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingTrainee(null)}
                  className="py-3 px-8 rounded-full text-black gray-800 hover:bg-white hover:text-[#C5B358] border border-[#C5B358] transition duration-300 shadow-md"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="py-3 px-8 rounded-full text-black bg-[#C5B358] hover:bg-white hover:text-[#C5B358] border border-[#C5B358] transition duration-300 shadow-md"
                >
                  Zapisz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
