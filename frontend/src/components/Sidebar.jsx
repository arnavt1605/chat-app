import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

    const { onlineUsers } = useAuthStore();
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const filteredUsers = showOnlineOnly ? users.filter((user) => onlineUsers.includes(user._id)) : users;

    if (isUsersLoading) return <SidebarSkeleton />;

    return (
        <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-slate-700">
                <h2 className="text-sm font-semibold mb-3">Contacts</h2>

                <label className="flex items-center gap-2 text-sm text-slate-400">
                    <input
                        type="checkbox"
                        checked={showOnlineOnly}
                        onChange={(e) => setShowOnlineOnly(e.target.checked)}
                    />
                    Show online only ({onlineUsers.length - 1}) {/*-1 to not count ourselves */}
                </label>
            </div>

            {/* User list */}
            <div className="flex-1 overflow-y-auto">
                {filteredUsers.map((user) => {
                    const isSelected = selectedUser?._id === user._id;
                    const isOnline = onlineUsers.includes(user._id);

                    return (
                        <button
                            key={user._id}
                            onClick={() => setSelectedUser(user)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left
                            ${isSelected ? "bg-slate-700" : "hover:bg-slate-700/50"}`}
                        >
                            <img
                                src={user.profilePic || "/avatar.png"}
                                alt={user.fullName}
                                className="w-10 h-10 rounded-full object-cover"
                            />

                            <div className="min-w-0">
                                <p className="font-medium truncate">{user.fullName}</p>
                                <p className="text-xs text-slate-400">
                                    {isOnline ? "Online" : "Offline"}
                                </p>
                            </div>
                        </button>
                    );
                })}

                {filteredUsers.length === 0 && (
                    <p className="text-center text-sm text-slate-400 mt-4">
                        No users found
                    </p>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
