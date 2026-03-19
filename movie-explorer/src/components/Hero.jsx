export default function Hero({ movie }) {

    if (!movie) return null;

    const backdrop = movie.backdrop_path
        ? "https://image.tmdb.org/t/p/original" + movie.backdrop_path
        : "";

    return (
        <div
            className="h-[70vh] bg-cover bg-center flex items-end"
            style={{ backgroundImage: `url(${backdrop})` }}
        >
            <div className="bg-gradient-to-t from-black p-8 w-full">

                <h1 className="text-4xl font-bold mb-4">
                    {movie.title}
                </h1>

                <p className="max-w-xl text-gray-300">
                    {movie.overview}
                </p>

            </div>
        </div>
    );
}