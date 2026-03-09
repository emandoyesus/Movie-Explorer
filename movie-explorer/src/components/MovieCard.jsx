import { Link } from "react-router-dom";

function MovieCard({ movie }) {
    return (
        <Link to={`/movie/${movie.id}`}>
            <div className="movie-card">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
                <h3>{movie.title}</h3>
                <p>⭐ {movie.vote_average}</p>
            </div>
        </Link>
    );
}

export default MovieCard;