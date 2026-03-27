import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SkeletonCard from "./SkeletonCard";

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

    if (!similar.length) {
        return (
            <div className="flex space-x-4 mt-12">
                {[...Array(6)].map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        );
    }

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
                {similar.map((movie) => (
                    <Link key={movie.id} to={`/movie/${movie.id}`} className="flex-shrink-0 w-32 sm:w-40">
                        <img
                            loading="lazy"
                            src={
                                movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                                    : "https://via.placeholder.com/200x300?text=No+Image"
                            }
                            alt={movie.title}
                            className="w-full h-48 sm:h-60 rounded-lg object-cover hover:scale-105 transition shadow-lg cursor-pointer"
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}