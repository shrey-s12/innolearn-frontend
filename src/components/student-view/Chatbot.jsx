import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = ({ onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const BASE_URL = "http://127.0.0.1:5000";

    const sendMessage = async () => {
        const trimmedInput = input.trim();
        if (!trimmedInput) return;

        const userMessage = { sender: "user", text: trimmedInput };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInput("");

        try {
            const response = await axios.post(`${BASE_URL}/chat`, {
                message: trimmedInput
            });

            if (response.status === 200 && response.data.response) {
                const botReply = response.data.response;
                const botMessage = { sender: "bot", text: botReply };
                setMessages(prevMessages => [...prevMessages, botMessage]);
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

            setMessages(prevMessages => [
                ...prevMessages,
                { sender: "bot", text: errorMessage }
            ]);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">
                <h2>InnoLearn Chatbot</h2>
                <button className="close-button" onClick={onClose}>✖</button>
            </div>

            <div className="chatbox">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
                    >
                        <strong>{msg.sender.toUpperCase()}:</strong> {msg.text}
                    </div>
                ))}
            </div>

            <div className="input-section">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask me anything..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;


