import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Watchlist from "./pages/Watchlist";
import Search from "./pages/Search";
import Discover from "./pages/Discover";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import { WatchlistProvider } from "./context/WatchlistContext";

function Layout({ children }) {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === "/login";

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-white font-sans overflow-hidden">
      <div className="relative overflow-y-auto h-screen">
        {!hideNavAndFooter && <Navbar />}
        <main className={!hideNavAndFooter ? "pt-20" : ""}>
          {children}
        </main>
        {!hideNavAndFooter && <Footer />}
      </div>
    </div>
  );
}

function App() {
  return (
    <WatchlistProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/search" element={<Search />} />
              <Route path="/movies" element={<Discover type="movie" />} />
              <Route path="/series" element={<Discover type="tv" />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Layout>
        </BrowserRouter>
    </WatchlistProvider>
  );
}

export default App;