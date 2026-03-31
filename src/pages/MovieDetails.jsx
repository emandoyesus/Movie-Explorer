import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import TrailerModal from "../components/TrailerModal";
import MovieRow from "../components/MovieRow";
import useWatchlist from "../hooks/useWatchlist";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [similar, setSimilar] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const [isTrailerOpen, setIsTrailerOpen] = useState(false);

    const { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
    const saved = isInWatchlist(parseInt(id));

    useEffect(() => {
        const fetchDetails = async () => {
            // General Details
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`);
            const data = await res.json();
            setMovie(data);

            // Similar Movies
            const similarRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US&page=1`);
            const similarData = await similarRes.json();
            setSimilar(similarData.results || []);

            // Improved Trailer logic: Fetching all videos to find the best match
            const videoRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`);
            const videoData = await videoRes.json();
            const videos = videoData.results || [];

            // Priority: Official Trailer -> Trailer -> Any video
            const mainTrailer = videos.find(v => v.type === "Trailer" && v.official) ||
                videos.find(v => v.type === "Trailer") ||
                videos[0];
            setTrailer(mainTrailer);
        };
        fetchDetails();
    }, [id]);

    if (!movie) return (
        <div className="min-h-screen flex items-center justify-center bg-background text-white">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    const backdrop = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    return (
        <div className="bg-background min-h-screen text-white pb-20 w-full overflow-x-hidden">

            {/* HERO BACKDROP */}
            <div className="relative h-[65vh] md:h-[85vh] w-full overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
                    style={{ backgroundImage: `url(${backdrop})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/60 md:from-background/40 via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

                <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 lg:px-20 pb-12 md:pb-20 max-w-[1700px] mx-auto z-10">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center">
                        <img 
                            src={poster} 
                            alt={movie.title} 
                            className="w-32 sm:w-48 lg:w-72 rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.8)] border border-white/10 transform hover:scale-105 transition-transform duration-500 hidden sm:block" 
                        />
                        <div className="flex-1 w-full">
                            <h1 className="text-3xl sm:text-5xl lg:text-8xl font-black uppercase tracking-tighter mb-4 md:mb-6 leading-[0.95] [text-shadow:0_10px_30px_rgba(0,0,0,0.5)]">
                                {movie.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-3 md:gap-6 mb-6 md:mb-10 text-[8px] sm:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-300">
                                <span className="text-primary">{movie.release_date?.substring(0, 4)}</span>
                                <span className="w-1 h-1 bg-white/20 rounded-full" />
                                <span>{movie.runtime} MIN</span>
                                <span className="w-1 h-1 bg-white/20 rounded-full" />
                                <span className="line-clamp-1">{movie.genres?.map(g => g.name).join(", ")}</span>
                            </div>
                            <p className="hidden md:block text-gray-400 text-sm lg:text-lg max-w-3xl leading-relaxed mb-10 font-medium opacity-90 italic">
                                "{movie.tagline || movie.overview?.substring(0, 150) + '...'}"
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                <button 
                                    onClick={() => setIsTrailerOpen(true)}
                                    className="w-full sm:w-auto px-10 py-5 bg-[#E50914] text-white rounded-full font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                    Watch Trailer
                                </button>
                                <button 
                                    onClick={() => saved ? removeFromWatchlist(movie.id) : addToWatchlist(movie)}
                                    className={`w-full sm:w-auto px-10 py-5 rounded-full font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs transition-all flex items-center justify-center gap-3 ${
                                        saved 
                                        ? "bg-primary text-black shadow-lg" 
                                        : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-xl border border-white/10"
                                    }`}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={saved ? "M5 13l4 4L19 7" : "M12 4v16m8-8H4"}/></svg>
                                    {saved ? "Watched List" : "Add to Watch List"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SYNOPSIS SECTION */}
            <div className="px-6 sm:px-10 lg:px-20 max-w-[1700px] mx-auto mt-20 relative z-20">
                <div className="mb-20">
                    <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8 border-b border-white/5 pb-4">Synopsis</h3>
                    <p className="text-gray-400 text-lg leading-relaxed font-medium opacity-80 max-w-5xl">
                        {movie.overview}
                    </p>
                </div>

                <div className="mt-40">
                    <MovieRow title="More Like This" movies={similar} />
                </div>
            </div>

            <TrailerModal
                isOpen={isTrailerOpen}
                onClose={() => setIsTrailerOpen(false)}
                videoKey={trailer?.key}
            />
        </div>
    );
}