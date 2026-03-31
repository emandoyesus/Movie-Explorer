import { Link } from "react-router-dom";

export default function MovieCard({ movie, watchlistHandlers }) {
    if (!movie) return null;
    
    const inWatchlist = watchlistHandlers ? watchlistHandlers.isInWatchlist(movie.id) : false;
    const releaseYear = movie.release_date?.substring(0, 4) || "N/A";
    const rating = movie.vote_average?.toFixed(1) || "NR";

    return (
        <div className="relative group/card flex flex-col">
            {/* Poster */}
            <Link to={`/movie/${movie.id}`} className="overflow-hidden rounded-[1.2rem] bg-gray-900 border border-white/5 pb-[150%] relative">
                <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : "https://via.placeholder.com/300x450?text=No+Image"}
                    alt={movie.title}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover/card:scale-105 group-hover/card:brightness-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <button className="bg-white text-black rounded-full p-4 transform transition-transform hover:scale-110 shadow-2xl">
                        <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                    </button>
                    {watchlistHandlers && (
                        <button 
                            onClick={(e) => { e.preventDefault(); inWatchlist ? watchlistHandlers.removeFromWatchlist(movie.id) : watchlistHandlers.addToWatchlist(movie); }}
                            className={`absolute top-4 right-4 p-2 rounded-full transition-all ${inWatchlist ? 'bg-primary text-black' : 'bg-black/50 text-white hover:bg-white hover:text-black'}`}
                        >
                            <svg className="w-4 h-4" fill={inWatchlist ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </button>
                    )}
                </div>
            </Link>

            {/* Metadata (Cleaned up) */}
            <div className="mt-4 flex flex-col px-1">
                <Link to={`/movie/${movie.id}`} className="text-[13px] font-black text-white hover:text-primary transition-colors mb-2 uppercase tracking-wide truncate">
                    {movie.title}
                </Link>
                <div className="flex items-center justify-between text-[9px] font-black text-gray-600 uppercase tracking-[0.2em]">
                    <span>{releaseYear}</span>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center text-gray-700">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            <span>4.3</span>
                        </div>
                        <div className="flex items-center text-primary/70">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            <span>{rating}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}