import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useWatchlist from "../hooks/useWatchlist";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { watchlist } = useWatchlist();

  const links = [
    { name: "Home", path: "/" },
    { name: "Watchlist", path: "/watchlist" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
    setQuery("");
    setMenuOpen(false);
  };

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

          {/* Desktop Section */}
          <div className="hidden md:flex items-center space-x-6">

            {/* 🔍 Search */}
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="px-3 py-1 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              />
            </form>

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

                {/* Watchlist Badge */}
                {link.name === "Watchlist" && watchlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {watchlist.length}
                  </span>
                )}
              </div>
            ))}

            {/* Login Button */}
            <button className="px-4 py-2 bg-red-600 rounded hover:bg-red-500 transition text-white">
              Login
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 px-2 pt-2 pb-3 space-y-3">

          {/* 🔍 Mobile Search */}
          <form onSubmit={handleSearch} className="px-3">
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
            />
          </form>

          {/* Links */}
          {links.map((link) => (
            <div key={link.path} className="relative">
              <Link
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block text-white px-3 py-2 rounded hover:bg-gray-800 transition ${location.pathname === link.path ? "underline" : ""
                  }`}
              >
                {link.name}
              </Link>

              {/* Watchlist Badge */}
              {link.name === "Watchlist" && watchlist.length > 0 && (
                <span className="absolute top-1 right-3 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {watchlist.length}
                </span>
              )}
            </div>
          ))}

          {/* Login */}
          <button className="w-full px-3 py-2 bg-red-600 rounded hover:bg-red-500 text-white">
            Login
          </button>
        </div>
      )}
    </nav>
  );
}