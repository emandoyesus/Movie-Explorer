import { Link } from "react-router-dom";
import { useRef } from "react";

export default function MovieRow({ title, movies, watchlistHandlers, loadMore }) {
    const { addToWatchlist, removeFromWatchlist, isInWatchlist } = watchlistHandlers;
    const rowRef = useRef();

    // Detect scroll near the end
    const handleScroll = () => {
        const row = rowRef.current;
        if (!row) return;

        if (row.scrollLeft + row.clientWidth >= row.scrollWidth - 200) {
            // Call loadMore when near end
            if (loadMore) loadMore();
        }
    };

    const safeMovies = Array.isArray(movies) ? movies : [];

    return (
        <div className="mb-12">
            {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}

            <div
                ref={rowRef}
                className="flex space-x-6 overflow-x-auto scrollbar-hide py-2"
                onScroll={handleScroll}
            >
                {safeMovies.length === 0 ? (
                    <p className="text-gray-500">No movies available.</p>
                ) : (
                    safeMovies.map((movie) => {
                        const image = movie.poster_path
                            ? "https://image.tmdb.org/t/p/w300" + movie.poster_path
                            : "https://via.placeholder.com/300x450?text=No+Image";

                        const inWatchlist = isInWatchlist(movie.id);

                        return (
                            <div key={movie.id} className="relative flex-shrink-0">
                                <Link to={`/movie/${movie.id}`}>
                                    <img
                                        loading="lazy"
                                        src={image}
                                        alt={movie.title || "Untitled"}
                                        className="h-60 md:h-72 lg:h-80 rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                                    />
                                </Link>
                                <button
                                    onClick={() =>
                                        inWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie)
                                    }
                                    className={`absolute top-2 right-2 px-2 py-1 rounded ${inWatchlist ? "bg-red-500 text-white" : "bg-blue-500 text-white"
                                        }`}
                                >
                                    {inWatchlist ? "Remove" : "Watchlist"}
                                </button>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}