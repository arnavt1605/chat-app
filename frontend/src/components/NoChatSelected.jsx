const NoChatSelected = () => {
    return (
        <div className="flex-1 flex items-center justify-center bg-slate-800">
            <div className="text-center px-4">
                <h2 className="text-2xl font-semibold mb-2">
                    Welcome to Chat Application!
                </h2>
                <p className="text-slate-400">
                    Select a conversation from the sidebar to start chatting
                </p>
            </div>
        </div>
    );
};

export default NoChatSelected;
