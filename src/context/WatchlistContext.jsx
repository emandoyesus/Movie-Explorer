import React, { createContext, useContext, useState, useEffect } from "react";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
        setWatchlist(saved);
    }, []);

    const addToWatchlist = (movie) => {
        if (watchlist.some(m => m.id === movie.id)) return;
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

    return (
        <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
}

export function useWatchlistContext() {
    return useContext(WatchlistContext);
}
