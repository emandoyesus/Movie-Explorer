import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/movieApi";

export default function MovieDetails() {

    const { id } = useParams();

    const [movie, setMovie] = useState(null);

    useEffect(() => {

        async function loadMovie() {
            const data = await getMovieDetails(id);
            setMovie(data);
        }

        loadMovie();

    }, [id]);

    if (!movie) {
        return <div className="p-6 text-gray-900">Loading...</div>;
    }

    const image =
        "https://image.tmdb.org/t/p/w500" + movie.poster_path;

    return (

        <div className="p-8 text-gray-900">

            <div className="flex gap-8">

                <img
                    src={image}
                    alt={movie.title}
                    className="w-64 rounded-lg"
                />

                <div>

                    <h1 className="text-4xl font-bold mb-4">
                        {movie.title}
                    </h1>

                    <p className="mb-4">
                        {movie.overview}
                    </p>

                    <p>
                        ⭐ Rating: {movie.vote_average}
                    </p>

                    <p>
                        📅 Release: {movie.release_date}
                    </p>

                </div>

            </div>

        </div>

    );
}