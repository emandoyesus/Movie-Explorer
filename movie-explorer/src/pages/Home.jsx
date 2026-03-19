import { useEffect, useState } from "react";
import MovieRow from "../components/MovieRow";
import useWatchlist from "../hooks/useWatchlist";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function Home() {
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [pages, setPages] = useState({ popular: 1, topRated: 1, upcoming: 1 });

    const watchlistHandlers = useWatchlist();

    const fetchCategory = async (category, page) => {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&page=${page}`
        );
        const data = await res.json();
        return data.results || [];
    };

    useEffect(() => {
        // Load first page initially
        const loadInitial = async () => {
            const [pop, top, up] = await Promise.all([
                fetchCategory("popular", 1),
                fetchCategory("top_rated", 1),
                fetchCategory("upcoming", 1),
            ]);
            setPopular(pop);
            setTopRated(top);
            setUpcoming(up);
        };
        loadInitial();
    }, []);

    const loadMorePopular = async () => {
        const nextPage = pages.popular + 1;
        const newMovies = await fetchCategory("popular", nextPage);
        setPopular([...popular, ...newMovies]);
        setPages({ ...pages, popular: nextPage });
    };

    const loadMoreTopRated = async () => {
        const nextPage = pages.topRated + 1;
        const newMovies = await fetchCategory("top_rated", nextPage);
        setTopRated([...topRated, ...newMovies]);
        setPages({ ...pages, topRated: nextPage });
    };

    const loadMoreUpcoming = async () => {
        const nextPage = pages.upcoming + 1;
        const newMovies = await fetchCategory("upcoming", nextPage);
        setUpcoming([...upcoming, ...newMovies]);
        setPages({ ...pages, upcoming: nextPage });
    };

    return (
        <div className="pt-20 px-6">
            <MovieRow
                title="Popular"
                movies={popular}
                watchlistHandlers={watchlistHandlers}
                loadMore={loadMorePopular}
            />

            <MovieRow
                title="Top Rated"
                movies={topRated}
                watchlistHandlers={watchlistHandlers}
                loadMore={loadMoreTopRated}
            />

            <MovieRow
                title="Upcoming"
                movies={upcoming}
                watchlistHandlers={watchlistHandlers}
                loadMore={loadMoreUpcoming}
            />
        </div>
    );
}