import MovieCard from "../components/MovieCard";
import useWatchlist from "../hooks/useWatchlist";

export default function WatchlistPage() {
    const watchlistHandlers = useWatchlist();

    return (
        <div className="pt-32 px-6 lg:px-10 min-h-screen text-white pb-16">
            <div className="flex items-center gap-6 mb-10">
                <h2 className="text-3xl lg:text-4xl font-black tracking-wide uppercase">Watchlist</h2>
                {watchlistHandlers.watchlist.length > 0 && (
                    <span className="bg-primary text-black px-4 py-1 rounded-full text-xs font-bold cyan-glow tracking-widest uppercase">
                        {watchlistHandlers.watchlist.length} Movies
                    </span>
                )}
            </div>

            {watchlistHandlers.watchlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-32">
                    <div className="w-24 h-24 mb-6 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                        <svg className="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                    </div>
                    <p className="text-gray-500 text-lg font-light tracking-wide italic">Your watchlist is completely empty.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
                    {watchlistHandlers.watchlist.map(movie => (
                        <MovieCard key={movie.id} movie={movie} watchlistHandlers={watchlistHandlers} />
                    ))}
                </div>
            )}
        </div>
    );
}