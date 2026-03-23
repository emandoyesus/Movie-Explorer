import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useWatchlist from "../hooks/useWatchlist";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const watchlistHandlers = useWatchlist();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
                );
                const data = await res.json();
                setMovie(data);
            } catch (error) {
                console.error("Error fetching movie:", error);
            }
        };

        const fetchTrailer = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
                );
                const data = await res.json();

                const videos = data.results || [];

                // 🎯 Smart priority selection
                const trailer =
                    videos.find(
                        (vid) =>
                            vid.site === "YouTube" &&
                            vid.type === "Trailer" &&
                            vid.official === true
                    ) ||
                    videos.find(
                        (vid) =>
                            vid.site === "YouTube" &&
                            vid.type === "Trailer"
                    ) ||
                    videos.find(
                        (vid) =>
                            vid.site === "YouTube" &&
                            vid.type === "Teaser"
                    ) ||
                    videos.find((vid) => vid.site === "YouTube");

                if (trailer) {
                    setTrailerKey(trailer.key);
                }
            } catch (error) {
                console.error("Error fetching trailer:", error);
            }
        };

        fetchMovie();
        fetchTrailer();
    }, [id]);

    if (!movie)
        return <p className="text-center mt-20 text-white">Loading...</p>;

    const backdrop = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : "https://via.placeholder.com/1280x720?text=No+Backdrop";

    const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        : "https://via.placeholder.com/300x450?text=No+Image";

    const inWatchlist = watchlistHandlers.isInWatchlist(movie.id);

    return (
        <div className="pt-20 px-6 text-white">

            {/* Backdrop */}
            <div
                className="w-full h-96 bg-cover bg-center rounded-lg mb-6"
                style={{ backgroundImage: `url(${backdrop})` }}
            />

            <div className="flex flex-col md:flex-row gap-6">

                {/* Poster */}
                <img
                    src={poster}
                    alt={movie.title}
                    className="w-64 rounded-lg shadow-lg"
                />

                {/* Info */}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>

                    <p className="text-gray-400 mb-2">
                        ⭐ {movie.vote_average} | {movie.release_date}
                    </p>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {movie.genres?.map((g) => (
                            <span
                                key={g.id}
                                className="bg-gray-700 px-2 py-1 rounded text-sm"
                            >
                                {g.name}
                            </span>
                        ))}
                    </div>

                    {/* Overview */}
                    <p className="mb-4 leading-relaxed">
                        {movie.overview || "No description available."}
                    </p>

                    {/* Watchlist Button */}
                    <button
                        onClick={() =>
                            inWatchlist
                                ? watchlistHandlers.removeFromWatchlist(movie.id)
                                : watchlistHandlers.addToWatchlist(movie)
                        }
                        className={`px-4 py-2 rounded transition ${inWatchlist
                            ? "bg-red-500 hover:bg-red-400"
                            : "bg-blue-500 hover:bg-blue-400"
                            }`}
                    >
                        {inWatchlist
                            ? "Remove from Watchlist"
                            : "Add to Watchlist"}
                    </button>

                    {/* 🎬 Trailer Section */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Trailer</h2>

                        {trailerKey ? (
                            <div className="aspect-video">
                                <iframe
                                    className="w-full h-full rounded-lg shadow-lg"
                                    src={`https://www.youtube.com/embed/${trailerKey}`}
                                    title="Trailer"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <p className="text-gray-400">
                                No trailer available for this movie.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}