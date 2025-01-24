"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useEffect } from "react";
import { useAuth } from "@/app/lib/AuthContext";
import { useRouter } from "next/navigation";

export default function VerifyEmail() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // Wyloguj użytkownika po wyświetleniu strony
      signOut(auth).then(() => {
        console.log("User signed out after email verification reminder.");
      });
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center ">
      <div className="w-full max-w-md bg-black text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#C5B358]">
          Potwierdź swój adres email
        </h1>
        <p className="text-center text-gray-300 mb-6">
          Wysłaliśmy wiadomość na adres <span className="text-[#C5B358]">{user?.email}</span>.
          Aby dokończyć rejestrację, kliknij link weryfikacyjny w wiadomości e-mail.
        </p>
        <p className="text-center text-gray-400 mb-6">
          Po potwierdzeniu możesz zalogować się i w pełni korzystać z naszej aplikacji.
        </p>
        <div className="text-center">
          <button
            onClick={() => router.push("/user/signin")}
            className="w-full bg-[#C5B358] text-black py-3 px-4 rounded-full hover:bg-white hover:text-[#C5B358] transition duration-300"
          >
            Przejdź do logowania
          </button>
        </div>
      </div>
    </div>
  );
}
