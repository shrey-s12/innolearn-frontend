import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import Chatbot from "./Chatbot";
import "./ChatbotIcon.css";

export default function ChatbotIcon() {
  const [showChatbot, setShowChatbot] = useState(false);
  const { auth } = useContext(AuthContext);

  function handleIconClick() {
    setShowChatbot(!showChatbot);
  }

  function handleCloseChatbot() {
    setShowChatbot(false);
  }

  return (
    <>
      <div className="chatbot-icon" onClick={handleIconClick}>
        💬
      </div>
      {showChatbot && auth.authenticate && (
        <div className="chatbot-container">
          <Chatbot onClose={handleCloseChatbot} />
        </div>
      )}
    </>
  );
}
