"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700">Your Profile</h2>
        <p className="mt-4 text-gray-600">
          Welcome! You are logged in.
        </p>
      </div>
    </div>
  );
}
