import { useState, useEffect } from "react";

export default function useWatchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(saved);
  }, []);

  const addToWatchlist = (movie) => {
    const updated = [...watchlist, movie];
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  const removeFromWatchlist = (movieId) => {
    const updated = watchlist.filter((m) => m.id !== movieId);
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  const isInWatchlist = (movieId) => watchlist.some((m) => m.id === movieId);

  return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist };
}