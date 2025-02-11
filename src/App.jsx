import { ChatProvider } from "./ChatContext"
import ChatInterface from "./ChatInterface"
import "./styles.css"

export default function App() {
  return (
    <ChatProvider>
      <ChatInterface />
    </ChatProvider>
  )
}

