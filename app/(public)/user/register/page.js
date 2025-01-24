"use client";

import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setError("Hasła nie pasują do siebie!");
      return;
    }

    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(auth.currentUser);
      setSuccess("Rejestracja powiodła się! Sprawdź swój email, aby zweryfikować konto.");
      await signOut(auth);
      setTimeout(() => {
        router.push("/user/verify");
      }, 3000);
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Ten email jest już zarejestrowany.");
      } else if (err.code === "auth/weak-password") {
        setError("Hasło jest zbyt słabe. Wprowadź silniejsze hasło.");
      } else {
        setError("Wystąpił błąd. Spróbuj ponownie.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center  ">
      <div className="w-full max-w-md bg-black text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#C5B358]">Zarejestruj się</h1>
        {error && (
          <div className="bg-red-600 text-white px-4 py-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-600 text-white px-4 py-3 rounded-lg mb-4 text-center">
            {success}
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
              placeholder="Wprowadź swój email"
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
              placeholder="Wprowadź swoje hasło"
              className="w-full px-3 py-2 border border-[#C5B358] rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5B358]"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-[#C5B358]">
              Potwierdź hasło
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Potwierdź swoje hasło"
              className="w-full px-3 py-2 border border-[#C5B358] rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5B358]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#C5B358] text-black py-3 px-4 rounded-full hover:bg-white hover:text-[#C5B358] transition duration-300"
          >
            Zarejestruj się
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Masz już konto?{" "}
          <a href="/user/signin" className="text-[#C5B358] hover:underline">
            Zaloguj się
          </a>
        </p>
      </div>
    </div>
  );
}
