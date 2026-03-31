import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useWatchlist from "../hooks/useWatchlist";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { watchlist } = useWatchlist(); // Local instances might stay out of sync until reload, but this is the simplest way.

  const searchRef = useRef();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setQuery("");
    setShowDropdown(false);
  };

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mainLinks = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "Series", path: "/series" },
    { name: "Watchlist", path: "/watchlist", showBadge: true },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 px-6 sm:px-10 lg:px-20 py-5 bg-[#0b0d14] border-b border-white/5 shadow-2xl`}>
      <div className="max-w-[1700px] mx-auto flex items-center justify-between gap-10">
        
        {/* Left: Brand & Nav Links */}
        <div className="flex items-center gap-14">
          <Link to="/" className="text-2xl font-black tracking-[0.25em] text-white shrink-0">
            AGENCY
          </Link>
          
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.3em]">
            {mainLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`transition-all relative group flex items-center gap-2 ${location.pathname === link.path ? 'text-primary' : 'text-gray-400 hover:text-white'}`}
              >
                {link.name}
                {link.showBadge && watchlist.length > 0 && (
                    <span className="flex items-center justify-center w-4 h-4 bg-primary text-black text-[9px] font-black rounded-full leading-none translate-y-[-1px]">
                        {watchlist.length}
                    </span>
                )}
                <span className={`absolute -bottom-2 left-0 h-0.5 bg-primary transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Search & Login */}
        <div className="flex items-center gap-8 lg:gap-10 shrink-0">
            
            {/* Search */}
            <div ref={searchRef} className="relative">
                <form onSubmit={handleSearch} className="flex items-center group">
                    <svg className={`w-4 h-4 transition-colors cursor-pointer ${query ? 'text-primary' : 'text-gray-500 group-focus-within:text-primary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input 
                        type="text" 
                        placeholder="SEARCH" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setShowDropdown(true)}
                        className="bg-transparent border-none outline-none text-white placeholder-gray-600 w-24 lg:w-32 xl:w-40 ml-3 text-[10px] font-black tracking-widest uppercase transition-all"
                    />
                </form>
                {showDropdown && results.length > 0 && (
                    <div className="absolute top-12 right-0 w-80 bg-[#121822] rounded-[1.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.9)] border border-white/5 overflow-hidden z-[1001] p-1">
                    {results.map((movie) => {
                        const image = movie.poster_path ? "https://image.tmdb.org/t/p/w92" + movie.poster_path : "https://via.placeholder.com/92x138";
                        return (
                        <div key={movie.id} onClick={() => { navigate(`/movie/${movie.id}`); setShowDropdown(false); setQuery(""); }} className="flex items-center gap-4 p-4 hover:bg-white/5 cursor-pointer transition rounded-[1.2rem] group border-b border-white/[0.03] last:border-0">
                            <img src={image} alt={movie.title} className="w-12 h-16 object-cover rounded-[0.8rem] shadow-lg group-hover:scale-105 transition-transform" />
                            <div className="flex flex-col">
                                <span className="text-white text-[13px] font-bold leading-tight line-clamp-2">{movie.title}</span>
                                <span className="text-gray-500 text-[10px] uppercase font-black mt-1 opacity-60 tracking-widest">{movie.release_date?.substring(0, 4)}</span>
                            </div>
                        </div>
                        );
                    })}
                    </div>
                )}
            </div>

            <button className="px-8 py-2.5 bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-black transition-all rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                Login
            </button>
        </div>

      </div>
    </nav>
  );
}