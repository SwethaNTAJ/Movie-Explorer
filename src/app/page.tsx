// export default function Home() {
//   return (
//     <h1 className="text-4xl font-bold text-blue-500 text-center">
//       Welcome to Movie Explorer
//     </h1>
    
//   );
// }
// import Login from "./login/page";
 
 

"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // Redirect to /movies after 5 seconds (optional)
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/movies");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="relative w-full h-screen bg-gray-900 text-white">
      
      <Image
        src="/mve-banner.jpg"  
        alt="Movie Background"
        fill
        className="object-cover opacity-30"
        priority
      />

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl font-bold mb-4 z-10">🎬 Movie Explorer</h1>
        <p className="text-lg max-w-xl mb-6 z-10">
          Discover and explore your favorite movies effortlessly. View ratings, release info, and add them to your favorites list!
        </p>

        <ul className="text-left max-w-md z-10">
          <li className="mb-2">✅ Search & Explore Latest Movies</li>
          <li className="mb-2">⭐ Add to Favorites (Stored Locally)</li>
          <li className="mb-2">📅 View Movie Details with Ratings</li>
          <li className="mb-2">🚀 Fast & Responsive UI with Next.js</li>
        </ul>

        <button
          onClick={() => router.push("/movies")}
          className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold transition"
        >
          Browse Movies →
        </button>
      </div>
    </div>
  );
}
