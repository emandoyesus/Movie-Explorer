export default function Hero({ movie }) {

    const backdrop =
        "https://image.tmdb.org/t/p/original" + movie.backdrop_path;

    return (
        <div className="pt-20">

            {featured && <Hero movie={featured} />}

            <div className="p-6">

                <SearchBar onSearch={handleSearch} />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>

            </div>

        </div>
    );
}