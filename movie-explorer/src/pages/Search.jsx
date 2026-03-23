import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieRow from "../components/MovieRow";
import useWatchlist from "../hooks/useWatchlist";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function Search() {
    const [movies, setMovies] = useState([]);
    const watchlistHandlers = useWatchlist();

    const query = new URLSearchParams(useLocation().search).get("q");

    useEffect(() => {
        const fetchSearch = async () => {
            if (!query) return;

            const res = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
            );
            const data = await res.json();
            setMovies(data.results || []);
        };

        fetchSearch();
    }, [query]);

    return (
        <div className="pt-20 px-6">
            <h2 className="text-2xl font-bold mb-6">
                Results for "{query}"
            </h2>

            <MovieRow
                title=""
                movies={movies}
                watchlistHandlers={watchlistHandlers}
            />
        </div>
    );
}