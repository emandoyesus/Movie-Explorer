import MovieCard from "./MovieCard";

export default function MovieRow({ title, movies, watchlistHandlers, loadMore }) {
    if (!movies || movies.length === 0) return null;

    return (
        <div className="mb-14">
            {title && <h2 className="text-xl font-bold mb-6 text-white tracking-wide pl-2">{title}</h2>}
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
                {movies.map((movie) => (
                    <MovieCard 
                        key={movie.id} 
                        movie={movie} 
                        watchlistHandlers={watchlistHandlers} 
                    />
                ))}
            </div>
            
            {loadMore && (
                <div className="flex justify-center mt-10">
                    <button onClick={loadMore} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors border border-white/10 px-8 py-3 rounded-full hover:bg-white/5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        Show More
                    </button>
                </div>
            )}
        </div>
    );
}