import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {

    const imageUrl =
        "https://image.tmdb.org/t/p/w500" + movie.poster_path;

    return (

        <Link to={`/movie/${movie.id}`}>

            <div className="bg-gray-800 p-4 rounded-lg hover:scale-105 transition">

                <img
                    src={imageUrl}
                    alt={movie.title}
                    className="rounded"
                />

                <h2 className="mt-2 text-lg font-semibold">
                    {movie.title}
                </h2>

            </div>

        </Link>

    );
}