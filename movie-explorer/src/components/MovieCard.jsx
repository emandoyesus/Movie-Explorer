import { Link } from "react-router-dom";

export default function MovieCard({ movie, watchlistHandlers }) {
    const imageUrl = movie.poster_path
        ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
        : "https://via.placeholder.com/500x750?text=No+Image";

    // Protective check since handlers are often passed down
    const inWatchlist = watchlistHandlers?.isInWatchlist(movie.id);

    return (
        <div className="relative group/card flex flex-col w-full h-full">
            <Link to={`/movie/${movie.id}`} className="flex flex-col h-full w-full">
                <div className="relative overflow-hidden rounded-xl shadow-lg ring-1 ring-white/10 transition-all duration-300 group-hover/card:scale-105 group-hover/card:shadow-[0_10px_30px_rgba(0,0,0,0.8)] aspect-[2/3] w-full bg-white/5">
                    <img
                        loading="lazy"
                        src={imageUrl}
                        alt={movie.title || "Untitled"}
                        className="w-full h-full object-cover"
                    />
                </div>
            </Link>

            {watchlistHandlers && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        inWatchlist ? watchlistHandlers.removeFromWatchlist(movie.id) : watchlistHandlers.addToWatchlist(movie);
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
            )}
        </div>
    );
}