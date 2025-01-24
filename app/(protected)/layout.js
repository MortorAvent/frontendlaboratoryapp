'use client';
import { useAuth } from '@/app/lib/AuthContext';
import { useRouter } from 'next/navigation';

function ProtectedLayout({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  

  if (!user) {
    return (
      <div className="flex items-center justify-center ">
        <div className=" rounded-lg shadow-2xl p-8 w-full max-w-md text-center border-2 border-black">
          <h1 className="text-2xl font-bold text-var(--text-main) mb-4">
            Musisz się zalogować
          </h1>
          <p className="text-red-500 mb-6">
            Aby uzyskać dostęp do tej strony, prosimy o zalogowanie się!
          </p>
          <button
            onClick={() => router.push('/user/signin')}
            className="bg-var(--primary) text-white py-2 px-6 rounded-lg hover:bg-var(--primary-dark) transition duration-300">
            Przejdź do logowania
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default ProtectedLayout;