import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();

    const isOnline = onlineUsers.includes(selectedUser._id);

    return (
        <div className="px-4 py-3 border-b border-slate-700 bg-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <img
                    src={selectedUser.profilePic || "/avatar.png"}
                    alt={selectedUser.fullName}
                    className="w-10 h-10 rounded-full object-cover" />

                <div>
                    <h3 className="font-medium">{selectedUser.fullName}</h3>
                    <p className="text-sm text-slate-400">
                        {isOnline ? "Online" : "Offline"}
                    </p>
                </div>
            </div>

            <button onClick={() => setSelectedUser(null)} className="text-sm text-slate-400 hover:text-white">
                Close
            </button>
        </div>
    );
};

export default ChatHeader;
