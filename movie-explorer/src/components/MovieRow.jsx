import { useState } from "react";
import MovieCard from "./MovieCard";

export default function MovieRow({ title, movies, watchlistHandlers, loadMore }) {
    const [isExpanded, setIsExpanded] = useState(false);
    
    if (!movies || movies.length === 0) return null;

    // Initially show 7, unless expanded
    const visibleMovies = isExpanded ? movies : movies.slice(0, 7);

    const handleToggle = () => {
        if (!isExpanded) {
            setIsExpanded(true);
        } else if (loadMore) {
            // Already expanded, call API to fetch even more (next page)
            loadMore();
        }
    };

    return (
        <div className="mb-14">
            {title && <h2 className="text-xl font-bold mb-6 text-white tracking-wide pl-2 uppercase tracking-[0.2em]">{title}</h2>}
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
                {visibleMovies.map((movie) => (
                    <MovieCard 
                        key={movie.id} 
                        movie={movie} 
                        watchlistHandlers={watchlistHandlers} 
                    />
                ))}
            </div>
            
            {(movies.length > 7 || loadMore) && (
                <div className="flex justify-center mt-12">
                    <button 
                        onClick={handleToggle} 
                        className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-primary transition-all bg-white/5 px-10 py-4 rounded-full border border-white/5 hover:border-primary/20"
                    >
                        <svg className={`w-4 h-4 transition-transform duration-500 ${isExpanded ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {/* Pointing down when NOT expanded, pointing up (rotate-180) when expanded */}
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                        {isExpanded ? "Load Next Page" : "Show All Contents"}
                    </button>
                    {isExpanded && (
                        <button 
                            onClick={() => setIsExpanded(false)} 
                            className="ml-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-700 hover:text-white transition-colors"
                        >
                            Collapse
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}