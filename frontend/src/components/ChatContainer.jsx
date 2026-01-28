import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
    const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages, } = useChatStore();

    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);

    useEffect(() => {
        getMessages(selectedUser._id);
        subscribeToMessages();

        return () => unsubscribeFromMessages();
    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (isMessagesLoading) {
        return (
            <div className="flex-1 flex flex-col">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => {
                    const isMe = message.senderId === authUser._id;

                    return (
                        <div key={message._id} ref={messageEndRef} className={`flex ${isMe ? "justify-end" : "justify-start"}`} >
                            {!isMe && (
                                <img
                                    src={selectedUser.profilePic || "/avatar.png"}
                                    alt="avatar"
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                            )}

                            <div className="max-w-[70%]">
                                <div
                                    className={`px-3 py-2 rounded-lg text-sm ${isMe
                                        ? "bg-indigo-600 text-white"
                                        : "bg-slate-700 text-slate-100"
                                        }`}
                                >
                                    {message.image && (
                                        <img
                                            src={message.image}
                                            alt="attachment"
                                            className="rounded-md mb-2 max-w-full"
                                        />
                                    )}
                                    {message.text && <p>{message.text}</p>}
                                </div>

                                <p
                                    className={`text-xs mt-1 ${isMe ? "text-right text-slate-400" : "text-slate-400"
                                        }`}
                                >
                                    {formatMessageTime(message.createdAt)}
                                </p>
                            </div>

                            {isMe && (
                                <img
                                    src={authUser.profilePic || "/avatar.png"}
                                    alt="avatar"
                                    className="w-8 h-8 rounded-full ml-2"
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            <MessageInput />
        </div>
    );
};

export default ChatContainer;
