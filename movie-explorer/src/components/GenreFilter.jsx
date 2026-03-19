export default function GenreFilter({ genres, selectedGenre, onSelectGenre }) {
    return (
        <div className="flex space-x-2 overflow-x-auto py-2 px-1 scrollbar-hide mb-4">
            <button
                onClick={() => onSelectGenre(null)}
                className={`px-3 py-1 rounded-full border ${selectedGenre === null ? "bg-blue-600 text-white" : "bg-gray-200"
                    }`}
            >
                All
            </button>
            {genres.map((genre) => (
                <button
                    key={genre.id}
                    onClick={() => onSelectGenre(genre.id)}
                    className={`px-3 py-1 rounded-full border ${selectedGenre === genre.id ? "bg-blue-600 text-white" : "bg-gray-200"
                        }`}
                >
                    {genre.name}
                </button>
            ))}
        </div>
    );
}