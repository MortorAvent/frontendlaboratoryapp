"use client";
import Image from 'next/image';
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-4">
            <Image src="/public/images/logo_icon.png" alt="Duda Athletics Logo" width={100} height={100} /><img src="/media/logo_icon.png" alt="Logo Icon" className="w-12 h-12" />
            <h1 className="text-xl font-bold text-gold-vegas">Duda Athletics</h1>
        </div>

        {/* Nawigacja */}
        <nav className="flex space-x-6">
          <Link href="/" className="text-white hover:text-gold-vegas">
            Home
          </Link>
          <Link href="/about" className="text-white hover:text-gold-vegas">
            About
          </Link>
          <Link href="/services" className="text-white hover:text-gold-vegas">
            Services
          </Link>
          <Link href="/contact" className="text-white hover:text-gold-vegas">
            Contact
          </Link>
          <Link href="/user/signin" className="text-white hover:text-gold-vegas">
            Logowanie
          </Link>
        </nav>
      </div>
    </header>
  );
}

  