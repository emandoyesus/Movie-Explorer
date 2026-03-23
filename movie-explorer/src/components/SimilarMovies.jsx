import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function SimilarMovies({ movieId }) {
    const [similar, setSimilar] = useState([]);

    useEffect(() => {
        const fetchSimilar = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&page=1`
                );
                const data = await res.json();
                setSimilar(data.results || []);
            } catch (err) {
                console.error("Error fetching similar movies:", err);
            }
        };

        fetchSimilar();
    }, [movieId]);

    if (!similar.length) return null;

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
                {similar.map((movie) => (
                    <Link key={movie.id} to={`/movie/${movie.id}`}>
                        <img
                            src={
                                movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                                    : "https://via.placeholder.com/200x300?text=No+Image"
                            }
                            alt={movie.title}
                            className="h-48 rounded-lg hover:scale-105 transition cursor-pointer"
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}