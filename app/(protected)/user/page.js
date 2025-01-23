'use client';
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutForm() {
  const router = useRouter();

  const onSubmit = () => {
    signOut(auth).then(() => {
      router.push("/");
    }).catch((error) => {
      console.error("Logout failed:", error.message);
    });
  };

  return (
    <div>
      <h1>Are you sure you want to log out?</h1>
      <button onClick={onSubmit}>Logout</button>
    </div>
  );
}
