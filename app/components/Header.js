import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">My App</h1>
        <nav className="flex space-x-4">
          <Link href="/" className="text-gray-700 hover:text-blue-500">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-500">
            About
          </Link>
          <Link href="/user/signin" className="text-gray-700 hover:text-blue-500">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
  