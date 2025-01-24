'use client';

import Link from 'next/link';
import { useAuth } from '@/app/lib/AuthContext';

function HomePage() {
  const { user } = useAuth();

  const greetingMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Dzień dobry';
    if (hour < 18) return 'Dzień dobry, miłego popołudnia';
    return 'Dobry wieczór';
  };

  return (
    <div className="flex flex-col items-center justify-center  ">
      {user ? (
        // Sekcja dla zalogowanego użytkownika
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-white mb-6">
            {greetingMessage()}, {user.displayName || 'Użytkowniku'}!
          </h1>
          <p className="text-lg mb-10 text-gray-200">
            Jesteś zalogowany. Odkryj pełen potencjał naszej aplikacji.
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="/user/profile">
              <button className="py-3 px-8 rounded-full text-black bg-[#C5B358] hover:bg-white hover:text-[#C5B358] border border-[#C5B358] transition duration-300 shadow-md">
                Przejdź do profilu
              </button>
            </Link>
            <Link href="/user/signout">
              <button className="py-3 px-8 rounded-full text-white bg-red-600 hover:bg-red-700 transition duration-300 shadow-md">
                Wyloguj się
              </button>
            </Link>
          </div>
        </div>
      ) : (
        // Sekcja dla niezalogowanego użytkownika
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-white mb-6">
            Witaj w aplikacji Duda Athletics!
          </h1>
          <p className="text-lg mb-10 text-gray-200">
            Dołącz do nas, aby rozpocząć swoją drogę z treningiem personalnym.
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="/user/signin">
              <button className="py-3 px-8 rounded-full text-black bg-[#C5B358] hover:bg-white hover:text-[#C5B358] border border-[#C5B358] transition duration-300 shadow-md">
                Zaloguj się
              </button>
            </Link>
            <Link href="/user/register">
              <button className="py-3 px-8 rounded-full text-black bg-white hover:bg-[#C5B358] hover:text-white border border-[#C5B358] transition duration-300 shadow-md">
                Zarejestruj się
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
