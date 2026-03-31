import { useEffect, useState } from "react";
import MovieRow from "../components/MovieRow";
import Hero from "../components/Hero";
import useWatchlist from "../hooks/useWatchlist";
import { SkeletonHero, SkeletonRow } from "../components/Skeleton";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function Home() {
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [pages, setPages] = useState({ popular: 1, topRated: 1, upcoming: 1 });
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
            setIsLoading(true);
            try {
                const [pop, top, up] = await Promise.all([
                    fetchCategory("popular", 1, selectedGenre),
                    fetchCategory("top_rated", 1, selectedGenre),
                    fetchCategory("upcoming", 1, selectedGenre),
                ]);
                setPopular(pop);
                setTopRated(top);
                setUpcoming(up);
                setPages({ popular: 1, topRated: 1, upcoming: 1 });
            } finally {
                // Subtle timeout to ensure smooth transition
                setTimeout(() => setIsLoading(false), 800);
            }
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

    return (
        <div className="bg-background min-h-screen text-white pb-20 w-full">
            {/* --- HERO --- */}
            <div className="px-6 sm:px-10 lg:px-20 max-w-[1800px] mx-auto">
                {isLoading && <SkeletonHero />}
                {!isLoading && !selectedGenre && popular.length > 0 && (
                    <Hero popularMovies={popular} />
                )}
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="relative z-20 px-6 lg:px-20 max-w-[1800px] mx-auto">
                
                {/* --- GENRE FILTER --- */}
                <div className="mb-14 overflow-x-auto scrollbar-hide py-2">
                    <div className="flex flex-nowrap gap-4 w-max mx-auto">
                        <button
                            className={`px-8 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all border ${
                                !selectedGenre
                                ? "bg-primary text-black border-primary"
                                : "bg-white/5 text-gray-500 border-white/5 hover:border-white/20 hover:text-white"
                            }`}
                            onClick={() => setSelectedGenre(null)}
                        >
                            All Categories
                        </button>
                        {genres.map((g) => (
                            <button
                                key={g.id}
                                className={`px-8 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all border whitespace-nowrap ${
                                    selectedGenre === g.id
                                    ? "bg-primary text-black border-primary"
                                    : "bg-white/5 text-gray-500 border-white/5 hover:border-white/20 hover:text-white"
                                }`}
                                onClick={() => setSelectedGenre(g.id)}
                            >
                                {g.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- MOVIE ROWS / SKELETONS --- */}
                <div className="flex flex-col gap-10">
                    {isLoading ? (
                        <>
                            <SkeletonRow />
                            <SkeletonRow />
                            <SkeletonRow />
                        </>
                    ) : (
                        <>
                            <MovieRow
                                title={selectedGenre ? "Discover Results" : "Top Picks For You"}
                                movies={popular}
                                watchlistHandlers={watchlistHandlers}
                                loadMore={loadMorePopular}
                            />
                            <MovieRow
                                title="Global Rankings"
                                movies={topRated}
                                watchlistHandlers={watchlistHandlers}
                                loadMore={loadMoreTopRated}
                            />
                            {!selectedGenre && (
                                <MovieRow
                                    title="Anticipated Releases"
                                    movies={upcoming}
                                    watchlistHandlers={watchlistHandlers}
                                    loadMore={loadMoreUpcoming}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}