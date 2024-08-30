import React, { useState } from "react";
import "./ChatBot.css";
import { IoLogoWechat } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";

function ChatBot() {
    const [isBotVisible, setIsBotVisible] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

    const toggleBotVisibility = () => {
        if (isBotVisible) {
            setIsFadingOut(true);
            setTimeout(() => {
                setIsBotVisible(false);
                setIsFadingOut(false);
            }, 500);
        } else {
            setIsBotVisible(true);
        }
    };

    return (
        <div className="chat-container">
            {isBotVisible && (
                <div className={`bot ${isFadingOut ? 'fade-out' : 'fade-in'}`}>
                    <iframe
                        src="https://www.chatbase.co/chatbot-iframe/YPOSscc_aPIS95MMN_6_o"
                        width="100%"
                        style={{ height: "100%", minHeight: "500px" }}
                        frameBorder="0"
                    ></iframe>
                </div>
            )}
            <button className="toggle-bot-button" onClick={toggleBotVisibility}>
                {isBotVisible ? <IoCloseSharp id="close" /> : <IoLogoWechat id="open" />}
            </button>
        </div>
    );
}

export default ChatBot;
