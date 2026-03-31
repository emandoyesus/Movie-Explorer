# 🎬 AXORA Movies - Premium Cinematic Platform

![AXORA Preview](https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.jpg)

**AXORA** is a high-end, agency-level Movie Discovery Platform built for movie enthusiasts who demand a premium, distraction-free experience. Featuring a stunning glassmorphic UI, real-time API integrations, and cinematic interaction patterns.

---

## 🔥 Key Features

- **🎭 Cinematic User Experience**: Ultra-premium UI with backdrop blurs, neon accents, and smooth transitions.
- **🔎 Dynamic Discovery Engine**: Advanced search with live suggestions, genre-based filtering, and a powerful sorting system (Popularity, Rating, Newest).
- **📺 Immersive Trailer System**: Branded trailer modal with a clean, unobstructed viewing window and official broadcast styling.
- **🛡️ Global Authentication Protocol**: Immersive, full-screen Login/Registration experience that hides navigation for zero distraction.
- **💎 Intelligence Persistence**:
  - **Live Watchlist**: Add and remove content instantly with a synchronized global state.
  - **Auto-Scroll Engine**: Ensures every new movie page starts at the top of the viewport.
- **🚀 Performance Optimized**:
  - **Cinematic Skeletons**: Shimmering placeholders during data fetching.
  - **Intelligent Loading**: Content rows initially limited to 7 items with "Show All" and "Infinite Load" expansion steps.

---

## 🛠️ Technology Stack

- **Core**: React.js 18 (Vite)
- **Styling**: Tailwind CSS v4 (with custom Agency design system)
- **Navigation**: React Router DOM v6
- **Data Source**: TMDB API (The Movie Database)
- **State Management**: React Context API
- **Icons**: Custom SVG & Lucide-inspired patterns
- **Aesthetics**: Glassmorphism, Neon Glows, Custom Sleek Scrollbars

---

## 🚀 Rapid Setup

### 1. Clone & Install
```bash
git clone https://github.com/emandoyesus/movie-explorer.git
cd movie-explorer
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory and add your TMDB API Key:
```env
VITE_TMDB_API_KEY=your_api_key_here
```

### 3. Launch Development Server
```bash
npm run dev
```

---

## 📐 Project Structure

```text
src/
├── components/     # UI Components (Navbar, MovieRow, Hero, etc.)
├── context/        # Global State (Auth, Watchlist)
├── hooks/          # Custom Logic (useWatchlist)
├── pages/          # Page Views (Home, MovieDetails, Login, etc.)
├── services/       # API Utilities
└── index.css       # Global Agency Design Tokens & Animations
```

---

## 👨‍💻 Author

Created with excellence by **Emandoyesus Tesfaye**.

---

### 📄 License
DevNest Group &bull; All Rights Reserved &copy; 2026.
