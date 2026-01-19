'use client'

import styles from './ChatWidget.module.css'

export default function ChatWidget() {
  return (
    <div className={styles.chatContainer}>
      <iframe 
        src="https://cosentusai.vercel.app/embed/chat?color=87CEEB&placeholder=Ask%20me%20anything%20about%20RCM%20solutions..." 
        className={styles.chatIframe}
        frameBorder="0"
        allowFullScreen
        title="Cosentus AI Chat Assistant"
      />
    </div>
  )
}
