export default function SkeletonCard() {
    return (
        <div className="flex flex-col gap-3">
            <div className="w-full pb-[150%] bg-white/5 animate-pulse rounded-[1rem]"></div>
            <div className="h-4 w-3/4 bg-white/5 animate-pulse rounded"></div>
            <div className="flex justify-between">
                <div className="h-3 w-1/4 bg-white/5 animate-pulse rounded"></div>
                <div className="h-3 w-1/4 bg-white/5 animate-pulse rounded"></div>
            </div>
        </div>
    );
}