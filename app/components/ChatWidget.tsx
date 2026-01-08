'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './ChatWidget.module.css'

interface Message {
  id: string
  text: string
  sender: 'user' | 'assistant'
  timestamp: Date
}

// Extend Window interface to include CosentusVoice
declare global {
  interface Window {
    CosentusVoice?: {
      createChatAssistant: () => any
      configure: (options: {
        chatInitEndpoint?: string
        chatSendEndpoint?: string
        apiEndpoint?: string
      }) => void
    }
  }
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [chatAssistant, setChatAssistant] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize Cosentus Chat Assistant
  useEffect(() => {
    const initializeChat = () => {
      if (window.CosentusVoice) {
        try {
          // Configure SDK to use Cosentus API endpoints
          window.CosentusVoice.configure({
            chatInitEndpoint: 'https://cosentusai.vercel.app/api/assist-chat',
            chatSendEndpoint: 'https://cosentusai.vercel.app/api/chat/send-message'
          })
          
          const chat = window.CosentusVoice.createChatAssistant()
          
          // Listen for AI responses
          chat.on('message', (data: { content: string; messageId: string }) => {
            const assistantMessage: Message = {
              id: data.messageId,
              text: data.content,
              sender: 'assistant',
              timestamp: new Date()
            }
            setMessages(prev => [...prev, assistantMessage])
          })

          // Listen for loading state
          chat.on('loading', (data: { isLoading: boolean }) => {
            setLoading(data.isLoading)
          })

          // Listen for errors
          chat.on('error', (data: { error: string }) => {
            console.error('Chat error:', data.error)
            const errorMessage: Message = {
              id: Date.now().toString(),
              text: `Sorry, I encountered an error: ${data.error}. Please try again.`,
              sender: 'assistant',
              timestamp: new Date()
            }
            setMessages(prev => [...prev, errorMessage])
          })

          setChatAssistant(chat)
        } catch (error) {
          console.error('Failed to initialize chat assistant:', error)
        }
      }
    }

    // Check if SDK is already loaded
    if (window.CosentusVoice) {
      initializeChat()
    } else {
      // Wait for SDK to load
      const checkInterval = setInterval(() => {
        if (window.CosentusVoice) {
          initializeChat()
          clearInterval(checkInterval)
        }
      }, 100)

      // Cleanup interval after 10 seconds
      setTimeout(() => clearInterval(checkInterval), 10000)

      return () => clearInterval(checkInterval)
    }
  }, [])

  const handleSend = async () => {
    if (inputValue.trim() === '' || !chatAssistant || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const messageToSend = inputValue
    setInputValue('')
    
    if (!isExpanded) {
      setIsExpanded(true)
    }

    // Send message to Cosentus AI
    try {
      await chatAssistant.sendMessage(messageToSend)
    } catch (error) {
      console.error('Failed to send message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInputFocus = () => {
    if (messages.length === 0) {
      // Don't expand on focus if no messages yet
      return
    }
  }

  return (
    <div className={styles.chatContainer}>
      <div className={`${styles.chatWidget} ${isExpanded ? styles.expanded : ''}`}>
        {isExpanded && messages.length > 0 && (
          <div className={styles.messagesContainer}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${
                  message.sender === 'user' ? styles.userMessage : styles.assistantMessage
                }`}
              >
                <div className={styles.messageContent}>
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className={styles.message}>
                <div className={`${styles.messageContent} ${styles.loadingMessage}`}>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
        
        <div className={styles.inputContainer}>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder={
              !chatAssistant 
                ? "Connecting to chat assistant..." 
                : loading 
                ? "AI is thinking..." 
                : "Ask me anything about RCM solutions..."
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={handleInputFocus}
            disabled={loading || !chatAssistant}
          />
          <button
            className={styles.sendButton}
            onClick={handleSend}
            disabled={inputValue.trim() === '' || loading || !chatAssistant}
            title={!chatAssistant ? 'Connecting to chat assistant...' : 'Send message'}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

