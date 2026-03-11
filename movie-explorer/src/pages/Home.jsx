import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { getPopularMovies, searchMovies } from "../services/movieApi";

export default function Home() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        loadPopular();
    }, []);

    async function loadPopular() {
        const data = await getPopularMovies();
        setMovies(data);
    }

    async function handleSearch(query) {

        if (!query) {
            loadPopular();
            return;
        }

        const results = await searchMovies(query);
        setMovies(results);
    }

    return (

        <div className="p-6">

            <SearchBar onSearch={handleSearch} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}

            </div>

        </div>
    );
}