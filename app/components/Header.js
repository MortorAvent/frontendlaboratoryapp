"use client"
import Link from "next/link";
import { useAuth } from "@/app/lib/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/"); // Przekierowanie na stronę główną
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">My App</h1>
        <nav className="flex space-x-4">
          {user ? (
            <>
              <Link href="/user/profile" className="text-gray-700 hover:text-blue-500">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-blue-500"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/user/signin" className="text-gray-700 hover:text-blue-500">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

  