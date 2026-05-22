

export function SkeletonCard() {
    return (
        <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
                <div className="skeleton h-4 w-20" />
                <div className="skeleton h-10 w-10 rounded-xl" />
            </div>
            <div className="skeleton h-8 w-32 mb-2" />
            <div className="skeleton h-3 w-24" />
        </div>
    );
}

export function SkeletonRow() {
    return (
        <div className="flex items-center gap-4 p-4 glass-card">
            <div className="skeleton h-10 w-10 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
                <div className="skeleton h-4 w-32" />
                <div className="skeleton h-3 w-48" />
            </div>
            <div className="skeleton h-5 w-20" />
        </div>
    );
}

export function SkeletonChart() {
    return (
        <div className="glass-card p-5">
            <div className="skeleton h-5 w-40 mb-4" />
            <div className="skeleton h-56 w-full rounded-xl" />
        </div>
    );
}
