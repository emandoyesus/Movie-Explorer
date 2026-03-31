import { useEffect, useState } from "react";
import MovieRow from "../components/MovieRow";
import Hero from "../components/Hero";
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

    const fetchCategory = async (category, page, genreId = null) => {
        let url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&page=${page}`;
        if (genreId) {
            url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}&sort_by=popularity.desc`;
        }
        const res = await fetch(url);
        const data = await res.json();
        return data.results || [];
    };

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

    const heroMovie = selectedGenre ? null : popular[0];

    return (
        <div className="bg-[#0f1014] min-h-screen text-white pb-12 w-full">
            {/* --- HERO --- */}
            {heroMovie ? <Hero movie={heroMovie} /> : <div className="pt-24" />}

            {/* --- MAIN CONTENT OVERLAPPING HERO --- */}
            <div className={`relative z-20 ${heroMovie ? '-mt-24 sm:-mt-32' : ''}`}>

                {/* --- GENRE FILTER --- */}
                <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10 overflow-x-auto scrollbar-hide mask-edges">
                    <div className="flex flex-nowrap gap-3 pb-4 w-max">
                        <button
                            className={`px-5 py-2 rounded-full font-medium tracking-wide transition-all border ${!selectedGenre
                                ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white"
                                }`}
                            onClick={() => setSelectedGenre(null)}
                        >
                            All
                        </button>
                        {genres.map((g) => (
                            <button
                                key={g.id}
                                className={`px-5 py-2 rounded-full font-medium tracking-wide transition-all border whitespace-nowrap ${selectedGenre === g.id
                                    ? "bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                                    : "bg-white/10 backdrop-blur-md text-gray-200 border-white/10 hover:bg-white/20 hover:text-white shadow-sm"
                                    }`}
                                onClick={() => setSelectedGenre(g.id)}
                            >
                                {g.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- MOVIE ROWS --- */}
                <MovieRow
                    title={selectedGenre ? "Movies" : "Trending Now"}
                    movies={selectedGenre ? popular : popular.slice(1)}
                    watchlistHandlers={watchlistHandlers}
                    loadMore={loadMorePopular}
                />
                <MovieRow
                    title="Top Rated"
                    movies={topRated}
                    watchlistHandlers={watchlistHandlers}
                    loadMore={loadMoreTopRated}
                />
                {!selectedGenre && (
                    <MovieRow
                        title="Coming Soon"
                        movies={upcoming}
                        watchlistHandlers={watchlistHandlers}
                        loadMore={loadMoreUpcoming}
                    />
                )}
            </div>
        </div>
    );
}