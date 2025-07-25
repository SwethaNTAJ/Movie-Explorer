"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./globals.css";
import { FavoritesProvider, useFavorites } from "./context/FavoritesContext";
import { useTheme } from "./context/ThemeContext";  
import { ThemeProvider } from "./context/ThemeContext";  

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();
  const { favorites } = useFavorites();  
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const email = localStorage.getItem("userEmail") || "";
    setIsLoggedIn(loggedIn);
    setUserEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setShowDropdown(false);
    router.push("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="font-bold text-lg">
          Movie Explorer

        </Link>

        {/* Right side navigation */}
        <div className="relative">
          {!isLoggedIn ? (
            <div className="space-x-4">
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
              <Link href="/movies" className="hover:underline">Movies</Link>
              <Link href="/favorites" className="hover:underline">
                Favorites ({favorites.length})
              </Link>
              {/* <button
                onClick={toggleDarkMode}
                className="px-4 py-2 rounded bg-white text-black dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
              </button> */}
              
            </div>

          ) : (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 rounded px-3 py-1 hover:bg-blue-500"
              >
                <span className="font-semibold">{userEmail || "Profile"}</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <button
                    onClick={() => router.push("/login")}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                   <Link href="/login">Login</Link>
                  </button>
                    
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <ThemeProvider>
          <FavoritesProvider>
            <Header />
            <main>{children}</main>
          </FavoritesProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}


// export function Providers({ children }: { children: React.ReactNode }) {
//   return <FavoritesProvider>{children}</FavoritesProvider>;
// }
