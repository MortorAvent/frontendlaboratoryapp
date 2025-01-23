'use client';
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";

export default function VerifyEmail() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      signOut(auth);
    }
  }, [user]);

  return (
    <div>
      <h1>
        Email not verified. Please check your inbox and click the verification link
        sent to {user?.email}.
      </h1>
    </div>
  );
}
