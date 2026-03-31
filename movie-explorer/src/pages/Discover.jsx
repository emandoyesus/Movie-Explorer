import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import useWatchlist from "../hooks/useWatchlist";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function Discover({ type = "movie" }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const watchlistHandlers = useWatchlist();

    const fetchGenres = async () => {
        const res = await fetch(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${apiKey}`);
        const data = await res.json();
        setGenres(data.genres || []);
    };

    const fetchDiscover = async (reset = false) => {
        setLoading(true);
        const currentPage = reset ? 1 : page;
        let url = `https://api.themoviedb.org/3/discover/${type}?api_key=${apiKey}&page=${currentPage}&sort_by=popularity.desc`;
        if (selectedGenre) url += `&with_genres=${selectedGenre}`;
        
        try {
            const res = await fetch(url);
            const data = await res.json();
            const results = data.results || [];
            if (reset) {
                setItems(results);
            } else {
                setItems((prev) => [...prev, ...results]);
            }
        } catch (error) {
            console.error("Error fetching discover items:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGenres();
    }, [type]);

    useEffect(() => {
        setPage(1);
        fetchDiscover(true);
    }, [type, selectedGenre]);

    const loadMore = () => {
        setPage((prev) => prev + 1);
        fetchDiscover();
    };

    return (
        <div className="bg-background min-h-screen text-white pb-20 pt-10 px-6 sm:px-10 lg:px-20 max-w-[1700px] mx-auto">
            {/* Header Titles */}
            <div className="mb-14">
                <h1 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
                    {type === "movie" ? "Exclusive Movies" : "Premium Series"}
                </h1>
                <p className="text-gray-500 text-sm font-medium tracking-[0.1em] max-w-2xl border-l-[3px] border-primary pl-6">
                    Curated selection of {type === "movie" ? "global cinema" : "binge-worthy originals"} 
                    powered by our premium agency discover engine. Explore the trends of modern storytelling.
                </p>
            </div>

            {/* Filter */}
            <div className="mb-14 flex flex-wrap gap-4 scrollbar-hide py-2">
                <button
                    onClick={() => setSelectedGenre(null)}
                    className={`px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${!selectedGenre ? 'bg-primary text-black border-primary' : 'bg-white/5 text-gray-500 border-white/5 hover:text-white'}`}
                >
                    All Types
                </button>
                {genres.map((g) => (
                    <button
                        key={g.id}
                        onClick={() => setSelectedGenre(g.id)}
                        className={`px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${selectedGenre === g.id ? 'bg-primary text-black border-primary' : 'bg-white/5 text-gray-400 border-white/5 hover:text-white'}`}
                    >
                        {g.name}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-8">
                {items.map((item) => (
                    <MovieCard 
                        key={item.id} 
                        movie={item} 
                        watchlistHandlers={watchlistHandlers} 
                    />
                ))}
                {loading && Array.from({ length: 7 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>

            {items.length > 0 && !loading && (
                <div className="flex justify-center mt-20">
                    <button 
                        onClick={loadMore} 
                        className="px-12 py-4 border border-white/10 text-gray-500 hover:text-white hover:border-white/20 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all"
                    >
                        View More Contents
                    </button>
                </div>
            )}
        </div>
    );
}
