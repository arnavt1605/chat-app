const SidebarSkeleton = () => {
    const skeletonContacts = Array(8).fill(null);

    return (
        <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-slate-700">
                <div className="h-4 w-24 bg-slate-700 rounded animate-pulse" />
            </div>

            {/* Skeleton contacts */}
            <div className="flex-1 overflow-y-auto">
                {skeletonContacts.map((_, idx) => (
                    <div key={idx} className="flex items-center gap-3 px-4 py-3">
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-slate-700 animate-pulse" />

                        {/* Text */}
                        <div className="flex-1 space-y-2">
                            <div className="h-3 w-32 bg-slate-700 rounded animate-pulse" />
                            <div className="h-2 w-16 bg-slate-700 rounded animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default SidebarSkeleton;
