import { useEffect, useState } from "react";
import { getPopularMovies, searchMovies } from "../services/movieApi";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

function Home() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getPopularMovies().then((res) => {
            setMovies(res.data.results);
        });
    }, []);

    const handleSearch = (query) => {
        searchMovies(query).then((res) => {
            setMovies(res.data.results);
        });
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />

            <div className="movie-grid">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default Home;