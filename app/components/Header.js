"use client";

import Link from "next/link";
import { useAuth } from "@/app/lib/AuthContext";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className=" border-black border-b shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center space-x-4">
            <img src="/images/logo_icon.png" alt="Duda Athletics Logo" className="w-30 h-24" />
            <h1 className="text-4xl font-bold text-[#C5B358]">Duda Athletics</h1>
          </div>
        </Link>

        {/* Nawigacja */}
        <nav className="flex items-center space-x-6">
          {user ? (
            <>
              <Link href="/user/profile">
                <img
                  src={user.photoURL || "/images/avatar.jpg"}
                  alt="Zdjęcie profilowe"
                  className="w-12 h-12 rounded-full border border-[#C5B358] cursor-pointer"
                />
              </Link>
              <Link href="/user/signout">
              <button
                className="text-white bg-red-600 py-2 px-4 rounded-full hover:bg-red-700 transition"
              >
                Wyloguj się
              </button>
              </Link>
            </>
          ) : (
            <Link href="/user/signin">
              <button className="text-black bg-[#C5B358] py-2 px-4 rounded-full hover:bg-white hover:text-[#C5B358] transition">
                Zaloguj się
              </button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
