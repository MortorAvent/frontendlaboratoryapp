export default function Footer() {
    return (
      <footer className="border-t border-black text-white py-6 drop-shadow-lg">
        <div className="container mx-auto text-center ">
          <p className="text-sm">
            © 2025 Duda Athletics. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="#" className="text-black hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="text-black hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    );
  }
  
