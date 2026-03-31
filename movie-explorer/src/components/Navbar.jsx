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
  const [scrolled, setScrolled] = useState(false);

  const searchRef = useRef();

  const links = [
    { name: "Home", path: "/" },
    { name: "Watchlist", path: "/watchlist" },
  ];

  // 🖱️ Handle scroll fade effect for premium transparent navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${query}`
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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#050505]/90 backdrop-blur-lg shadow-lg border-b border-white/5" : "bg-gradient-to-b from-black/80 to-transparent pt-2"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20 items-center">

          {/* Logo */}
          <Link to="/" className="text-3xl font-extrabold text-red-600 tracking-tighter hover:scale-105 transition-transform drop-shadow-md">
            MOVIEX
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">

            {/* 🔍 Search */}
            <div ref={searchRef} className="relative group">
              <form onSubmit={handleSearch} className="relative flex items-center">
                <svg className="w-5 h-5 absolute left-3 text-white/50 group-focus-within:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input
                  type="text"
                  placeholder="Movies, shows and more"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                  className="pl-10 pr-4 py-2 w-64 rounded-full bg-white/10 text-white placeholder-white/50 border border-transparent focus:outline-none focus:border-white/30 focus:bg-white/20 transition-all shadow-inner"
                />
              </form>

              {/* Dropdown */}
              {showDropdown && results.length > 0 && (
                <div className="absolute top-12 left-0 w-full bg-[#181818] rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50">
                  {results.map((movie) => {
                    const image = movie.poster_path ? "https://image.tmdb.org/t/p/w92" + movie.poster_path : "https://via.placeholder.com/92x138";
                    return (
                      <div key={movie.id} onClick={() => { navigate(`/movie/${movie.id}`); setShowDropdown(false); setQuery(""); }} className="flex items-center gap-4 p-3 hover:bg-white/10 cursor-pointer transition border-b border-white/5 last:border-0">
                        <img src={image} alt={movie.title} className="w-10 h-14 object-cover rounded shadow-sm" />
                        <span className="text-white text-sm font-medium line-clamp-2">{movie.title}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Links */}
            <div className="flex space-x-6 items-center">
              {links.map((link) => (
                <div key={link.path} className="relative">
                  <Link to={link.path} className={`text-gray-300 hover:text-white transition-colors pb-1 ${location.pathname === link.path ? "text-white font-bold" : ""}`}>
                    {link.name}
                  </Link>
                  {link.name === "Watchlist" && watchlist.length > 0 && (
                    <span className="absolute -top-3 -right-4 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-lg">{watchlist.length}</span>
                  )}
                </div>
              ))}
            </div>

            <button className="px-5 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition shadow-lg hover:scale-105">
              Sign In
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#050505]/95 backdrop-blur-3xl px-4 py-4 space-y-4 border-b border-white/10 absolute w-full">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full px-4 py-2 rounded-full bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none" />
          </form>
          {links.map((link) => (
            <div key={link.path} className="relative w-fit">
              <Link to={link.path} onClick={() => setMenuOpen(false)} className="block text-white text-lg font-medium hover:text-red-500">
                {link.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}