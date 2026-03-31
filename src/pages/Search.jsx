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
        <div className="pt-32 px-6 lg:px-10 min-h-screen text-white pb-16">
            <h2 className="text-3xl lg:text-4xl font-black uppercase mb-10 tracking-wide">
                Results for <span className="text-primary italic animate-pulse">"{query}"</span>
            </h2>

            {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className="bg-white/5 animate-pulse rounded-[1rem] pb-[150%] w-full" />
                    ))}
                </div>
            ) : movies.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-32">
                    <p className="text-gray-500 text-lg font-light tracking-wide italic">No movies found. Try another search!</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
                    {movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} watchlistHandlers={watchlistHandlers} />
                    ))}
                </div>
            )}
        </div>
    );
}