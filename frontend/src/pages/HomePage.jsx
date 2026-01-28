import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
    const { selectedUser } = useChatStore();

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 pt-20">
            <div className="max-w-6xl mx-auto px-4 h-[calc(100vh-5rem)]">
                <div className="h-full bg-slate-800 border border-slate-700 rounded-xl overflow-hidden flex">
                    <Sidebar />

                    <div className="flex-1">
                        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
