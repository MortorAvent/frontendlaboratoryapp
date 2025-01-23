import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4 text-center">
        <p>© 2025 My App. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link href="/privacy" className="hover:text-blue-400">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-blue-400">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

