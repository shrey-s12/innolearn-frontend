import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_MAIN_CHATBOT_API_URL;

const Chatbot = ({ onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        const trimmedInput = input.trim();
        if (!trimmedInput) return;

        const userMessage = { sender: "user", text: trimmedInput };
        setMessages(prev => [...prev, userMessage]);
        setInput("");

        const tempId = Date.now();
        const analyzingMessage = {
            sender: "bot",
            text: (
                <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                </span>
            ),
            tempId,
            isAnalyzing: true
        };
        setMessages(prev => [...prev, analyzingMessage]);

        try {
            const response = await axios.post(`${BASE_URL}/chat`, {
                message: trimmedInput
            });

            if (response.status === 200 && response.data.response) {
                const botReply = response.data.response;

                setMessages(prev =>
                    prev.map(msg =>
                        msg.tempId === tempId
                            ? { sender: "bot", text: botReply }
                            : msg
                    )
                );
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (error) {
            console.error("❌ Error communicating with chatbot:", error.message);

            let errorMessage = "Something went wrong. Please try again later.";
            if (error.code === "ERR_NETWORK") {
                errorMessage = "⚠️ Cannot connect to the chatbot server.";
            } else if (error.response && error.response.status === 404) {
                errorMessage = "❌ Chatbot endpoint not found.";
            }

            setMessages(prev =>
                prev.map(msg =>
                    msg.tempId === tempId
                        ? { sender: "bot", text: errorMessage }
                        : msg
                )
            );
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="fixed bottom-20 right-5 w-[500px] h-[600px] bg-white dark:bg-gray-900 rounded-xl shadow-lg z-[9999] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">InnoLearn Chatbot</h2>
                <button onClick={onClose} className="text-xl text-gray-600 dark:text-gray-300 hover:text-red-500">✖</button>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-800 p-4 text-base">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-2 p-2 rounded-md ${msg.sender === "user"
                            ? "bg-green-100 dark:bg-green-700 text-right text-black dark:text-white"
                            : msg.isAnalyzing
                                ? "text-left text-black dark:text-white"
                                : "bg-red-100 dark:bg-red-700 text-left text-black dark:text-white"
                            }`}
                    >
                        <strong>{msg.sender.toUpperCase()}:</strong>{" "}
                        {typeof msg.text === "string" ? msg.text : msg.text}
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-2 p-3 border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white"
                />
                <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
