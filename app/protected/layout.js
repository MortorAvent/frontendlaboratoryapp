'use client';
import { useAuth } from "@/lib/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/user/signin");
    }
  }, [user, router]);

  return <>{children}</>;
}
