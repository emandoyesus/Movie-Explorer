import React from "react";

export default function TrailerModal({ trailerKey, onClose }) {
  if (!trailerKey) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#121822] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header/Close bar */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-white/5">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em]">Watch Trailer</span>
            <button
                onClick={onClose}
                className="text-gray-400 hover:text-primary transition-colors p-1"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>

        {/* Video Container */}
        <div className="aspect-video w-full bg-black">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title="Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}