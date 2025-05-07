import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import Chatbot from "./Chatbot";

const ChatbotIcon = () => {
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
      <div
        className="text-3xl text-black dark:text-white fixed bottom-5 right-5 cursor-pointer z-[1000]"
        onClick={handleIconClick}
      >
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

export default ChatbotIcon
