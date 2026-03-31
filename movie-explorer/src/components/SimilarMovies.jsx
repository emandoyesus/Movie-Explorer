import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import SkeletonCard from "./SkeletonCard";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function SimilarMovies({ movieId }) {
    const [similar, setSimilar] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const loadingRef = useRef(false);

    // Reset pagination state when the movie changes
    useEffect(() => {
        setPage(1);
        setSimilar([]);
        setHasMore(true);
    }, [movieId]);

    useEffect(() => {
        if (!movieId || !hasMore) return;

        let isMounted = true;
        setLoading(true);
        loadingRef.current = true;

        const fetchSimilar = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&page=${page}`
                );
                const data = await res.json();

                if (isMounted) {
                    setSimilar(prev => {
                        const newMovies = data.results || [];
                        if (page === 1) return newMovies;

                        // Avoid duplicate keys by checking IDs
                        const existingIds = new Set(prev.map(m => m.id));
                        const uniqueNew = newMovies.filter(m => !existingIds.has(m.id));
                        return [...prev, ...uniqueNew];
                    });

                    // Limit fetch to 5 pages (100 movies total) like Netflix to manage memory smoothly!
                    setHasMore(data.page < data.total_pages && data.page < 5);
                }
            } catch (err) {
                if (isMounted) console.error("Error fetching similar movies:", err);
            } finally {
                if (isMounted) {
                    setLoading(false);
                    loadingRef.current = false;
                }
            }
        };

        fetchSimilar();

        return () => { isMounted = false; };
    }, [movieId, page]);

    const handleScroll = (e) => {
        if (loadingRef.current || !hasMore) return;

        const { scrollLeft, scrollWidth, clientWidth } = e.target;
        // Fetch next page when user reaches within 400px of the right edge
        if (scrollWidth - scrollLeft <= clientWidth + 400) {
            loadingRef.current = true;
            setPage(prev => prev + 1);
        }
    };

    // Skeleton loading only for initial load (when getting page 1)
    if (!similar.length && loading) {
        return (
            <div className="flex space-x-4 mt-12">
                {[...Array(6)].map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        );
    }

    // Completely empty and done loading
    if (!similar.length && !loading) return null;

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
            <div
                className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
                onScroll={handleScroll}
            >
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

                {/* Loader showing on the right edge while fetching the next page */}
                {loading && page > 1 && (
                    <div className="flex-shrink-0 w-32 sm:w-40 flex items-center justify-center h-48 sm:h-60">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-600"></div>
                    </div>
                )}
            </div>
        </div>
    );
}