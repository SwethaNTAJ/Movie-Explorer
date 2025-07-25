"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export default function MovieDetailPage() {
  const params = useParams();  
  const router = useRouter();   
  const movieId = params?.id as string;

  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch details of the movie
  const fetchMovieDetails = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
      const data = await res.json();
      setMovie(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (movieId) fetchMovieDetails(movieId);
  }, [movieId]);

  if (loading) return <p className="p-6">Loading movie details...</p>;
  if (!movie) return <p className="p-6">Movie details not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-4 px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.jpg"}
          alt={movie.Title}
          className="w-64 rounded shadow"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
          <p className="text-gray-600 mb-2">{movie.Released} • {movie.Runtime}</p>
          <p className="mb-2"><strong>Genre:</strong> {movie.Genre}</p>
          <p className="mb-2"><strong>Director:</strong> {movie.Director}</p>
          <p className="mb-2"><strong>Actors:</strong> {movie.Actors}</p>
          <p className="mb-2"><strong>IMDB Rating:</strong> ⭐ {movie.imdbRating}</p>
          <p className="mt-4 text-gray-700">{movie.Plot}</p>
        </div>
      </div>
    </div>
  );
} 