import { Link } from "react-router-dom";

export default function Hero({ movie }) {
    if (!movie) return null;

    const backdrop = movie.backdrop_path
        ? "https://image.tmdb.org/t/p/original" + movie.backdrop_path
        : "";

    return (
        <div className="relative w-full h-[75vh] min-h-[500px] mb-8 lg:mb-12">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${backdrop})` }}
            />
            {/* Smooth Vignette and Gradient fades matching MovieDetails */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1014] via-[#0f1014]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f1014] via-[#0f1014]/60 to-transparent" />
            
            <div className="relative z-10 w-full h-full flex items-end pb-16">
                <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg tracking-tight max-w-3xl">
                        {movie.title}
                    </h1>
                    <p className="max-w-xl text-gray-300 text-lg md:text-xl mb-8 leading-relaxed line-clamp-3 text-pretty">
                        {movie.overview}
                    </p>
                    <div className="flex gap-4">
                        <Link to={`/movie/${movie.id}`}>
                            <button className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors shadow-lg shadow-white/10 hover:scale-105 duration-300">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                                Read More
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}