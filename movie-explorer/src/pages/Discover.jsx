import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import useWatchlist from "../hooks/useWatchlist";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function Discover({ type }) {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [sortBy, setSortBy] = useState("popularity.desc");
    const [page, setPage] = useState(1);
    const watchlistHandlers = useWatchlist();

    const sortOptions = [
        { name: "Popularity High", value: "popularity.desc" },
        { name: "Trending Newest", value: "primary_release_date.desc" },
        { name: "Highest Rated", value: "vote_average.desc" },
        { name: "Global Earning", value: "revenue.desc" },
    ];

    useEffect(() => {
        const fetchGenres = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${apiKey}&language=en-US`);
            const data = await res.json();
            setGenres(data.genres || []);
        };
        fetchGenres();
    }, [type]);

    useEffect(() => {
        const fetchDiscover = async () => {
            let url = `https://api.themoviedb.org/3/discover/${type}?api_key=${apiKey}&page=${page}&sort_by=${sortBy}&include_adult=false`;
            if (selectedGenre) {
                url += `&with_genres=${selectedGenre}`;
            }
            // Add minimum vote count for "Highest Rated" to avoid obscure 10/10 ratings
            if (sortBy === "vote_average.desc") {
                url += "&vote_count.gte=500";
            }

            const res = await fetch(url);
            const data = await res.json();
            if (page === 1) {
                setMovies(data.results || []);
            } else {
                setMovies(prev => [...prev, ...data.results]);
            }
        };
        fetchDiscover();
    }, [type, selectedGenre, sortBy, page]);

    const handleGenreChange = (id) => {
        setSelectedGenre(id);
        setPage(1);
    };

    const handleSortChange = (val) => {
        setSortBy(val);
        setPage(1);
    };

    return (
        <div className="bg-background min-h-screen text-white pt-10 pb-20 px-6 sm:px-10 lg:px-20 max-w-[1700px] mx-auto">
            <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-white/5 pb-16">
                <div>
                    <h1 className="text-6xl lg:text-8xl font-black uppercase tracking-tighter mb-4 leading-none">
                        Explore {type === 'movie' ? 'Movies' : 'Series'}
                    </h1>
                    <p className="text-gray-500 text-[10px] uppercase font-black tracking-[0.4em] max-w-lg leading-relaxed">
                        Navigate the world's most curated streaming library with advanced discovery protocols.
                    </p>
                </div>

                <div className="flex flex-col gap-4 min-w-[280px]">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary ml-2">Sort Engine</span>
                    <select 
                        value={sortBy}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-full px-8 py-4 text-xs font-black uppercase tracking-widest text-white focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer"
                    >
                        {sortOptions.map(opt => (
                            <option key={opt.value} value={opt.value} className="bg-[#121822] py-4">{opt.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-16">
                {/* Sidebar Filter */}
                <div className="w-full lg:w-64 shrink-0">
                    <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mb-10 border-b border-white/5 pb-4">Categories</h3>
                    <div className="flex flex-wrap lg:flex-col gap-3">
                        <button
                            onClick={() => handleGenreChange(null)}
                            className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all text-left ${
                                !selectedGenre ? 'bg-primary text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            All Content
                        </button>
                        {genres.map(genre => (
                            <button
                                key={genre.id}
                                onClick={() => handleGenreChange(genre.id)}
                                className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all text-left whitespace-nowrap ${
                                    selectedGenre === genre.id ? 'bg-primary text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {genre.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Grid */}
                <div className="flex-1">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8">
                        {movies.map(movie => (
                            <MovieCard key={movie.id} movie={movie} watchlistHandlers={watchlistHandlers} />
                        ))}
                    </div>

                    <div className="mt-20 flex justify-center">
                        <button 
                            onClick={() => setPage(prev => prev + 1)}
                            className="bg-white/5 border border-white/10 px-16 py-6 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 hover:text-white hover:border-primary/30 transition-all hover:scale-105 active:scale-95"
                        >
                            Fetch More Content
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
