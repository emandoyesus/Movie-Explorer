import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Watchlist from "./pages/Watchlist";
import Search from "./pages/Search";
import Discover from "./pages/Discover";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[var(--color-background)] text-white font-sans overflow-hidden">
        {/* Main Content Area */}
        <div className="relative overflow-y-auto h-screen">
          <Navbar />
          
          {/* Added pt-20 to push content below the fixed navbar */}
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/search" element={<Search />} />
              <Route path="/movies" element={<Discover type="movie" />} />
              <Route path="/series" element={<Discover type="tv" />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;