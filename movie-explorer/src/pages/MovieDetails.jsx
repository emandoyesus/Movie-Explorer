import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useWatchlist from "../hooks/useWatchlist";
import TrailerModal from "../components/TrailerModal";
import SimilarMovies from "../components/SimilarMovies";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const watchlistHandlers = useWatchlist();
    const [showModal, setShowModal] = useState(false);

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

                if (trailer) setTrailerKey(trailer.key);
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
        <div className="relative w-full text-white min-h-screen pb-16">
            {/* Full-bleed Backdrop with Gradient Fade */}
            <div className="absolute top-0 left-0 w-full h-[70vh] z-0">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${backdrop})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/30 to-transparent" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-[30vh] sm:pt-[40vh]">
                <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                    {/* Poster */}
                    <div className="flex-shrink-0 mx-auto md:mx-0">
                        <img
                            loading="lazy"
                            src={poster}
                            alt={movie.title}
                            className="w-64 sm:w-72 lg:w-[320px] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
                        />
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-md tracking-tight">
                            {movie.title}
                        </h1>

                        <div className="flex items-center gap-4 text-gray-300 text-sm sm:text-base font-medium mb-6">
                            <span className="flex items-center gap-1 text-yellow-500 font-bold">
                                <svg className="w-5 h-5 drop-shadow-sm" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {movie.vote_average?.toFixed(1)}
                            </span>
                            <span>•</span>
                            <span>{new Date(movie.release_date).getFullYear() || "N/A"}</span>
                            <span>•</span>
                            <span className="uppercase tracking-wider">{movie.original_language}</span>
                        </div>

                        {/* Genres */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {movie.genres?.map((g) => (
                                <span
                                    key={g.id}
                                    className="px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-sm font-medium tracking-wide shadow-sm"
                                >
                                    {g.name}
                                </span>
                            ))}
                        </div>

                        {/* Overview */}
                        <div className="mb-10 max-w-3xl">
                            <h3 className="text-xl font-semibold mb-3 text-white/90">Storyline</h3>
                            <p className="text-gray-300 text-lg leading-relaxed text-pretty">
                                {movie.overview || "No description available."}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-4">
                            {trailerKey && (
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="group flex items-center gap-2 px-8 py-3.5 bg-red-600 text-white rounded-full font-bold shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:bg-red-500 hover:-translate-y-1 transition-all duration-300"
                                >
                                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                    Watch Trailer
                                </button>
                            )}

                            <button
                                onClick={() =>
                                    inWatchlist
                                        ? watchlistHandlers.removeFromWatchlist(movie.id)
                                        : watchlistHandlers.addToWatchlist(movie)
                                }
                                className={`flex items-center gap-2 px-8 py-3.5 rounded-full font-bold transition-all duration-300 border backdrop-blur-sm ${inWatchlist
                                    ? "bg-white/20 border-white/30 hover:bg-white/30 text-white shadow-lg"
                                    : "bg-black/30 border-white/20 hover:bg-white/10 hover:border-white/40 text-white"
                                    }`}
                            >
                                {inWatchlist ? (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                        In Watchlist
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add to Watchlist
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* 🎬 Similar Movies Section */}
                <div className="mt-20 pt-8 border-t border-white/10 relative z-20">
                    <SimilarMovies movieId={movie.id} />
                </div>
            </div>

            {/* 🎥 Modal */}
            {showModal && (
                <TrailerModal
                    trailerKey={trailerKey}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}