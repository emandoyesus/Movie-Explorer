import MovieRow from "../components/MovieRow";
import useWatchlist from "../hooks/useWatchlist";

export default function WatchlistPage() {
    const watchlistHandlers = useWatchlist();

    return (
        <div className="pt-20 px-6">
            <h2 className="text-2xl font-bold mb-6">My Watchlist</h2>

            {watchlistHandlers.watchlist.length === 0 ? (
                <p className="text-gray-500">Your watchlist is empty.</p>
            ) : (
                <MovieRow
                    title=""
                    movies={watchlistHandlers.watchlist}
                    watchlistHandlers={watchlistHandlers}
                />
            )}
        </div>
    );
}