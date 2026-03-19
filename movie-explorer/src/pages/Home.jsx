import { useEffect, useState } from "react";
import MovieRow from "../components/MovieRow";
import useWatchlist from "../hooks/useWatchlist";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function Home() {
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [pages, setPages] = useState({ popular: 1, topRated: 1, upcoming: 1 });
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [genres, setGenres] = useState([]);
    const watchlistHandlers = useWatchlist();

    // --- Move fetchCategory OUTSIDE of useEffect ---
    const fetchCategory = async (category, page, genreId = null) => {
        let url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&page=${page}`;
        if (genreId) {
            url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}&sort_by=popularity.desc`;
        }
        const res = await fetch(url);
        const data = await res.json();
        return data.results || [];
    };

    // --- Fetch genres once ---
    useEffect(() => {
        const fetchGenres = async () => {
            const res = await fetch(
                `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
            );
            const data = await res.json();
            setGenres(data.genres || []);
        };
        fetchGenres();
    }, []);

    // --- Load initial movies or when genre changes ---
    useEffect(() => {
        const loadMovies = async () => {
            const [pop, top, up] = await Promise.all([
                fetchCategory("popular", 1, selectedGenre),
                fetchCategory("top_rated", 1, selectedGenre),
                fetchCategory("upcoming", 1, selectedGenre),
            ]);
            setPopular(pop);
            setTopRated(top);
            setUpcoming(up);
            setPages({ popular: 1, topRated: 1, upcoming: 1 });
        };
        loadMovies();
    }, [selectedGenre]);

    // --- Load more functions for infinite scroll ---
    const loadMorePopular = async () => {
        const nextPage = pages.popular + 1;
        const newMovies = await fetchCategory("popular", nextPage, selectedGenre);
        setPopular((prev) => [...prev, ...newMovies]);
        setPages((prev) => ({ ...prev, popular: nextPage }));
    };

    const loadMoreTopRated = async () => {
        const nextPage = pages.topRated + 1;
        const newMovies = await fetchCategory("top_rated", nextPage, selectedGenre);
        setTopRated((prev) => [...prev, ...newMovies]);
        setPages((prev) => ({ ...prev, topRated: nextPage }));
    };

    const loadMoreUpcoming = async () => {
        const nextPage = pages.upcoming + 1;
        const newMovies = await fetchCategory("upcoming", nextPage, selectedGenre);
        setUpcoming((prev) => [...prev, ...newMovies]);
        setPages((prev) => ({ ...prev, upcoming: nextPage }));
    };

    return (
        <div className="pt-20 px-6">
            {/* --- GENRE FILTER --- */}
            <div className="flex flex-wrap gap-3 mb-6">
                {genres.map((g) => (
                    <button
                        key={g.id}
                        className={`px-3 py-1 rounded ${selectedGenre === g.id
                                ? "bg-red-500 text-white"
                                : "bg-gray-700 text-white hover:bg-gray-600"
                            } transition`}
                        onClick={() => setSelectedGenre(g.id)}
                    >
                        {g.name}
                    </button>
                ))}
                <button
                    className="px-3 py-1 rounded bg-gray-500 text-white hover:bg-gray-400 transition"
                    onClick={() => setSelectedGenre(null)}
                >
                    All
                </button>
            </div>

            {/* --- MOVIE ROWS --- */}
            <MovieRow
                title="Popular"
                movies={popular}
                watchlistHandlers={watchlistHandlers}
                loadMore={loadMorePopular}
            />
            <MovieRow
                title="Top Rated"
                movies={topRated}
                watchlistHandlers={watchlistHandlers}
                loadMore={loadMoreTopRated}
            />
            <MovieRow
                title="Upcoming"
                movies={upcoming}
                watchlistHandlers={watchlistHandlers}
                loadMore={loadMoreUpcoming}
            />
        </div>
    );
}