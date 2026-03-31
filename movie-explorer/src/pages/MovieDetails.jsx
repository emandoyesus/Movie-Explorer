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
    const [readMore, setReadMore] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=credits,release_dates`
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
                
                // Optimized search for trailer
                const trailer = 
                    videos.find((vid) => vid.site === "YouTube" && vid.type === "Trailer" && vid.official) || 
                    videos.find((vid) => vid.site === "YouTube" && vid.type === "Trailer") || 
                    videos.find((vid) => vid.site === "YouTube" && vid.type === "Teaser") || 
                    videos.find((vid) => vid.site === "YouTube");
                
                if (trailer) {
                    setTrailerKey(trailer.key);
                } else {
                    setTrailerKey(null);
                }
            } catch (error) {
                console.error("Error fetching trailer:", error);
            }
        };

        fetchMovie();
        fetchTrailer();
        window.scrollTo(0, 0); 
    }, [id]);

    if (!movie) return <div className="min-h-screen pt-32 text-center text-white font-light tracking-widest uppercase animate-pulse">Loading...</div>;

    const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image";

    const inWatchlist = watchlistHandlers.isInWatchlist(movie.id);

    const director = movie.credits?.crew?.find(c => c.job === "Director")?.name || "Unknown";
    const writers = movie.credits?.crew?.filter(c => c.department === "Writing").slice(0, 2).map(w => w.name).join(" • ") || "Unknown";
    const stars = movie.credits?.cast?.slice(0, 3).map(c => c.name).join(" • ") || "Unknown";
    
    const hours = Math.floor((movie.runtime || 0) / 60);
    const minutes = (movie.runtime || 0) % 60;
    const runtimeStr = `${hours}h ${minutes}m`;

    let certification = "NR";
    if (movie.release_dates && movie.release_dates.results) {
        const usRelease = movie.release_dates.results.find(r => r.iso_3166_1 === "US");
        if (usRelease && usRelease.release_dates.length > 0) {
            certification = usRelease.release_dates[0].certification || "NR";
        }
    }

    return (
        <div className="relative w-full text-white min-h-screen bg-background pt-32 pb-16 font-sans px-6 lg:px-10">
            <div className="max-w-[1400px] mx-auto">
                
                <div className="bg-[#121822] rounded-[3rem] p-8 lg:p-14 shadow-2xl flex flex-col xl:flex-row gap-10 lg:gap-16 items-start relative overflow-hidden border border-white/5">
                    
                    {/* Poster */}
                    <div className="w-full md:w-1/3 lg:w-[350px] shrink-0">
                        <img 
                            src={poster} 
                            alt={movie.title} 
                            className="w-full h-auto rounded-[2.5rem] object-cover shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10" 
                        />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col w-full h-full">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-8 uppercase leading-none">
                            {movie.title}
                        </h1>

                        <div className="flex flex-col 2xl:flex-row gap-12 lg:gap-20">
                            
                            <div className="flex-1 max-w-2xl">
                                <div className="flex flex-wrap gap-3 mb-10">
                                    {movie.genres?.map(g => (
                                        <span key={g.id} className="px-5 py-2 bg-white/5 text-gray-400 text-[11px] font-bold rounded-full tracking-widest uppercase border border-white/5">
                                            {g.name}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex flex-wrap items-center gap-8 mb-10 text-[12px] font-bold text-gray-400 tracking-widest uppercase">
                                    <div className="flex items-center gap-2">
                                        <span className="bg-yellow-500 text-black px-2 py-0.5 rounded text-[10px] font-black">IMDb</span>
                                        <span className="text-white">{movie.vote_average?.toFixed(1)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="border border-primary/30 text-primary bg-primary/10 px-3 py-0.5 rounded-full text-[10px]">
                                            {certification}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-primary">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                                        <span className="text-white">{runtimeStr}</span>
                                    </div>
                                </div>

                                <div className="mb-12">
                                    <p className={`text-gray-400 leading-loose text-[15px] font-light tracking-wide ${readMore ? '' : 'line-clamp-3'}`}>
                                        {movie.overview}
                                    </p>
                                    <button 
                                        onClick={() => setReadMore(!readMore)} 
                                        className="text-primary font-bold text-[10px] mt-6 underline underline-offset-8 tracking-[0.2em] uppercase hover:text-white transition-colors"
                                    >
                                        {readMore ? 'Show Less -' : 'Read More +'}
                                    </button>
                                </div>

                                <div className="flex flex-wrap items-center gap-5">
                                    {trailerKey && (
                                        <button 
                                            onClick={() => setShowModal(true)}
                                            className="flex items-center gap-3 px-8 py-4 bg-primary text-black rounded-full text-xs font-black tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:scale-105"
                                        >
                                            Watch Trailer
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => inWatchlist ? watchlistHandlers.removeFromWatchlist(movie.id) : watchlistHandlers.addToWatchlist(movie)}
                                        className={`px-10 py-4 rounded-full text-xs font-black tracking-widest uppercase border transition-all ${inWatchlist ? "bg-white/10 text-white border-white/20" : "text-gray-500 border-white/10 hover:text-white hover:border-white/30"}`}
                                    >
                                        {inWatchlist ? "In Watchlist" : "To Watchlist"}
                                    </button>
                                </div>
                            </div>

                            <div className="w-full xl:w-[350px] flex flex-col pt-2 gap-8">
                                <div className="border-b border-white/5 pb-6">
                                    <h4 className="text-gray-500 mb-2 text-[10px] font-black uppercase tracking-widest">Director</h4>
                                    <p className="text-white text-sm font-medium tracking-wide">{director}</p>
                                </div>
                                <div className="border-b border-white/5 pb-6">
                                    <h4 className="text-gray-500 mb-2 text-[10px] font-black uppercase tracking-widest">Writers</h4>
                                    <p className="text-white text-sm font-medium tracking-wide whitespace-pre-wrap leading-relaxed">{writers.replace(/ \• /g, '\n')}</p>
                                </div>
                                <div className="pb-6">
                                    <h4 className="text-gray-500 mb-2 text-[10px] font-black uppercase tracking-widest">Stars</h4>
                                    <p className="text-white text-sm font-medium tracking-wide whitespace-pre-wrap leading-relaxed">{stars.replace(/ \• /g, '\n')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <SimilarMovies movieId={movie.id} />
            </div>

            {showModal && <TrailerModal trailerKey={trailerKey} onClose={() => setShowModal(false)} />}
        </div>
    );
}