import { Link } from "react-router-dom";
import { useRef } from "react";

export default function MovieRow({ title, movies, watchlistHandlers, loadMore }) {
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = watchlistHandlers;
    const rowRef = useRef();

    // Detect scroll near the end
    const handleScroll = () => {
        const row = rowRef.current;
        if (!row) return;

        if (row.scrollLeft + row.clientWidth >= row.scrollWidth - 400) {
            if (loadMore) loadMore();
        }
    };

    const safeMovies = Array.isArray(movies) ? movies : [];

    return (
        <div className="mb-10 lg:mb-14 relative group">
            {title && <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-white/90 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">{title}</h2>}

            <div
                ref={rowRef}
                className="flex space-x-4 sm:space-x-5 overflow-x-auto scrollbar-hide py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto snap-x"
                onScroll={handleScroll}
            >
                {safeMovies.length === 0 ? (
                    <div className="flex space-x-4 overflow-hidden w-full">
                        {/* Shimmer placeholders */}
                        {[...Array(6)].map((_, i) => (
                           <div key={i} className="flex-shrink-0 w-36 sm:w-44 md:w-52 h-56 sm:h-64 md:h-80 bg-white/5 animate-pulse rounded-xl" />
                        ))}
                    </div>
                ) : (
                    safeMovies.map((movie) => {
                        const image = movie.poster_path
                            ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
                            : "https://via.placeholder.com/500x750?text=No+Image";

                        const inWatchlist = isInWatchlist(movie.id);

                        return (
                            <div key={movie.id} className="relative flex-shrink-0 w-36 sm:w-44 md:w-52 group/card snap-start">
                                <Link to={`/movie/${movie.id}`}>
                                    <div className="overflow-hidden rounded-xl shadow-lg ring-1 ring-white/10 transition-transform duration-300 group-hover/card:scale-105 group-hover/card:shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                                        <img
                                            loading="lazy"
                                            src={image}
                                            alt={movie.title || "Untitled"}
                                            className="w-full h-56 sm:h-64 md:h-80 object-cover"
                                        />
                                    </div>
                                </Link>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        inWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie);
                                    }}
                                    className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md opacity-0 group-hover/card:opacity-100 transition duration-300 ${inWatchlist ? "bg-red-600/90 text-white shadow-md hover:bg-red-500" : "bg-black/50 hover:bg-white/20 text-white border border-white/10"}`}
                                    title={inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                                >
                                    {inWatchlist ? (
                                        <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    ) : (
                                        <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                    )}
                                </button>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}