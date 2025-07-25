 
"use client";

import { useFavorites } from "@/app/context/FavoritesContext";

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Favorite Movies</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600">You haven’t added any favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition"
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-64 object-cover rounded mb-2"
              />
              <h2 className="font-semibold text-lg">{movie.Title}</h2>
              <p className="text-gray-500">{movie.Year}</p>
              <button
                onClick={() => removeFavorite(movie.imdbID)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
