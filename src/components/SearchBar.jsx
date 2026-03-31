import { useState } from "react";

export default function SearchBar({ onSearch }) {

    const [query, setQuery] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onSearch(query);
    }

    return (

        <form onSubmit={handleSubmit} className="mb-6">

            <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="p-3 w-full rounded bg-gray-800 text-white"
            />

        </form>

    );
}