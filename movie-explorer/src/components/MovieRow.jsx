import { Link } from "react-router-dom";

export default function MovieRow({ title, movies }) {
    const safeMovies = Array.isArray(movies) ? movies : [];

    return (
        <div className="mb-12"> {/* More vertical space between rows */}
            <h2 className="text-2xl font-bold mb-6">{title}</h2>

            <div className="flex space-x-6 overflow-x-auto scrollbar-hide py-2">
                {safeMovies.length === 0 ? (
                    <p className="text-gray-500">No movies available.</p>
                ) : (
                    safeMovies.map((movie) => {
                        const image = movie.poster_path
                            ? "https://image.tmdb.org/t/p/w300" + movie.poster_path
                            : "https://via.placeholder.com/300x450?text=No+Image";

                        return (
                            <Link key={movie.id} to={`/movie/${movie.id}`} className="flex-shrink-0">
                                <img
                                    src={image}
                                    alt={movie.title || "Untitled"}
                                    className="h-60 md:h-72 lg:h-80 rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                                />
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    );
}