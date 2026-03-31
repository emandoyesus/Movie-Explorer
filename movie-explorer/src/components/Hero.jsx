import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Hero({ popularMovies = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    const heroMovies = popularMovies.slice(0, 8); 

    useEffect(() => {
        if (heroMovies.length === 0) return;

        const interval = setInterval(() => {
            handleNext();
        }, 8000); 

        return () => clearInterval(interval);
    }, [heroMovies.length, currentIndex]);

    const handleNext = () => {
        setFade(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
            setFade(true);
        }, 400);
    };

    const handlePrev = () => {
        setFade(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev === 0 ? heroMovies.length - 1 : prev - 1));
            setFade(true);
        }, 400);
    };

    if (heroMovies.length === 0) return <div className="h-[80vh] w-full bg-[#0b0d14]" />;

    const movie = heroMovies[currentIndex];
    const backdrop = movie.backdrop_path
        ? "https://image.tmdb.org/t/p/original" + movie.backdrop_path
        : "";

    return (
        <div className="relative w-full h-[85vh] min-h-[550px] mb-12 overflow-hidden bg-background group rounded-[2.5rem] border border-white/5">
            {/* Background Backdrop - HIGHER VISIBILITY */}
            <div
                className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform scale-100 ${fade ? 'opacity-85' : 'opacity-0'}`}
                style={{ backgroundImage: `url(${backdrop})`, filter: 'brightness(1.0) contrast(1.05)' }}
            />
            
            {/* LIGHTER GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/90 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)]/40 via-transparent to-transparent" />

            {/* Navigation Arrows */}
            <button 
                onClick={handlePrev}
                className="absolute left-10 top-1/2 -translate-y-1/2 z-30 p-5 rounded-full bg-black/30 text-white/40 hover:bg-black/60 hover:text-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-md border border-white/10"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
                onClick={handleNext}
                className="absolute right-10 top-1/2 -translate-y-1/2 z-30 p-5 rounded-full bg-black/30 text-white/40 hover:bg-black/60 hover:text-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-md border border-white/10"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </button>

            {/* Content Overlay - Shifted slightly down/right for better visibility */}
            <div className="relative z-10 w-full h-full flex flex-col justify-end pb-20 px-10 sm:px-14 lg:px-24">
                <div className={`flex flex-col transition-all duration-1000 max-w-4xl transform ${fade ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    
                    <div className="flex items-center gap-4 mb-6">
                        <span className="px-4 py-1.5 bg-white/10 text-gray-300 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-sm">Exclusive Trend</span>
                        <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">{movie.release_date?.substring(0, 4)}</span>
                    </div>

                    <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-8 uppercase tracking-tighter leading-[0.85] font-sans drop-shadow-2xl">
                        {movie.title}
                    </h1>

                    <p className="text-gray-400 text-sm md:text-[15px] mb-12 leading-relaxed font-medium tracking-wide max-w-xl line-clamp-3 opacity-90 drop-shadow-lg">
                        {movie.overview}
                    </p>

                    <div className="flex gap-5">
                        <Link to={`/movie/${movie.id}`}>
                            <button className="flex items-center gap-4 px-14 py-5 bg-primary text-black rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl">
                                Discover More
                            </button>
                        </Link>
                        <Link to={`/movie/${movie.id}`}>
                            <button className="px-14 py-5 bg-black/40 border border-white/10 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-black/60 transition-all backdrop-blur-sm">
                                Information
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-12 right-24 flex gap-4 z-20">
                {heroMovies.map((_, idx) => (
                    <button 
                        key={idx}
                        onClick={() => { setFade(false); setTimeout(() => { setCurrentIndex(idx); setFade(true); }, 300); }}
                        className={`h-0.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-16 bg-primary' : 'w-6 bg-white/10 hover:bg-white/30'}`}
                    />
                ))}
            </div>
        </div>
    );
}