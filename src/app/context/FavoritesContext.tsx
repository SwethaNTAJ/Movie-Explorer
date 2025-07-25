"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

type FavoritesContextProps = {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie: Movie) => {
    if (!favorites.some((m) => m.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
      console.log(`Added to favorites: ${movie.Title}`,movie, ...favorites);
    }
  };

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter((m) => m.imdbID !== id));
  };

  const isFavorite = (id: string) => favorites.some((m) => m.imdbID === id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
};
