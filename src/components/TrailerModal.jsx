import React from "react";

export default function TrailerModal({ isOpen, videoKey, onClose }) {
  if (!isOpen || !videoKey) return null;

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[1000] p-4 lg:p-10"
      onClick={onClose}
    >
      <div
        className="w-full max-w-6xl bg-[#121822] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_50px_150px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section (Above Video) */}
        <div className="px-10 py-6 border-b border-white/5 flex items-center justify-between">
            <div>
                <h2 className="text-white text-xl font-black uppercase tracking-widest">
                    Movie Trailer
                </h2>
                <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                    <span className="text-gray-500 text-[9px] font-black uppercase tracking-[0.4em]">Official Agency Broadcast</span>
                </div>
            </div>
            
            <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-red-600 text-white rounded-full transition-all border border-white/5 group"
            >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>

        {/* Video Container */}
        <div className="w-full aspect-video bg-black">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1`}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}