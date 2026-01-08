import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cosentus - Medical RCM Solutions',
  description: 'Advanced Revenue Cycle Management for Healthcare Providers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cosentusai.vercel.app/cosentus-voice.js" async></script>
      </head>
      <body>{children}</body>
    </html>
  )
}

