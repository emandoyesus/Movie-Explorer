import React from "react";

export function SkeletonCard() {
    return (
        <div className="flex flex-col gap-4 animate-pulse">
            <div className="aspect-[2/3] w-full bg-white/5 rounded-[2rem] border border-white/5 shadow-2xl" />
            <div className="flex flex-col gap-2 px-2">
                <div className="h-4 w-3/4 bg-white/5 rounded-full" />
                <div className="h-3 w-1/2 bg-white/5 rounded-full opacity-60" />
            </div>
        </div>
    );
}

export function SkeletonHero() {
    return (
        <div className="w-full h-[60vh] bg-white/5 rounded-[3rem] animate-pulse relative overflow-hidden mb-16 px-6 sm:px-10 lg:px-20 pb-16 flex flex-col justify-end gap-6 overflow-hidden">
            <div className="h-16 w-2/3 bg-white/5 rounded-2xl" />
            <div className="h-4 w-1/3 bg-white/5 rounded-full" />
            <div className="flex gap-4">
                <div className="h-12 w-40 bg-white/5 rounded-full" />
                <div className="h-12 w-40 bg-white/5 rounded-full" />
            </div>
        </div>
    );
}

export function SkeletonRow() {
    return (
        <div className="mb-14 overflow-hidden">
            <div className="h-6 w-48 bg-white/5 rounded-full mb-8 pl-2" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
                {[...Array(7)].map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        </div>
    );
}
