import { MessageCircle } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";

//import "@fortawesome/fontawesome-free/css/all.css";


const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    const appendMessage = (sender, message) => {
        setMessages((prevMessages) => [...prevMessages, { sender, message }]);
    };

    const sendMessage = () => {
        if (!inputText && !selectedFile) return;
        appendMessage("user", inputText || "File Sent");
        setInputText("");

        const formData = new FormData();
        formData.append("msg", inputText);
        if (selectedFile) formData.append("file", selectedFile);

        fetchBotResponse(formData);
    };

    const fetchBotResponse = (formData) => {
        fetch("http://localhost:8000/api/v1/chatbot/get", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.text())
            .then((data) => appendMessage("bot", data))
            .catch(() => appendMessage("bot", "Failed to fetch response."))
            .finally(() => setSelectedFile(null));
    };

    return (
        <div className="z-50">
            {/* Chatbot Toggle Button */}
            <button className="fixed bottom-5 right-5 bg-purple-700 text-white border-none p-3 rounded-full cursor-pointer text-lg shadow-lg hover:bg-purple-800 transition" onClick={() => setIsOpen(!isOpen)}>
            <MessageCircle size={24} />
            </button>

            {/* Chatbot Interface */}
            {isOpen && (
                <div className="fixed bottom-20 right-5 w-[350px] bg-gray-800 rounded-lg shadow-lg flex flex-col">
                    <div className="bg-purple-700 text-white p-2 flex justify-between items-center rounded-t-lg">
                        <h5>Chatbot</h5>
                        <button onClick={() => setIsOpen(false)} className="bg-transparent border-none text-white text-lg cursor-pointer">
                            &times;
                        </button>
                    </div>

                    <div className="flex flex-col gap-2.5 p-2.5 max-h-[400px] overflow-y-auto bg-gray-900" ref={chatContainerRef}>
  {messages.map((msg, index) => (
    <div 
      key={index} 
      className={`max-w-[75%] p-2.5 rounded-2xl break-words text-sm ${
        msg.sender === "user" 
          ? "self-end bg-purple-700 text-white rounded-br-none" 
          : "self-start bg-gray-800 text-white rounded-bl-none"
      }`}
    >
      {msg.message}
    </div>
  ))}
</div>


<div className="flex p-2.5 border-t border-gray-300">
  <input
    type="text"
    placeholder="Ask me anything..."
    value={inputText}
    onChange={(e) => setInputText(e.target.value)}
    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
    className="flex-1 p-2 rounded-md bg-gray-800 text-white border-none outline-none"
  />
  <button 
    onClick={sendMessage} 
    className="bg-purple-700 text-white px-3 py-2 ml-2 rounded-md cursor-pointer hover:bg-purple-800 transition"
  >
    <Send size={20} />
  </button>
</div>

                </div>
            )}
        </div>
    );
};

export default Chatbot;
