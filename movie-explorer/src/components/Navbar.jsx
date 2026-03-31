import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useWatchlist from "../hooks/useWatchlist";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { watchlist } = useWatchlist();
  const { user, logout } = useAuth();

  const searchRef = useRef();
  const profileRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setQuery("");
    setShowDropdown(false);
    setIsMenuOpen(false);
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
        setResults(data.results?.slice(0, 10) || []);
        setShowDropdown(true);
      } catch (err) {
        console.error(err);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowDropdown(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfileMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mainLinks = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "Series", path: "/series" },
    { name: "Watchlist", path: "/watchlist", showBadge: true },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[999] bg-[#0b0d14]/95 backdrop-blur-xl border-b border-white/5 py-4 px-6 lg:px-20">
      <div className="max-w-[1700px] mx-auto flex items-center justify-between">
        
        {/* Logo & Desktop Links */}
        <div className="flex items-center gap-10 lg:gap-14">
          <Link to="/" className="text-xl lg:text-2xl font-black tracking-[0.2em] text-white shrink-0">
            AXORA
          </Link>
          
          <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em]">
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
              </Link>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 lg:gap-10">
            
            {/* Search (Desktop) */}
            <div ref={searchRef} className="hidden md:block relative">
                <form onSubmit={handleSearch} className="flex items-center group bg-white/5 rounded-full px-5 py-2.5 border border-white/5 focus-within:border-primary/30 transition-all">
                    <svg className="w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    <input 
                        type="text" 
                        placeholder="SEARCH" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setShowDropdown(true)}
                        className="bg-transparent border-none outline-none text-white placeholder-gray-600 w-32 xl:w-48 ml-3 text-[10px] font-black tracking-widest uppercase"
                    />
                </form>
                {showDropdown && results.length > 0 && (
                    <div className="absolute top-14 right-0 w-80 bg-[#121822] rounded-[1.5rem] shadow-2xl border border-white/5 overflow-y-auto max-h-[400px] z-[1001] p-1 scrollbar-thin">
                        {results.map((movie) => (
                            <div key={movie.id} onClick={() => { navigate(`/movie/${movie.id}`); setShowDropdown(false); setQuery(""); }} className="flex items-center gap-4 p-4 hover:bg-white/5 cursor-pointer transition rounded-[1.2rem] border-b border-white/[0.03] last:border-0">
                                <img src={movie.poster_path ? "https://image.tmdb.org/t/p/w92" + movie.poster_path : "https://via.placeholder.com/92"} className="w-10 h-14 object-cover rounded-lg" />
                                <div className="flex flex-col">
                                    <span className="text-white text-[11px] font-bold leading-tight line-clamp-1">{movie.title}</span>
                                    <span className="text-gray-500 text-[9px] font-black mt-1 uppercase">{movie.release_date?.substring(0, 4)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Mobile Toggle Icons */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-white/60 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">{isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />}</svg>
            </button>

            {/* Auth / Profile Area */}
            {user ? (
                <div ref={profileRef} className="relative">
                    <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="w-9 h-9 rounded-full border-2 border-primary/20 p-0.5 hover:border-primary transition-all overflow-hidden focus:outline-none">
                        <img src={user.avatar} className="w-full h-full object-cover rounded-full" />
                    </button>
                    {showProfileMenu && (
                        <div className="absolute top-12 right-0 w-44 bg-[#121822] rounded-[1.2rem] border border-white/10 shadow-2xl p-2 z-[1001]">
                            <button onClick={logout} className="w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 rounded-xl transition-all font-sans">Logout Session</button>
                        </div>
                    )}
                </div>
            ) : (
                <Link to="/login" className="hidden sm:block">
                    <button className="px-6 py-2 bg-primary text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">Login</button>
                </Link>
            )}
        </div>
      </div>

      {/* MOBILE MENU UNDERLAY */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#0b0d14] border-b border-white/5 p-6 flex flex-col gap-8 shadow-2xl animate-fade-in-down">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex md:hidden items-center bg-white/5 rounded-full px-5 py-4 border border-white/5">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input type="text" placeholder="DISCOVER CONTENT" value={query} onChange={(e) => setQuery(e.target.value)} className="bg-transparent border-none outline-none text-white text-[10px] font-black uppercase tracking-widest ml-4 w-full" />
            </form>

            <div className="flex flex-col gap-4">
                {mainLinks.map((link) => (
                    <Link key={link.name} to={link.path} onClick={() => setIsMenuOpen(false)} className={`text-[13px] font-black uppercase tracking-[0.3em] py-3 px-4 rounded-2xl flex items-center justify-between transition-all ${location.pathname === link.path ? 'bg-primary/10 text-primary' : 'text-gray-500 active:bg-white/5 active:text-white'}`}>
                        {link.name}
                        {link.showBadge && watchlist.length > 0 && <span className="bg-primary text-black px-2 py-0.5 rounded-full text-[10px] leading-none">{watchlist.length}</span>}
                    </Link>
                ))}
                {!user && (
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="mt-4 bg-primary text-black text-center py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-lg">Login Access</Link>
                )}
            </div>
        </div>
      )}
    </nav>
  );
}