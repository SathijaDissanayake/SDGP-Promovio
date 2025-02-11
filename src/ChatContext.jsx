"use client"

import { createContext, useContext, useState } from "react"
import { findBestResponse } from "./data/chatResponses"

const ChatContext = createContext()

export function ChatProvider({ children }) {
  const [chats, setChats] = useState([])
  const [currentChatId, setCurrentChatId] = useState(null)
  const [chatCounter, setChatCounter] = useState(1)

  const createNewChat = () => {
    const newChat = {
      id: Math.random().toString(36).substring(7),
      name: `Chat ${chatCounter}`,
      messages: [],
      createdAt: new Date().toISOString(),
    }
    setChats([...chats, newChat])
    setCurrentChatId(newChat.id)
    setChatCounter(chatCounter + 1)
  }

  const sendMessage = (message) => {
    if (!currentChatId) return

    const newMessage = {
      id: Math.random().toString(36).substring(7),
      content: message,
      sender: "user",
      timestamp: new Date().toISOString(),
    }

    // Get intelligent response based on user's message
    const botResponse = {
      id: Math.random().toString(36).substring(7),
      content: findBestResponse(message),
      sender: "bot",
      timestamp: new Date().toISOString(),
    }

    setChats(
      chats.map((chat) => {
        if (chat.id === currentChatId) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage, botResponse],
          }
        }
        return chat
      }),
    )
  }

  const selectChat = (chatId) => {
    setCurrentChatId(chatId)
  }

  return (
    <ChatContext.Provider value={{ chats, currentChatId, createNewChat, sendMessage, selectChat }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}

