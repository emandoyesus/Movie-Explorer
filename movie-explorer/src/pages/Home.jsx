import { useEffect, useState } from "react";
import MovieRow from "../components/MovieRow";
import GenreFilter from "../components/GenreFilter";
import useWatchlist from "../hooks/useWatchlist";

export default function Home() {
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const watchlistHandlers = useWatchlist();

    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);

                const [popularRes, topRes, upcomingRes, genresRes] = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`),
                    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`),
                    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`),
                    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
                ]);

                if (!popularRes.ok || !topRes.ok || !upcomingRes.ok || !genresRes.ok) {
                    throw new Error("Failed to fetch data");
                }

                const [popularData, topData, upcomingData, genresData] = await Promise.all([
                    popularRes.json(),
                    topRes.json(),
                    upcomingRes.json(),
                    genresRes.json()
                ]);

                setGenres(genresData.genres || []);

                // Filter movies by selected genre
                const filterByGenre = (movies) =>
                    selectedGenre
                        ? (movies.results || []).filter((m) => m.genre_ids.includes(selectedGenre))
                        : movies.results || [];

                setPopular(filterByGenre(popularData));
                setTopRated(filterByGenre(topData));
                setUpcoming(filterByGenre(upcomingData));
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [selectedGenre]);

    if (loading) return <p className="text-center mt-20">Loading movies...</p>;
    if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

    return (
        <div className="pt-20 px-6">
            <GenreFilter
                genres={genres}
                selectedGenre={selectedGenre}
                onSelectGenre={setSelectedGenre}
            />

            <MovieRow title="Popular" movies={popular} watchlistHandlers={watchlistHandlers} />
            <MovieRow title="Top Rated" movies={topRated} watchlistHandlers={watchlistHandlers} />
            <MovieRow title="Upcoming" movies={upcoming} watchlistHandlers={watchlistHandlers} />
        </div>
    );
}