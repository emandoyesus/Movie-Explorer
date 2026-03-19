import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import MovieRow from "../components/MovieRow";

import {
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    searchMovies
} from "../services/movieApi";

export default function Home() {

    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [featured, setFeatured] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        loadAllMovies();
    }, []);

    async function loadAllMovies() {
        const pop = await getPopularMovies();
        const top = await getTopRatedMovies();
        const up = await getUpcomingMovies();

        setPopular(pop);
        setTopRated(top);
        setUpcoming(up);

        setFeatured(pop[Math.floor(Math.random() * pop.length)]);
    }

    async function handleSearch(query) {

        if (!query) {
            setSearchResults([]);
            return;
        }

        const results = await searchMovies(query);
        setSearchResults(results);
    }

    return (

        <div className="pt-20">

            {featured && <Hero movie={featured} />}

            <div className="p-6">

                <SearchBar onSearch={handleSearch} />

                {searchResults.length > 0 ? (

                    <MovieRow title="Search Results" movies={searchResults} />

                ) : (

                    <>
                        <MovieRow title="Popular" movies={popular} />
                        <MovieRow title="Top Rated" movies={topRated} />
                        <MovieRow title="Upcoming" movies={upcoming} />
                    </>

                )}

            </div>

        </div>
    );
}