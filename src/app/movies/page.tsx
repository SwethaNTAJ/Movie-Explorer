"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useFavorites } from "../context/FavoritesContext"; // Import context

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export default function MoviesPage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("avengers");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Context functions for favorites
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  // Fetch movies from OMDB API
  const fetchMovies = async (query: string, pageNumber: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${pageNumber}`
      );
      const data = await res.json();

      if (data.Search) {
        if (pageNumber === 1) {
          setMovies(data.Search);
        } else {
          setMovies((prev) => [...prev, ...data.Search]);
        }
        setHasMore(data.totalResults > movies.length + data.Search.length);
      } else {
        setMovies([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(searchQuery, page);
     
  }, [page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchMovies(searchQuery, 1);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Movie Explorer</h1>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 rounded border border-gray-300 p-2 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Movie list */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => {
            const favorite = isFavorite(movie.imdbID);

            const toggleFavorite = (e: React.MouseEvent) => {
              e.preventDefault();  
              if (favorite) {
                removeFavorite(movie.imdbID);
              } else {
                addFavorite(movie);
              }
            };

            return (
              <Link
                href={`/movies/${movie.imdbID}`}
                key={movie.imdbID}
                className="relative block"
              >
                <div className="bg-white shadow rounded p-2 cursor-pointer hover:shadow-lg">
                  <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.jpg"}
                    alt={movie.Title}
                    className="w-full h-auto rounded"
                  />
                  <h2 className="mt-2 text-sm font-bold">{movie.Title}</h2>
                  <p className="text-gray-500 text-xs">{movie.Year}</p>

                  {/* Favorites Button */}
                  <button
                    onClick={toggleFavorite}
                    className={`absolute top-2 right-2 px-2 py-1 text-xs rounded ${
                      favorite
                        ? "bg-red-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {favorite ? "♥" : "♡"}
                  </button>
                </div>
              </Link>
            );
          })
        ) : (
          <p>No movies found</p>
        )}
      </div>

      {/* Load more button */}
      {hasMore && !loading && movies.length > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Load More
          </button>
        </div>
      )}

      {loading && <p className="text-center mt-4">Loading...</p>}
    </div>
  );
}
