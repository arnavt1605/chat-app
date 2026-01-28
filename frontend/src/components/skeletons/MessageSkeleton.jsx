const MessageSkeleton = () => {
    const skeletonMessages = Array(6).fill(null);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {skeletonMessages.map((_, idx) => {
                const isMe = idx % 2 !== 0;

                return (
                    <div
                        key={idx}
                        className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                    >
                        {!isMe && (
                            <div className="w-8 h-8 rounded-full bg-slate-700 animate-pulse mr-2" />
                        )}

                        <div className="max-w-[70%] space-y-2">
                            <div className="h-3 w-16 bg-slate-700 rounded animate-pulse" />
                            <div className="h-16 w-[200px] bg-slate-700 rounded-lg animate-pulse" />
                        </div>

                        {isMe && (
                            <div className="w-8 h-8 rounded-full bg-slate-700 animate-pulse ml-2" />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default MessageSkeleton;
