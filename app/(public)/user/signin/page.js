"use client";

import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInForm() {
  const auth = getAuth();
  const params = useSearchParams();
  const router = useRouter();
  const returnUrl = params.get("returnUrl") || "/"; // Domyślne przekierowanie na stronę główną

  const [error, setError] = useState(""); // Stan na przechowywanie błędów

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Resetuj poprzedni błąd

    const email = e.target["email"].value;
    const password = e.target["password"].value;

    // Walidacja pól
    if (!email || !password) {
      setError("Email i hasło są wymagane.");
      return;
    }

    try {
      await setPersistence(auth, browserSessionPersistence); // Ustaw tryb sesji
      await signInWithEmailAndPassword(auth, email, password); // Logowanie
      router.push(returnUrl); // Przekierowanie
    } catch (err) {
      console.error(err.code, err.message);
      // Obsługa błędów Firebase
      const errorCode = err.code;
      if (errorCode === "auth/user-not-found") {
        setError("Nie znaleziono użytkownika. Sprawdź swój email.");
      } else if (errorCode === "auth/wrong-password") {
        setError("Nieprawidłowe hasło. Spróbuj ponownie.");
      } else if (errorCode === "auth/invalid-email") {
        setError("Nieprawidłowy format adresu email.");
      } else {
        setError("Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="w-full max-w-md bg-black text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#C5B358]">Zaloguj się</h1>
        {error && (
          <div className="bg-red-600 text-white px-4 py-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-[#C5B358]">
              Adres Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Wpisz swój email"
              className="w-full px-3 py-2 border border-[#C5B358] rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5B358]"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-2 text-[#C5B358]">
              Hasło
            </label>
            <input
              type="password"
              name="password"
              placeholder="Wpisz swoje hasło"
              className="w-full px-3 py-2 border border-[#C5B358] rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5B358]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#C5B358] text-black py-3 px-4 rounded-full hover:bg-white hover:text-[#C5B358] transition duration-300"
          >
            Zaloguj się
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Nie masz konta?{" "}
          <a href="/user/register" className="text-[#C5B358] hover:underline">
            Zarejestruj się tutaj
          </a>
        </p>
      </div>
    </div>
  );
}
