import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import SkeletonCard from "./SkeletonCard";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function SimilarMovies({ movieId }) {
    const [similar, setSimilar] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!movieId) return;

        const fetchSimilar = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&page=1`
                );
                const data = await res.json();
                setSimilar(data.results?.slice(0, 14) || []);
            } catch (err) {
                console.error("Error fetching similar movies:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSimilar();
    }, [movieId]);

    if (!similar.length && !loading) return null;

    return (
        <div className="mt-16">
            <h2 className="text-xl font-bold mb-8 text-white tracking-wide">You May Also Like</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
                {loading ? (
                    [...Array(7)].map((_, i) => (
                        <SkeletonCard key={i} />
                    ))
                ) : (
                    similar.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                )}
            </div>
        </div>
    );
}