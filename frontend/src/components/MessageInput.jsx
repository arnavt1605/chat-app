import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;

        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview,
            });

            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    return (
        <div className="border-t border-slate-700 p-4 bg-slate-800">
            {/* Image preview */}
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <img
                        src={imagePreview}
                        alt="preview"
                        className="w-20 h-20 rounded-md object-cover border border-slate-700"
                    />
                    <button
                        type="button"
                        onClick={removeImage}
                        className="text-sm text-slate-400 hover:text-white"
                    >
                        Remove
                    </button>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 rounded-md bg-slate-900 border border-slate-700
                     text-sm focus:outline-none focus:border-indigo-500"
                    value={text}
                    onChange={(e) => setText(e.target.value)} />

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleImageChange} />

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-2 text-sm rounded-md border border-slate-700
                     text-slate-400 hover:text-white">
                    Image
                </button>

                <button
                    type="submit"
                    disabled={!text.trim() && !imagePreview}
                    className="px-4 py-2 rounded-md bg-indigo-600 text-white
                     disabled:opacity-50"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
