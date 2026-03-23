import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useWatchlist from "../hooks/useWatchlist";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { watchlist } = useWatchlist();

  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const searchRef = useRef();

  const links = [
    { name: "Home", path: "/" },
    { name: "Watchlist", path: "/watchlist" },
  ];

  // 🔍 Handle Enter Search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
    setQuery("");
    setShowDropdown(false);
    setMenuOpen(false);
  };

  // 🔥 Debounced Live Search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY
          }&query=${query}`
        );
        const data = await res.json();
        setResults(data.results?.slice(0, 5) || []);
        setShowDropdown(true);
      } catch (err) {
        console.error(err);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  // ❌ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-900 fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-red-500 hover:text-red-400 transition"
          >
            Movie Explorer
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-6">

            {/* 🔍 Search */}
            <div ref={searchRef} className="relative">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                  className="px-3 py-1 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                />
              </form>

              {/* Dropdown */}
              {showDropdown && results.length > 0 && (
                <div className="absolute top-10 left-0 w-72 bg-gray-800 rounded shadow-lg z-50 max-h-96 overflow-y-auto">

                  {results.map((movie) => {
                    const image = movie.poster_path
                      ? "https://image.tmdb.org/t/p/w92" + movie.poster_path
                      : "https://via.placeholder.com/92x138";

                    return (
                      <div
                        key={movie.id}
                        onClick={() => {
                          navigate(`/movie/${movie.id}`);
                          setShowDropdown(false);
                          setQuery("");
                        }}
                        className="flex items-center gap-3 p-2 hover:bg-gray-700 cursor-pointer transition"
                      >
                        <img src={image} alt={movie.title} className="w-10 rounded" />
                        <span className="text-sm">{movie.title}</span>
                      </div>
                    );
                  })}

                </div>
              )}
            </div>

            {/* Links */}
            {links.map((link) => (
              <div key={link.path} className="relative">
                <Link
                  to={link.path}
                  className={`text-white hover:text-red-400 transition px-2 py-1 ${location.pathname === link.path ? "underline" : ""
                    }`}
                >
                  {link.name}
                </Link>

                {link.name === "Watchlist" && watchlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {watchlist.length}
                  </span>
                )}
              </div>
            ))}

            <button className="px-4 py-2 bg-red-600 rounded hover:bg-red-500 transition text-white">
              Login
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 px-2 pt-2 pb-3 space-y-3">

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="px-3">
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600"
            />
          </form>

          {/* Links */}
          {links.map((link) => (
            <div key={link.path} className="relative">
              <Link
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="block text-white px-3 py-2 hover:bg-gray-800"
              >
                {link.name}
              </Link>

              {link.name === "Watchlist" && watchlist.length > 0 && (
                <span className="absolute top-1 right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {watchlist.length}
                </span>
              )}
            </div>
          ))}

          <button className="w-full px-3 py-2 bg-red-600 rounded text-white">
            Login
          </button>
        </div>
      )}
    </nav>
  );
}