"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/app/lib//firebase";
import { useRouter } from "next/navigation";

export default function LogoutForm(){

    const router = useRouter();
    
    const onSubmit = () => {
        signOut(auth);
        router.push("/");
    };
    
    return(
        <div className="text-center">
          <p className="text-lg mb-10 text-gray-200">
            Zostałeś pomyślnie wylogowany!
          </p>
          <button onClick={onSubmit} className="text-black bg-[#C5B358] py-2 px-4 rounded-full hover:bg-white hover:text-[#C5B358] transition">
            Przejdź do strony głównej
          </button>
        </div>
    );
}
