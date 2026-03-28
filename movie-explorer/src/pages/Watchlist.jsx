import MovieCard from "../components/MovieCard";
import useWatchlist from "../hooks/useWatchlist";

export default function WatchlistPage() {
    const watchlistHandlers = useWatchlist();

    return (
        <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen text-white pb-16">
            <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl lg:text-4xl font-extrabold drop-shadow-md tracking-tight">My Watchlist</h2>
                {watchlistHandlers.watchlist.length > 0 && (
                    <span className="bg-red-600 px-3 py-1 rounded-full text-sm font-bold shadow-lg">{watchlistHandlers.watchlist.length} Movies</span>
                )}
            </div>

            {watchlistHandlers.watchlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-32 opacity-70">
                    <svg className="w-24 h-24 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                    <p className="text-gray-400 text-xl font-medium">Your watchlist is completely empty.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
                    {watchlistHandlers.watchlist.map(movie => (
                        <MovieCard key={movie.id} movie={movie} watchlistHandlers={watchlistHandlers} />
                    ))}
                </div>
            )}
        </div>
    );
}