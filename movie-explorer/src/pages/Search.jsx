import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import useWatchlist from "../hooks/useWatchlist";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function Search() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const watchlistHandlers = useWatchlist();

    const query = new URLSearchParams(useLocation().search).get("q");

    useEffect(() => {
        const fetchSearch = async () => {
            if (!query) return;
            setIsLoading(true);
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
                );
                const data = await res.json();
                setMovies(data.results || []);
            } catch (error) {
                console.error("Search failed", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSearch();
    }, [query]);

    return (
        <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen text-white pb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-8 drop-shadow-md tracking-tight">
                Results for <span className="text-red-500">"{query}"</span>
            </h2>

            {isLoading ? (
                <div className="flex justify-center mt-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
                </div>
            ) : movies.length === 0 ? (
                <p className="text-gray-400 text-lg">No movies found. Try another search!</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
                    {movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} watchlistHandlers={watchlistHandlers} />
                    ))}
                </div>
            )}
        </div>
    );
}