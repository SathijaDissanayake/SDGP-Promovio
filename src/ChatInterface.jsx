"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "./ChatContext"

export default function ChatInterface() {
  const { chats, currentChatId, createNewChat, sendMessage, selectChat } = useChat()
  const [input, setInput] = useState("")
  const [likedMessages, setLikedMessages] = useState({})
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const messagesEndRef = useRef(null)

  const currentChat = chats.find((chat) => chat.id === currentChatId)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentChatId, chats])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    sendMessage(input)
    setInput("")
  }

  const handleLike = (messageId) => {
    setLikedMessages((prev) => ({
      ...prev,
      [messageId]: !prev[messageId],
    }))
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="app-container">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="new-chat-button" onClick={createNewChat}>
          Create New Chat
        </button>
        <div className="chat-list">
          <div className="chat-list-header">Messages</div>
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${chat.id === currentChatId ? "active" : ""}`}
              onClick={() => {
                selectChat(chat.id)
                setIsSidebarOpen(false)
              }}
            >
              
              <div className="chat-item-info">
                <div className="chat-item-name">{chat.name}</div>
               
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="main-content">
        <div className="chat-header">
          <div className="chat-title">{currentChat ? currentChat.name : "AI Customer Support"}</div>
        </div>

        <div className="chat-messages">
          {currentChat?.messages.map((message) => (
            <div key={message.id} className={`message ${message.sender === "user" ? "user" : ""}`}>
              <div className="message-content">{message.content}</div>
              <div className="message-footer">
                <div className="message-timestamp">{new Date(message.timestamp).toLocaleTimeString()}</div>
                {message.sender === "bot" && (
                  <button
                    className={`like-button ${likedMessages[message.id] ? "active" : ""}`}
                    onClick={() => handleLike(message.id)}
                  >

                  </button>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input">
          <form onSubmit={handleSubmit} className="input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="message-input"
            />
            <button type="submit" className="send-button">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

