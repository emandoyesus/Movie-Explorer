import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getPopularMovies } from "../services/movieApi";

export default function Home() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function loadMovies() {
            const data = await getPopularMovies();
            setMovies(data);
        }

        loadMovies();
    }, []);

    return (
        <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">
                Popular Movies
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}

            </div>

        </div>
    );
}

console.log(import.meta.env.VITE_TMDB_API_KEY);