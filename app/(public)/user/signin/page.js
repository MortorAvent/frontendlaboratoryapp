'use client';

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

  console.log("Email:", email);
  console.log("Password:", password);

    // Walidacja pól
    if (!email || !password) {
      setError("Email and password are required.");
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
        setError("User not found. Please check your email.");
      } else if (errorCode === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (errorCode === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
